import { github } from '../config/index.json';
import slugify from 'slugify';
import dotenv from 'dotenv';
import { githubHandler } from '../utils/githubhandler';

dotenv.config();

export const createTopic = async (req, res) => {
  const operation = 'create';
  const { repo, owner, defaultBranch } = github;
  const bodyData = JSON.stringify(req.body, null, 2);
  const topicName = slugify(req.body.name.toLowerCase(), '-');
  const ref = `refs/heads/createTopic/${topicName}`;

  const response = await githubHandler(
    operation,
    defaultBranch,
    repo,
    owner,
    req,
    ref,
    bodyData,
    topicName,
  );
  res.status(response.status).json(response);
};
