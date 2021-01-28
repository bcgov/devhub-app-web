import React from 'react';

import Button from '../../UI/Button/Button';
import { useKeycloak } from '@react-keycloak/web';

export const TEST_IDS = {
  login: 'auth.login',
  logout: 'auth.logout',
};

export const Login = ({ ...rest }) => {
  const [keycloak] = useKeycloak();
  const authenticated = keycloak && keycloak.authenticated;
  return (
    <Button
      variant={authenticated ? 'link' : 'secondary'}
      data-testid={authenticated ? TEST_IDS.logout : TEST_IDS.login}
      {...rest}
      clicked={() => (authenticated ? keycloak.logout() : keycloak.login())}
    >
      {authenticated ? 'Logout' : 'Login'}
    </Button>
  );
};

export default Login;
