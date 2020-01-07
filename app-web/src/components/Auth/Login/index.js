import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import { redirectToSSOLogout, redirectToSSOLogin } from '../../../auth';

export const TEST_IDS = {
  login: 'auth.login',
  logout: 'auth.logout',
};

export const Login = ({ authenticated, ...rest }) => {
  return (
    <Button
      variant={authenticated ? 'link' : 'secondary'}
      data-testid={authenticated ? TEST_IDS.logout : TEST_IDS.login}
      clicked={authenticated ? redirectToSSOLogout : redirectToSSOLogin}
      {...rest}
    >
      {authenticated ? 'Logout' : 'Login'}
    </Button>
  );
};

Login.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

Login.defaultProps = {
  authenticated: false,
};

export default Login;
