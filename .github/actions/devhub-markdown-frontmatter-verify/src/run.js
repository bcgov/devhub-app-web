const core = require('@actions/core');
const github = require('@actions/github');
const matter = require('gray-matter');
const { flatten, groupBy } = require('lodash');
const process = require('process');
const rootTime = Date.now();
const { Octokit } = require('@octokit/core');
const { throttling } = require('@octokit/plugin-throttling');

const {
  reduceJourneyRegistryToTopic,
  expandRegistry,
  flattenSourcesFromTopics,
} = require('../../../../web/gatsby/utils/githubRaw');
const { reduceContentsResults, reduceResultsToData, reduceFileResults } = require('./utils');
const { validateDescription, hasNoErrors } = require('./validators');
const token = process.env.GITHUB_TOKEN;
const myOctokit = Octokit.plugin(throttling);

const octokit = new myOctokit({
  auth: `${token}`,
  throttle: {
    onRateLimit: (retryAfter, options, octokit) => {
      octokit.log.warn(`Request quota exhausted for request ${options.method} ${options.url}`);
      if (options.request.retryCount === 0) {
        // only retries once
        octokit.log.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
      return false;
    },
    onAbuseLimit: (retryAfter, options, octokit) => {
      // does not retry, only logs a warning
      octokit.log.warn(`Abuse detected for request ${options.method} ${options.url}`);
      return false;
    },
  },
});

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
}`;

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
const getJourneysAndTopics = (repo, owner, ref) => {
  return core.group('Fetching topic and journey registries', async () => {
    const topicPath = 'web/topicRegistry';
    const journeyPath = 'web/journeyRegistry';
    const topicBranchPath = `${ref}:${topicPath}`;
    const journeyBranchPath = `${ref}:${journeyPath}`;
    core.debug(`Fetching topic registries at ${topicBranchPath}`);

    const topicsRegistry = await getRegistryContents(repo, owner, topicBranchPath);

    core.debug(`Fetching journey registries at ${journeyBranchPath}`);
    const journeyRegistry = await getRegistryContents(repo, owner, journeyBranchPath);

    core.debug('Reducing fetch calls to a list of registry files');
    const topics = reduceResultsToData(reduceContentsResults(topicPath, topicsRegistry));
    core.debug('topics reduced');
    const journeys = reduceResultsToData(reduceContentsResults(journeyPath, journeyRegistry));
    core.debug('journeys reduced');

    core.debug('exiting group');
    return {
      topics,
      journeys,
    };
  });
};

const getMarkdownContents = ({ branch = 'master', file, repo, owner }) => {
  console.log('branch', branch);
  try { 
    return octokit.graphql(FILE_CONTENTS_QUERY, {
      repo,
      owner,
      path: `${branch}:${file}`,
    });
  } catch (e) {
    if(branch === 'master') {
      // try again with main
      return octokit.graphql(FILE_CONTENTS_QUERY, {
        repo,
        owner,
        path: `main:${file}`,
      });
    } else {
      throw e;
    }
  }
};

const getRegistryContents = (repo, owner, path) =>
  octokit.graphql(REGISTRY_CONTENTS_QUERY, {
    repo,
    owner,
    path,
  });

const validateMarkdownContents = text => {
  const { data } = matter(text);
  const validators = [validateDescription];

  return validators.map(cb => cb(data));
};

const filePathFromSourceProps = sourceProperties =>
  `${sourceProperties.owner}/${sourceProperties.repo}:${sourceProperties.file}`;

const validateFile = async ({ sourceProperties }) => {
  const file = filePathFromSourceProps(sourceProperties);
  // eslint-disable-next-line
  console.log(`Validating ${filePathFromSourceProps(sourceProperties)} at ${(Date.now() - rootTime) / 1000}s`);
  const rawContents = await getMarkdownContents(sourceProperties);
  console.log(rawContents)
  const contents = reduceFileResults(rawContents);

  return validateMarkdownContents(contents).map(m => ({ ...m, file }));
};

/**
 * processes the list of messages from all files that were validated and returns a markdown template
 * that is to be posted as a comment in Github
 */
const processMessagesArray = messagesArray => {
  const flattenedMessages = flatten(messagesArray);
  const groupedByFile = groupBy(flattenedMessages, 'file');
  let didError = false;
  const extractMessages = message => message.message;
  // loop over groups to see if they have errors, if they do we will print out messages
  Object.keys(groupedByFile).forEach(file => {
    const messages = groupedByFile[file];
    if (!hasNoErrors(messages)) {
      didError = true;
      core.error(`${file}: \n ${messages.map(extractMessages).join('\n')}`);
    }
  });

  return didError;
};
// most @actions toolkit packages have async methods
async function run() {
  try {
    const repo = core.getInput('repo', { required: true });
    const owner = core.getInput('owner', { required: true });
    const throwOnError = core.getInput('throwOnError', { required: false }) || false;
    const { ref } = github.context;
    core.debug(`Fetching contents from ${ref}`);
    const result = await getJourneysAndTopics(repo, owner, ref);

    core.debug('Reducing journeys to match shape of topics');
    const journeyMappedAsTopic = reduceJourneyRegistryToTopic(result.journeys);

    const registry = journeyMappedAsTopic.concat(result.topics);

    core.debug('Reducing all registry items to flatten their source property structure');
    const expandedRegistry = expandRegistry(registry);

    core.debug(
      'Extracting all sources from within the registry items and removing non-git sources from registry',
    );

    const gitSources = flattenSourcesFromTopics(expandedRegistry).filter(
      ({ source }) => source.sourceType === 'github',
    );
    core.debug('Retrieving list of git urls to verify markdown frontmatter');

    core.debug(`${gitSources.length} files retrieved`);

    core.debug('Beginning Validation of markdown frontmatter');

    const messagesArray = await Promise.all(gitSources.map(({ source }) => validateFile(source)));

    const didError = processMessagesArray(messagesArray);

    if (didError && throwOnError) {
      throw new Error('Files did not pass validation, see error messages');
    }
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    core.setFailed(error.message);
  }
}

module.exports = run;
