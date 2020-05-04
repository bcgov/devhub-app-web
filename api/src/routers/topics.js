import express from 'express';
import Octokit from '@octokit/rest';

const octokit = Octokit({auth: process.env.GITHUB_TOKEN});

octokit

const router = express.Router();

router.post('/', (req, res) => {

  // create a git branch on the remote with a good naming convention
  // something like contribution/username-[known-identifier]

  // create the topic and place in branch
  // create the pr
  
  res.sendStatus(200);
});


export default router;