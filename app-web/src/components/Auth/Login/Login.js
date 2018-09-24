import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import { LOGOUT_BTN_ID, LOGIN_BTN_ID } from '../../../constants/ui';

const Login = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return (
      <Button
        id={LOGOUT_BTN_ID}
        type="primary"
        clicked={() => {
          console.log('logging user out!');
        }}
      >
        Logout
      </Button>
    );
  } else {
    return (
      <Button
        id={LOGIN_BTN_ID}
        type="primary"
        clicked={() => {
          console.log('logging user in!');
        }}
      >
        Login
      </Button>
    );
  }
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Login;
