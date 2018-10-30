export const SSO_REALM_NAME =
  process.env.GATSBY_SSO_REALM_NAME || '{{.Env.SSO_REALM_NAME}}';
export const SSO_CLIENT_ID =
  process.env.GATSBY_SSO_CLIENT_ID || '{{.Env.SSO_CLIENT_ID}}';
export const SSO_BASE_URL =
  process.env.GATSBY_SSO_BASE_URL || '{{.Env.SSO_BASE_URL}}';
