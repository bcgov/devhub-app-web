import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import { createIam } from '../../../auth';

export const TEST_IDS = {
  login: 'auth.login',
  logout: 'auth.logout',
};

export const Login = ({ authenticated }) => {
  const [implicitAuthManager, setImplicitAuthManager] = useState(null);
  useEffect(() => {
    setImplicitAuthManager(createIam());
  }, [implicitAuthManager]);
  const login = () => {
    if (implicitAuthManager) {
      const { pathname, origin } = window.location;
      // safari will not parse the redirect uri correctly unless it has a trailing slash
      const path = pathname.charAt(pathname.length - 1) === '/' ? pathname : `${pathname}/`;
      window.location = implicitAuthManager.getSSOLoginURI('login', origin + path);
    }
  };

  const logout = () => {
    if (implicitAuthManager) {
      implicitAuthManager.clearAuthLocalStorage();
      window.location = implicitAuthManager.getSSOLogoutURI();
    }
  };

  return (
    <Button
      variant="secondary"
      data-testid={authenticated ? TEST_IDS.logout : TEST_IDS.login}
      clicked={authenticated ? logout : login}
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
