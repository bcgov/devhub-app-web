import { github } from '../config/index.json';
import slugify from 'slugify';
import { createPullRequestFromData } from '../utils/githubhandler';

export const createTopic = async (req, res) => {
  const operation = 'create';
  const { repo, owner, defaultBranch } = github;
  const bodyData = req.body;
  const topicName = slugify(req.body.name.toLowerCase(), '-');
  const ref = `refs/heads/createTopic/${topicName}`;

  const response = await createPullRequestFromData(
    operation,
    defaultBranch,
    repo,
    owner,
    ref,
    bodyData,
    topicName,
  );
  res.status(response.status).json(response);
};
