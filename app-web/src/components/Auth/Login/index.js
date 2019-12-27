import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import { createIam } from '../../../auth';

export const TEST_IDS = {
  login: 'auth.login',
  logout: 'auth.logout',
};
// TODO improve the look of the login button
// definitily should make a pr to integrate rebass and styled system
// this may have to be an off time thing...
// also remove the button module.css and refactor as a styled component
export const Login = ({ authenticated }) => {
  const [implicitAuthManager, setImplicitAuthManager] = useState(null);
  useEffect(() => {
    setImplicitAuthManager(createIam());
  }, [implicitAuthManager]);

  let button = (
    <Button
      variant="secondary"
      data-testid={TEST_IDS.login}
      clicked={() => {
        if (implicitAuthManager) {
          const { pathname, origin } = window.location;
          // safari will not parse the redirect uri correctly unless it has a trailing slash
          const path = pathname.charAt(pathname.length - 1) === '/' ? pathname : `${pathname}/`;
          window.location = implicitAuthManager.getSSOLoginURI('login', origin + path);
        }
      }}
    >
      Login
    </Button>
  );
  if (authenticated) {
    button = (
      <Button
        variant="secondary"
        data-testid={TEST_IDS.logout}
        clicked={() => {
          if (implicitAuthManager) {
            implicitAuthManager.clearAuthLocalStorage();
            window.location = implicitAuthManager.getSSOLogoutURI();
          }
        }}
      >
        Logout
      </Button>
    );
  }
  return button;
};

Login.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

Login.defaultProps = {
  authenticated: false,
};

export default Login;
