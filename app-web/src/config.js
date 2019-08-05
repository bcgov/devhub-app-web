// {{....}} is a Caddy template string, this will be replaced by caddy at run time
export default {
  ssoRealmName: '{{.Env.SSO_REALM_NAME}}',
  ssoClientId: '{{.Env.SSO_CLIENT_ID}}',
  ssoBaseUrl: '{{.Env.SSO_BASE_URL}}',
  rocketgateApiUrl: '{{.Env.ROCKETGATE_API_URL}}',
};
