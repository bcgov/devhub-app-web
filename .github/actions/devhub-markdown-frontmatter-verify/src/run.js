const core = require('@actions/core');
const github = require('@actions/github');
const matter = require('gray-matter');
const { flatten, groupBy } = require('lodash');
const process = require('process');
const { reduceJourneyRegistryToTopic, expandRegistry, flattenSourcesFromTopics } = require('../../../../app-web/gatsby/utils/githubRaw');
const { reduceContentsResults, reduceResultsToData, reduceFileResults } = require('./utils');
const { validateDescription,  hasNoErrors } = require('./validators');
const token = process.env.GITHUB_TOKEN;
const octokit = new github.GitHub(token);

const REGISTRY_CONTENTS_QUERY = `
query getRegistryContents($owner: String!, $repo: String!, $path: String!) { 
  repository(name:$repo, owner:$owner) {
    object(expression:$path) {
      ...on Tree {
        entries {
          name
          ...on TreeEntry {
            object {
              ...on Blob {
                text
              }
            }
          }
        }
      }
    }
  }  
}`

const FILE_CONTENTS_QUERY = `
  query getFileContents($owner: String!, $repo: String!, $path: String!) { 
    repository(name: $repo, owner: $owner) {
      object(expression: $path) {
        id
        ...on Blob {
          text
        }
      }
    }
  }
`;

/**
 * gets journeys and topics registry files
 * @param {String} repo 
 * @param {String} owner 
 * @param {String} ref
 * @returns {Object} {journeys: {Array}: topics: {Array}}
 */
const getJourneysAndTopics =  (repo, owner, ref) => {
  return core.group('Fetching topic and journey registries', async () => {
    const topicPath = 'app-web/topicRegistry';
    const journeyPath = 'app-web/journeyRegistry';
    const topicBranchPath = `${ref}:${topicPath}`;
    const journeyBranchPath = `${ref}:${journeyPath}`;
    core.debug(`Fetching topic registries at ${topicBranchPath}`);
    
    const topicsRegistry = await getRegistryContents(
      repo,
      owner,
      topicBranchPath
    );

    core.debug(`Fetching journey registries at ${journeyBranchPath}`);
    const journeyRegistry = await getRegistryContents(
      repo,
      owner,
      journeyBranchPath,
    );

    core.debug('Reducing fetch calls to a list of registry files');
    const topics = reduceResultsToData(reduceContentsResults(topicPath, topicsRegistry));
    core.debug('topics reduced');
    const journeys = reduceResultsToData(reduceContentsResults(journeyPath, journeyRegistry))
    core.debug('journeys reduced');
    
    core.debug('exiting group');
    return {
      topics,
      journeys
    }
  });
}

const getMarkdownContents = ({branch = 'master', file, repo, owner}) => {
  return octokit.graphql(FILE_CONTENTS_QUERY, {
    repo,
    owner,
    path: `${branch}:${file}`,
  });
}

const getRegistryContents = (repo, owner, path) => octokit.graphql(REGISTRY_CONTENTS_QUERY, {
  repo,
  owner,
  path
});

const validateMarkdownContents = text => {
  const {data} = matter(text);
  const validators = [validateDescription];

  return validators.map(cb => cb(data));
}

const filePathFromSourceProps = sourceProperties => `${sourceProperties.owner}/${sourceProperties.repo}:${sourceProperties.file}`
const validateFile = async ({sourceProperties}) => {
  const file = filePathFromSourceProps(sourceProperties);
  
    core.debug(`fetching file contents`);
    const rawContents = await getMarkdownContents(sourceProperties);
    const contents = reduceFileResults(rawContents)
    core.debug(`contents retrieved`);
    core.debug(`validating frontmatter`);
    return validateMarkdownContents(contents).map(m => ({...m, file}));

}

/**
 * processes the list of messages from all files that were validated and returns a markdown template
 * that is to be posted as a comment in Github
 */
const processMessagesArray = (messagesArray) => {
  const flattenedMessages = flatten(messagesArray);
  const groupedByFile = groupBy(flattenedMessages, 'file');
  let didError = false;
  const extractMessages = message => message.message;
  // loop over groups to see if they have errors, if they do we will print out messages
  Object.keys(groupedByFile).forEach(file => {
    const messages = groupedByFile[file];
    if(!hasNoErrors(messages)) {
      didError = true;
      core.error(`${file}: \n ${messages.map(extractMessages).join('\n')}`);
    }
  });

  return didError;
}
// most @actions toolkit packages have async methods
async function run() {
  try { 
    const repo = core.getInput('repo', { required: true });
    const owner = core.getInput('owner', { required: true });

    const { ref } = github.context;
    core.debug(`Fetching contents from ${ref}`);
    const result = await getJourneysAndTopics(repo, owner, ref);

    core.debug('Reducing journeys to match shape of topics');
    const journeyMappedAsTopic = reduceJourneyRegistryToTopic(result.journeys);

    const registry = journeyMappedAsTopic.concat(result.topics);
    
    core.debug('Reducing all registry items to flatten their source property structure');
    const expandedRegistry = expandRegistry(registry);
    
    core.debug('Extracting all sources from within the registry items and removing non-git sources from registry');

    const gitSources = flattenSourcesFromTopics(expandedRegistry).filter(({source}) => source.sourceType === 'github');
    console.log('remaining sources', gitSources)
    core.debug('Retrieving list of git urls to verify markdown frontmatter');

    core.debug(`${gitSources.length} files retrieved`);

    core.debug('Beginning Validation of markdown frontmatter');

    const messagesArray = await Promise.all(gitSources.map(async (source) => {
      core.debug(`Debugging ${source}`)
      return core.group(`Validating ${filePathFromSourceProps(source.sourceProperties)}`, async () => {
        return await validateFile(source.source)
      });
    }));

    const didError = processMessagesArray(messagesArray);

    if(didError) throw new Error('Files did not pass validation, see error messages');
  } catch (error) {
    console.error(error);
    core.setFailed(error.message);
  }
}

module.exports = run;