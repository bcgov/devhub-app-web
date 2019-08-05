import config from '../config';

// config.json is used for Caddy templating during deployment
// to run locally, use .env.production
export const SSO_REALM_NAME = process.env.GATSBY_SSO_REALM_NAME || config.ssoRealmName;
export const SSO_CLIENT_ID = process.env.GATSBY_SSO_CLIENT_ID || config.ssoClientId;
export const SSO_BASE_URL = process.env.GATSBY_SSO_BASE_URL || config.ssoBaseUrl;
export const ROCKETGATE_API_URL = process.env.GATSBY_ROCKETGATE_API_URL || config.apolloApiGatewayUrl;
export const GITHUB_URL = 'https://www.github.com';
