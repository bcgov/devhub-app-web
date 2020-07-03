import { Octokit } from '@octokit/rest';
import { PULL_REQUEST_STATE } from '../constants';
import dotenv from 'dotenv';
import { Base64 } from 'js-base64';

dotenv.config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

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

export const createOrUpdateFile = async (
  operation,
  owner,
  repo,
  bodyData,
  ref,
  topicName,
  email,
  name,
) => {
  const path = `app-web/topicRegistry/${topicName}.json`;
  const message = operation === 'create' ? `add new topic ${topicName}` : `edit topic ${topicName}`;
  const content = Base64.encode(bodyData);
  const committer = { email: email, name: name };
  const author = committer;
  let sha = '';

  // update a an existing file with topic data
  if (operation === 'edit') {
    const getFileData = await octokit.repos.getContent({ owner, repo, path });
    sha = getFileData.data.sha;
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
  }

  // create a new file for topic
  else {
    const { createFile } = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      branch: ref,
      message,
      content,
      committer,
      author,
    });
    return createFile;
  }
};

export const createPullRequest = async (operation, owner, repo, base, topicName, ref) => {
  const title = operation === 'create' ? `Add new topic ${topicName}` : `Edit topic ${topicName}`;
  const body =
    operation === 'create' ? `Add a new topic ${topicName} to Devhub` : `Edit topic ${topicName}`;
  const pullRequest = await octokit.pulls.create({ owner, repo, base, title, head: ref, body });
  return pullRequest;
};
