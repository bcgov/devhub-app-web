import DocumizeApi from "../datasources/docugate"
import GithubApi from "../datasources/github"
import RocketGateApi from "../datasources/rocketchat"

export const resolveBaseDataSources = () => {
  const datasources = {};
  
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

  if(process.env.GITHUB_AUTH_TOKEN) {
    datasources.github = new GithubApi({ authToken: process.env.GITHUB_AUTH_TOKEN });
  }

  return datasources;
}