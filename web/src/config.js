// {{....}} is a Caddy template string, this will be replaced by caddy at run time
export default {
  ssoRealmName: '{{env "SSO_REALM_NAME"}}',
  ssoClientId: '{{env "SSO_CLIENT_ID"}}',
  ssoBaseUrl: '{{env "SSO_BASE_URL"}}',
  searchgateApiUrl: '{{env "SEARCHGATE_API_URL"}}',
  algoliaIndexSuffix: '{{env "ALGOLIA_INDEX_NAME_SUFFIX"}}',
  devhubApiUrl: '{{env "DEVHUB_API_URL"}}',
};
