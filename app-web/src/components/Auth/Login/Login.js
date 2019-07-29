import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';
import { LOGOUT_BTN_ID, LOGIN_BTN_ID } from '../../../constants/ui';
import { createIam } from '../../../auth';

export const Login = ({ isAuthenticated }) => {
  const implicitAuthManager = createIam();
  let button = (
    <Button
      type="primary"
      id={LOGIN_BTN_ID}
      clicked={() => {
        window.location = implicitAuthManager.getSSOLoginURI();
      }}
    >
      Login
    </Button>
  );
  if (isAuthenticated) {
    button = (
      <Button
        type="primary"
        id={LOGOUT_BTN_ID}
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
  isAuthenticated: PropTypes.bool.isRequired,
};

Login.defaultProps = {
  isAuthenticated: false,
};

export default Login;
