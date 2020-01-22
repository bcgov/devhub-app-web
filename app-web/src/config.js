// {{....}} is a Caddy template string, this will be replaced by caddy at run time
export default {
  ssoRealmName: '{{.Env.SSO_REALM_NAME}}',
  ssoClientId: '{{.Env.SSO_CLIENT_ID}}',
  ssoBaseUrl: '{{.Env.SSO_BASE_URL}}',
  searchgateApiUrl: '{{.Env.SEARCHGATE_API_URL}}',
  algoliaIndexSuffix: '{{.Env.ALGOLIA_INDEX_NAME_SUFFIX}}',
};
