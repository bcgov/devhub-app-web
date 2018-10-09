import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './PrimaryHeader.module.css';

import { APP_TITLE } from '../../constants/strings';
import Banner from '../Common/Banner';
import Button from '../UI/Button/Button';
import { LOGOUT_BTN_ID, LOGIN_BTN_ID } from '../../constants/ui';
import implicitAuthManager from '../../auth';

export const PrimaryHeader = ({ isAuthenticated }) => {
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

  return (
    <header className={classes.PrimaryHeader}>
      <Banner title={APP_TITLE} navigateOnClickPath="/" />
      {button}
    </header>
  );
};

PrimaryHeader.propTypes = {
  isAuthenticated: PropTypes.bool,
};

PrimaryHeader.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(PrimaryHeader);
