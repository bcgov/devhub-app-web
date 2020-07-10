import dotenv from 'dotenv';
import Ajv from 'ajv';
import schema from '../schemas/topic.json';
import { createNewRefFromBase, createFile, createPullRequest, updateFile } from './github';

dotenv.config();

const ajv = new Ajv();

const validate = ajv.compile(schema);

/**
 *
 * @param {String} operation
 * @param {String} defaultBranch
 * @param {String} repo
 * @param {String} owner
 * @param {String} req
 * @param {String} ref
 * @param {String} bodyData
 * @param {String} topicName
 * @returns {Object} {response {status, message, prUrl}}
 */
export const githubHandler = async (
  operation,
  defaultBranch,
  repo,
  owner,
  req,
  ref,
  bodyData,
  topicName,
) => {
  let response = { statusMessage: 'Ok', prUrl: '', status: '200' };
  try {
    // create new topic and branch
    // validate topic schema
    const isValidData = validate(req.body);
    if (isValidData) {
      // TODO -- validate topic doesn't already exist
      // TODO -- validate topic sources are valid
      // create a git branch on the remote with a naming convention [createTopic/topicname]
      await createNewRefFromBase(owner, repo, ref);
      // // create a new file with contents
      if (operation === 'create') {
        await createFile(owner, repo, bodyData, ref, topicName);
      }
      if (operation === 'update') {
        await updateFile(owner, repo, bodyData, ref, topicName);
      }
      // commit  to branch
      // make pr against ref to base using templates
      const pullRequest = await createPullRequest(
        operation,
        owner,
        repo,
        defaultBranch,
        topicName,
        ref,
      );
      // URL to the pull Request created ..
      const pullRequestUrl = pullRequest.data.html_url;
      response.prUrl = pullRequestUrl;
      //eslint-disable-next-line
        console.log(`Pull request for topic ${topicName} created. Check out ${pullRequestUrl} to view the pull request`);
    } else {
      response.status = '400';
      response.statusMessage = 'Bad Request';
    }
  } catch (e) {
    response.status = e.status;
    response.statusMessage = e;
  }
  return response;
};
