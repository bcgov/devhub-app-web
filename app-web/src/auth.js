import Keycloak from 'keycloak-js';

import { SSO_BASE_URL, SSO_CLIENT_ID, SSO_REALM_NAME } from './constants/api';

export const keycloak = new Keycloak({
  url: `${SSO_BASE_URL}/auth`,
  realm: SSO_REALM_NAME,
  clientId: SSO_CLIENT_ID,
});

export default keycloak;
