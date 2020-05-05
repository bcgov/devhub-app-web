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
  console.log('DEFAULT branch', defaultBranch)
  if( await openPullExistsForBranch(branchName, repo, owner)) {
    // add payload to pull request as new commit
  } else {
    // create branch  
    const response = await octokit.git.getRef({owner, repo, ref: `heads/${defaultBranch}`});

    const sha = response.data.object.sha

    // https://developer.github.com/v3/git/refs/#create-a-reference
    await octokit.git.createRef({owner, repo, ref: `refs/heads/bar`, sha});
  }
  // check if an open pr exists

  // create a git branch on the remote with a good naming convention
  // something like contribution/username-[known-identifier]

  // create the topic and place in branch
  // create the pr
  res.send('ok')
  
});


export default router;