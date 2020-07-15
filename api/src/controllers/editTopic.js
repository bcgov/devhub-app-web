import slugify from 'slugify';
import { github } from '../config/index.json';
import { createPullRequestFromData } from '../utils/githubhandler';

export const editTopics = async (req, res) => {
  const operation = 'update';
  const { repo, owner, defaultBranch } = github;
  const bodyData = req.body;
  const topicName = slugify(req.body.name.toLowerCase(), '-');
  const ref = `refs/heads/editTopic/${topicName}`;
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
