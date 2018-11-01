import { ImplicitAuthManager } from '@bcgov/common-web-utils';

import { SSO_BASE_URL, SSO_CLIENT_ID, SSO_REALM_NAME } from './constants/api';

const config = {
  baseURL: SSO_BASE_URL,
  clientId: SSO_CLIENT_ID,
  realmName: SSO_REALM_NAME,
};

export const create_iam = () => {
  return new ImplicitAuthManager(config);
};
