import { ImplicitAuthManager } from '@bcgov/common-web-utils';

import { SSO_BASE_URL, SSO_CLIENT_ID, SSO_REALM_NAME } from './constants/api';

let iam = null;

/**
 * returns a singleton of the implicit auth manager
 */
export const createIam = () => {
  const config = {
    baseURL: SSO_BASE_URL,
    clientId: SSO_CLIENT_ID,
    realmName: SSO_REALM_NAME,
    redirectURI: window.location.origin + window.location.pathname,
  };

  if (iam === null) {
    iam = new ImplicitAuthManager(config);
    Object.freeze(iam);
  }
  return iam;
};
