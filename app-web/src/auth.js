import { ImplicitAuthManager } from '@bcgov/common-web-utils';

import { SSO_BASE_URL, SSO_CLIENT_ID, SSO_REALM_NAME } from './constants/api';

let iam = null;

/**
 * returns a singleton of the implicit auth manager
 */
export const createIam = () => {
  const { origin, pathname, search } = window.location;

  const config = {
    baseURL: SSO_BASE_URL,
    clientId: SSO_CLIENT_ID,
    realmName: SSO_REALM_NAME,
    redirectURI: origin + pathname + search,
  };

  if (iam === null) {
    iam = new ImplicitAuthManager(config);
    Object.freeze(iam);
  }
  return iam;
};

export const redirectToSSOLogin = () => {
  const iam = createIam();
  if (window) {
    const { pathname, origin } = window.location;
    // safari will not parse the redirect uri correctly unless it has a trailing slash
    const path = pathname.charAt(pathname.length - 1) === '/' ? pathname : `${pathname}/`;
    window.location = iam.getSSOLoginURI('login', origin + path);
  }
};

export const redirectToSSOLogout = () => {
  const iam = createIam();
  if (window) {
    window.location = iam.getSSOLogoutURI();
  }
};
