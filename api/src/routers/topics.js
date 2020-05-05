import express from 'express';

import { github } from '../config/index.json';
import Ajv from 'ajv';
import schema from '../schemas/topic.json';
import { encryptStringToB64 } from '../utils/strings';
import octokit from '../octokit';
import { openPullExistsForBranch } from '../utils/github';

const ajv = new Ajv();

const validate = ajv.compile(schema);

const router = express.Router();

router.post('/', async (req, res) => {
  const name = encryptStringToB64(req.user.preferred_username);
  const branchName = `${github.branchPrefix}/${name}`;
  const {repo, owner, defaultBranch} = github;
  if( await openPullExistsForBranch(branchName, repo, owner)) {
    // add payload to pull request as new commit
  } else {
    // create branch  
    const response = await octokit.repos.getBranch({repo, owner, branch: defaultBranch});
    const sha = response.data.commit.sha
    await octokit.git.createRef({owner, repo, ref: branchName, sha});
  }
  // check if an open pr exists

  // create a git branch on the remote with a good naming convention
  // something like contribution/username-[known-identifier]

  // create the topic and place in branch
  // create the pr
  res.send('ok')
  
});


export default router;