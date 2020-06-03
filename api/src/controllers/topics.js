import { github } from '../config/index.json';
import Ajv from 'ajv';
import schema from '../schemas/topic.json';
import { randomId } from '../utils/strings';
import { Octokit } from '@octokit/rest';
import { openPullExistsForBranch } from '../utils/github';
import dotenv, { config } from 'dotenv';
import { Base64 } from 'js-base64';
import bodyParser from 'body-parser';

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
  const response = await octokit.git.getRef({ owner, repo, ref });
  const sha = response.data.object.sha;
  // https://developer.github.com/v3/git/refs/#create-a-reference
  const { data } = await octokit.git.createRef({ owner, repo, ref: 'refs/heads/test', sha });
  return data;
};

export const createFile = async (owner, repo) => {
  const path = 'app-web/topicRegistry/topicName.json';
  const message = 'test commit';
  const branch = 'refs/heads/test';
  const content = Base64.encode(
    JSON.stringify({ name: 'topicName', description: 'lorem ipsum' }, null, 2),
  );
  const committer = { email: 'karansaini29@gmail.com', name: 'jas29' };
  const author = committer;
  const { fileData } = await octokit.repos.createOrUpdateFile({
    owner,
    repo,
    path,
    branch,
    message,
    content,
    committer,
    author,
  });
  return fileData;
};

export const createPullRequest = async (owner, repo, base) => {
  const head = 'refs/heads/test';
  const title = 'Suggesting new Topic';
  const body = 'Add a new topic to the devhub';
  const { pullRequest } = await octokit.pulls.create({ owner, repo, base, title, head, body });
  return pullRequest;
};

export const createOrUpdateTopic = async (req, res) => {
  const branchName = `${github.branchPrefix}/${randomId(github.branchIdLength)}`;
  const { repo, owner, defaultBranch } = github;
  // req.on('data', chunk => {
  //   console.log(`${chunk}`);
  // })
  console.log('DEFAULT branch', defaultBranch, req.body);
  if (await openPullExistsForBranch(branchName, repo, owner)) {
    // add payload to pull request as new commit
  } else {
    // create branch
    try {
      // validate topic schema
      validate(req.body.topic);
      // validate topic doesn't already exist
      // validate topic sources are valid
      // await createNewRefFromBase(owner, repo, `heads/${defaultBranch}`);
      // // create a new file with contents
      // await createFile(owner, repo);
      // // commit  to branch
      // // make pr against ref to base using templates
      // await createPullRequest(owner,repo,defaultBranch)
    } catch (e) {
      console.log(e);
    }
  }
  // check if an open pr exists

  // create a git branch on the remote with a good naming convention
  // something like contribution/username-[known-identifier]

  // create the topic and place in branch
  // create the pr
  res.send('ok');
};
