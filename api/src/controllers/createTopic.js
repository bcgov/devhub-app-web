import { github } from '../config/index.json';
import slugify from 'slugify';
import { createPullRequestFromData } from '../utils/githubhandler';

export const createTopic = async (req, res) => {
  const operation = 'create';
  const { repo, owner, defaultBranch } = github;
  const bodyData = JSON.stringify(req.body, null, 2);
  const topicName = slugify(req.body.name.toLowerCase(), '-');
  const ref = `refs/heads/createTopic/${topicName}`;

  const response = await createPullRequestFromData(
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
