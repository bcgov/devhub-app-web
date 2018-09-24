export const SSO_BASE_URL = 'https://dev-sso.pathfinder.gov.bc.ca';
export const SSO_REALM_NAME = 'devhub';
export const SSO_BASE_AUTH_ENDPOINT = `${SSO_BASE_URL}/auth/realms/mobile/protocol/openid-connect`;
export const SSO_CLIENT_ID = 'devhub-web';
export const SSO_LOGIN_REDIRECT_URI = `${window.location.origin}?type=login`;
export const SSO_LOGIN_ENDPOINT = `${SSO_BASE_AUTH_ENDPOINT}/auth?response_type=code&client_id=${SSO_CLIENT_ID}&redirect_uri=${SSO_LOGIN_REDIRECT_URI}`;
// export const SSO_IDIR_LOGIN_ENDPOINT = `${SSO_LOGIN_ENDPOINT}&kc_idp_hint=idir`;
// export const SSO_BCEID_LOGIN_ENDPOINT = `${SSO_LOGIN_ENDPOINT}&kc_idp_hint=bceid`;
export const SSO_LOGOUT_REDIRECT_URI = `${window.location.origin}?type=logout`;
export const SSO_LOGOUT_ENDPOINT = `${SSO_BASE_AUTH_ENDPOINT}/logout?redirect_uri=${SSO_LOGOUT_REDIRECT_URI}`;