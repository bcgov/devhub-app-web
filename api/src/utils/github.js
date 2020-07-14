import { Octokit } from '@octokit/rest';
import { PULL_REQUEST_STATE, FILE_PATH, PR_BODY, PR_TITLE, COMMIT_MESSAGE } from '../constants';
import dotenv from 'dotenv';
import { Base64 } from 'js-base64';

dotenv.config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export const email = process.env.GITHUB_USER_EMAIL;

export const name = process.env.GITHUB_USER_NAME;

export const openPullExistsForBranch = async (branchName, repo, owner) => {
  const response = await octokit.pulls.list({
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
export const createNewRefFromBase = async (owner, repo, ref) => {
  const response = await octokit.git.getRef({ owner, repo, ref: 'heads/master' });
  const sha = response.data.object.sha;
  // https://developer.github.com/v3/git/refs/#create-a-reference
  const { data } = await octokit.git.createRef({ owner, repo, ref, sha });
  return data;
};

/**
 *
 * @param {String} owner
 * @param {String} repo
 * @param {String} bodyData
 * @param {String} ref
 * @param {String} topicName
 * @returns {Promise}
 */
export const createFile = async (owner, repo, bodyData, ref, topicName) => {
  const path = `${FILE_PATH}${topicName}.json`;
  const message = `${COMMIT_MESSAGE.CREATE} ${topicName}`;
  const content = Base64.encode(bodyData);
  const committer = { email: email, name: name };
  const author = committer;

  const { createdFile } = await octokit.repos.createOrUpdateFileContents({
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
 * @param {String} owner
 * @param {String} repo
 * @param {String} bodyData
 * @param {String} ref
 * @param {String} topicName
 * @returns {Promise}
 */
export const updateFile = async (owner, repo, bodyData, ref, topicName) => {
  const path = `${FILE_PATH}${topicName}.json`;
  const message = `${COMMIT_MESSAGE.UPDATE} ${topicName}`;
  const content = Base64.encode(bodyData);
  const committer = { email: email, name: name };
  const author = committer;
  const getFileData = await octokit.repos.getContent({ owner, repo, path });
  const sha = getFileData.data.sha;
  const { updatedFile } = await octokit.repos.createOrUpdateFileContents({
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
  operation,
  owner,
  repo,
  base,
  topicName,
  ref,
  topicDescription,
) => {
  let title,
    body = '';
  if (operation === 'create') {
    title = `${PR_TITLE.CREATE} ${topicName}`;
    body = `${PR_BODY.CREATE} ${topicName} \n ${topicDescription}`;
  } else if (operation === 'update') {
    title = `${PR_TITLE.UPDATE} ${topicName}`;
    body = `${PR_BODY.UPDATE} ${topicName} \n ${topicDescription}`;
  }
  const pullRequest = await octokit.pulls.create({ owner, repo, base, title, head: ref, body });
  return pullRequest;
};
