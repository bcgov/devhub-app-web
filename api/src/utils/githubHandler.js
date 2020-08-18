import Ajv from 'ajv';
import schema from '../schemas/topic.json';
import { createNewRefFromBase, createFile, createPullRequest, updateFile } from './github';
import octokit from '../octokit';

const ajv = new Ajv();

const validate = ajv.compile(schema);

/**
 *
 * @param {String} operation
 * @param {String} defaultBranch
 * @param {String} repo
 * @param {String} owner
 * @param {String} ref
 * @param {String} bodyData
 * @param {String} topicName
 * @returns {Object} {response {status, message, prUrl}}
 */
export const createPullRequestFromData = async (
  operation,
  defaultBranch,
  repo,
  owner,
  ref,
  bodyData,
  topicName,
) => {
  let response = { statusMessage: 'Ok', prUrl: '', status: '200' };
  try {
    // create new topic and branch
    // validate topic schema
    const isValidData = validate(bodyData);
    if (isValidData) {
      // TODO -- validate topic doesn't already exist
      // TODO -- validate topic sources are valid
      // create a git branch on the remote with a naming convention [createTopic/topicname]
      await createNewRefFromBase(octokit, owner, repo, ref);
      // // create a new file with contents
      if (operation === 'create') {
        await createFile(octokit, owner, repo, bodyData, ref, topicName);
      } else if (operation === 'update') {
        await updateFile(octokit, owner, repo, bodyData, ref, topicName);
      }
      // commit  to branch
      // make pr against ref to base using templates
      const topicDescription = bodyData.description;
      const pullRequest = await createPullRequest(
        octokit,
        operation,
        owner,
        repo,
        defaultBranch,
        topicName,
        ref,
        topicDescription,
      );
      // URL to the pull Request created ..
      response.prUrl = pullRequest.data.html_url;
      //eslint-disable-next-line
      console.log(`Pull request for topic ${topicName} created. Check out ${response.prUrl} to view the pull request`);
    } else {
      response.status = '400';
      response.statusMessage = 'Bad Request';
    }
  } catch (e) {
    //eslint-disable-next-line
    console.error(e);
    response.status = '422';
    response.statusMessage = 'Unprocessable Entity';
  }
  return response;
};
