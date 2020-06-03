import { Octokit } from '@octokit/rest';
import createPullRequest from 'octokit-create-pull-request';

const MyOctokit = Octokit.plugin(createPullRequest);
export default new MyOctokit({ auth: process.env.GITHUB_TOKEN });
