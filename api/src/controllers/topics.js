
import { github } from '../config/index.json';
import Ajv from 'ajv';
import schema from '../schemas/topic.json';
import { randomId } from '../utils/strings';
import octokit from '../octokit';
import { openPullExistsForBranch } from '../utils/github';

const ajv = new Ajv();

const validate = ajv.compile(schema);

/**
 * 
 * @param {String} owner 
 * @param {String} repo 
 * @param {String} ref 
 * @returns {Promise} 
 * {
    "ref": "refs/heads/foo",
    "node_id": "MDM6UmVmMTQ4Njc5NTk0OnJlZnMvaGVhZHMvZm9v",
    "url": "https://api.github.com/repos/bcgov/devhub-app-web/git/refs/heads/foo",
    "object": {
        "sha": "72fc403744a4e902dfdda56aae0d48ee4ed9d32e",
        "type": "commit",
        "url": "https://api.github.com/repos/bcgov/devhub-app-web/git/commits/72fc403744a4e902dfdda56aae0d48ee4ed9d32e"
    }
 * }
 */
export const createNewRefFromBase = async (owner, repo, ref) => {
  const response = await octokit.git.getRef({owner, repo, ref});
  const sha = response.data.object.sha
  // https://developer.github.com/v3/git/refs/#create-a-reference
  const { data } = await octokit.git.createRef({owner, repo, ref: 'refs/heads/bar', sha});
  return data ;
}

export const createOrUpdateTopic = async (req, res) => {

  const branchName = `${github.branchPrefix}/${randomId(github.branchIdLength)}`;
  const {repo, owner, defaultBranch} = github;
  console.log('DEFAULT branch', defaultBranch)
  if( await openPullExistsForBranch(branchName, repo, owner)) {
    // add payload to pull request as new commit
  } else {
    // create branch  
    try {
      // validate topic schema
      validate(req.body.topic);
      // validate topic doesn't already exist
      // validate topic sources are valid
      await createNewRefFromBase(owner, repo, `heads/${defaultBranch}`);
      // create a new file with contents
      // commit  to branch 
      // make pr against ref to base using templates
    } catch(e) {

    }

  }
  // check if an open pr exists

  // create a git branch on the remote with a good naming convention
  // something like contribution/username-[known-identifier]

  // create the topic and place in branch
  // create the pr
  res.send('ok')
  
}