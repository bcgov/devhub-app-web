import { github } from '../config/index.json';
import Ajv from 'ajv';
import schema from '../schemas/topic.json';
import { randomId } from '../utils/strings';
import { Octokit } from '@octokit/rest';
import { openPullExistsForBranch } from '../utils/github';
import dotenv, { config } from 'dotenv';
import { Base64 } from 'js-base64';
import slugify from 'slugify';

const ajv = new Ajv();

dotenv.config();

const validate = ajv.compile(schema);

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

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

export const createFile = async (owner, repo, bodyData, ref, topicName, email, name) => {
  const path = `app-web/topicRegistry/${topicName}.json`;
  const message = 'add new topic';
  const content = Base64.encode(bodyData);
  const committer = { email: email, name: name };
  const author = committer;
  const { fileData } = await octokit.repos.createOrUpdateFile({
    owner,
    repo,
    path,
    branch: ref,
    message,
    content,
    committer,
    author,
  });
  return fileData;
};

export const createPullRequest = async (owner, repo, base, topicName, ref) => {
  const title = `Add new topic ${topicName}`;
  const body = `Add a new topic to the devhub named ${topicName}`;
  const { pullRequest } = await octokit.pulls.create({ owner, repo, base, title, head: ref, body });
  return pullRequest;
};

export const createOrUpdateTopic = async (req, res) => {
  const branchName = `${github.branchPrefix}/${randomId(github.branchIdLength)}`;
  const { repo, owner, defaultBranch, email, name } = github;

  const bodyData = JSON.stringify(JSON.parse(req.body.data), null, 2);

  const topicName = slugify(JSON.parse(bodyData).name.toLowerCase(), '-');

  const ref = `refs/heads/createTopic/${topicName}`;

  if (await openPullExistsForBranch(branchName, repo, owner)) {
    // add payload to pull request as new commit
  } else {
    // create branch
    try {
      // validate topic schema
      validate(req.body.topic);
      // TODO -- validate topic doesn't already exist
      // TODO -- validate topic sources are valid
      // create a git branch on the remote with a naming convention [createTopic/topicname]
      await createNewRefFromBase(owner, repo, ref);
      // create a new file with contents
      await createFile(owner, repo, bodyData, ref, topicName, email, name);
      // commit  to branch
      // make pr against ref to base using templates
      await createPullRequest(owner, repo, defaultBranch, topicName, ref);
    } catch (e) {
      console.log(e);
    }
  }
  res.send('ok');
};
