import React from 'react';
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
  const implicitAuthManager = createIam();
  let button = (
    <Button
      type="secondary"
      data-testid={TEST_IDS.login}
      clicked={() => {
        window.location = implicitAuthManager.getSSOLoginURI();
      }}
    >
      Login
    </Button>
  );
  if (authenticated) {
    button = (
      <Button
        type="secondary"
        data-testid={TEST_IDS.logout}
        clicked={() => {
          implicitAuthManager.clearAuthLocalStorage();
          window.location = implicitAuthManager.getSSOLogoutURI();
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
