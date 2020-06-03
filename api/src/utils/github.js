import octokit from '../octokit';
import { PULL_REQUEST_STATE } from '../constants';

export const openPullExistsForBranch = async (branchName, repo, owner) => {
  const response = await octokit.pulls.list({
    owner,
    repo,
    state: PULL_REQUEST_STATE.open,
    head: branchName,
  });
  const index = response.data.findIndex((pr) => pr.base.ref === branchName);

  return index > -1;
};
