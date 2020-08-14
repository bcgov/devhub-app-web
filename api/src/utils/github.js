import { PULL_REQUEST_STATE, FILE_PATH, PR_BODY, COMMIT_MESSAGE } from '../constants';
import dotenv from 'dotenv';
import { Base64 } from 'js-base64';

dotenv.config();

export const email = process.env.GITHUB_USER_EMAIL;

export const name = process.env.GITHUB_USER_NAME;

export const openPullExistsForBranch = async (context, branchName, repo, owner) => {
  const response = await context.pulls.list({
    owner,
    repo,
    state: PULL_REQUEST_STATE.open,
    head: branchName,
  });
  const index = response.data.findIndex((pr) => pr.base.ref === branchName);

  return index > -1;
};

/**
 * 
 * @param {Context} context
 * @param {String} owner 
 * @param {String} repo 
 * @param {String} ref 
 * @returns {Promise} 
 * {
    "ref": "refs/heads/foo",
    "node_id": "MDM6UmVmMTQ4Njc5NTk0OnJlZnMvaGVhZHMvZm9v",
    "url": "https://api.github.com/repos/bcgov/devhub-app-web/git/refs/heads/foo",
    "object": {
        "sha": "72fc403744a4e902dfdda56aae0d48ee4ed9d32e",
        "type": "commit",
        "url": "https://api.github.com/repos/bcgov/devhub-app-web/git/commits/72fc403744a4e902dfdda56aae0d48ee4ed9d32e"
    }
 * }
 */
export const createNewRefFromBase = async (context, owner, repo, ref) => {
  const response = await context.git.getRef({ owner, repo, ref: 'heads/master' });
  const sha = response.data.object.sha;
  // https://developer.github.com/v3/git/refs/#create-a-reference
  const { data } = await context.git.createRef({ owner, repo, ref, sha });
  return data;
};

/**
 *
 * @param {Context} context
 * @param {String} owner
 * @param {String} repo
 * @param {String} bodyData
 * @param {String} ref
 * @param {String} topicName
 * @returns {Promise}
 */
export const createFile = async (context, owner, repo, bodyData, ref, topicName) => {
  const path = `${FILE_PATH}${topicName}.json`;
  const message = `${COMMIT_MESSAGE.CREATE} ${topicName}`;
  const content = Base64.encode(JSON.stringify(bodyData, null, 2));
  const committer = { email: email, name: name };
  const author = committer;

  const { createdFile } = await context.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    branch: ref,
    message,
    content,
    committer,
    author,
  });
  return createdFile;
};

/**
 *
 * @param {Context} context
 * @param {String} owner
 * @param {String} repo
 * @param {String} bodyData
 * @param {String} ref
 * @param {String} topicName
 * @returns {Promise}
 */
export const updateFile = async (context, owner, repo, bodyData, ref, topicName) => {
  const path = `${FILE_PATH}${topicName}.json`;
  const message = `${COMMIT_MESSAGE.UPDATE} ${topicName}`;
  const content = Base64.encode(JSON.stringify(bodyData, null, 2));
  const committer = { email: email, name: name };
  const author = committer;
  const getFileData = await context.repos.getContent({ owner, repo, path });
  const sha = getFileData.data.sha;
  const { updatedFile } = await context.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    branch: ref,
    message,
    content,
    committer,
    author,
    sha,
  });
  return updatedFile;
};

/**
 *
 * @param {Context} context
 * @param {String} operation
 * @param {String} owner
 * @param {String} repo
 * @param {String} base
 * @param {String} topicName
 * @param {String} ref
 * @param {String} topicDescription
 * @returns {Promise}
 */
export const createPullRequest = async (
  context,
  operation,
  owner,
  repo,
  base,
  topicName,
  ref,
  topicDescription,
) => {
  const prData = PR_BODY(operation, topicName, topicDescription);
  const pullRequest = await context.pulls.create({
    owner,
    repo,
    base,
    title: prData.title,
    head: ref,
    body: prData.body,
  });
  return pullRequest;
};
