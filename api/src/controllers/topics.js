import { github } from '../config/index.json';
import Ajv from 'ajv';
import schema from '../schemas/topic.json';
import { randomId } from '../utils/strings';
import {
  openPullExistsForBranch,
  createNewRefFromBase,
  createFile,
  createPullRequest,
} from '../utils/github';
import slugify from 'slugify';
import dotenv from 'dotenv';

dotenv.config();

const ajv = new Ajv();

const validate = ajv.compile(schema);

export const createOrUpdateTopic = async (req, res) => {
  const branchName = `${github.branchPrefix}/${randomId(github.branchIdLength)}`;
  const { repo, owner, defaultBranch } = github;
  const email = process.env.GITHUB_USERNAME;
  const name = process.env.GITHUB_USER_EMAIL;
  let response = { statusMessage: 'Ok' };
  let status = '200';
  const bodyData = JSON.stringify(req.body, null, 2);
  const topicName = slugify(req.body.name.toLowerCase(), '-');

  const ref = `refs/heads/createTopic/${topicName}`;

  try {
    if (await openPullExistsForBranch(branchName, repo, owner)) {
      // add payload to pull request as new commit
    } else {
      // create new topic and branch
      // validate topic schema
      const isValidData = validate(req.body);
      if (isValidData) {
        // TODO -- validate topic doesn't already exist
        // TODO -- validate topic sources are valid
        // create a git branch on the remote with a naming convention [createTopic/topicname]
        await createNewRefFromBase(owner, repo, ref);
        // // create a new file with contents
        await createFile(owner, repo, bodyData, ref, topicName, email, name);
        // commit  to branch
        // make pr against ref to base using templates
        const pullRequest = await createPullRequest(owner, repo, defaultBranch, topicName, ref);
        // URL to the pull Request created ..
        const pullRequestUrl = pullRequest.data.html_url;
        response.statusMessage = pullRequestUrl;
      } else {
        status = '400';
        response.statusMessage = 'Bad Request';
      }
    }
  } catch (e) {
    status = e.status;
    response.statusMessage = e;
  }
  res.status(status).json(response);
};
