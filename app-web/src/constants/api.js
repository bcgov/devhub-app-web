import config from '../config';

// config.json is used for Caddy templating during deployment
// to run locally, use .env.production
export const SSO_REALM_NAME = process.env.GATSBY_SSO_REALM_NAME || config.ssoRealmName;
export const SSO_CLIENT_ID = process.env.GATSBY_SSO_CLIENT_ID || config.ssoClientId;
export const SSO_BASE_URL = process.env.GATSBY_SSO_BASE_URL || config.ssoBaseUrl;
export const SEARCHGATE_API_URL = process.env.GATSBY_SEARCHGATE_API_URL || config.searchgateApiUrl;
export const DEVHUB_API_URL = process.env.GATSBY_DEVHUB_API_URL || config.devhubApiUrl;
// because this env variable GATBSY_ALGOLIA.. is made available at build, it will never utilize
// the caddy template string. This self invocated function will only allow the ennv variable to be used
// if the caddy template stringn has not been transformed
export const ALGOLIA_INDEX_SUFFIX = (() => {
  if (/\.Env\.ALGOLIA/.test(config.algoliaIndexSuffix)) {
    return process.env.GATSBY_ALGOLIA_INDEX_NAME_SUFFIX;
  }
  return config.algoliaIndexSuffix;
})();

export const GITHUB_URL = 'https://www.github.com';
