const DocumizeApi = require("../datasources/docugate");
const GithubApi = require("../datasources/github");
const RocketGateApi = require("../datasources/rocketchat");

const resolveBaseDataSources = () => {
  const datasources = {};
  console.log(process.env.GITHUB_TOKEN, 
    'GITHUB_TOKEN')
  if(process.env.ROCKETGATE_BASE_URL) {
    datasources.rocketchat = new RocketGateApi({
      baseURL: process.env.ROCKETGATE_BASE_URL,
    });
  }
  
  if(process.env.DOCUGATE_BASE_URL) {
    datasources.documize = new DocumizeApi({
      baseURL: process.env.DOCUGATE_BASE_URL,
    });
  }

  if(process.env.GITHUB_TOKEN) {
    datasources.github = new GithubApi({ authToken: process.env.GITHUB_TOKEN });
  }

  return datasources;
}

module.exports = { resolveBaseDataSources };