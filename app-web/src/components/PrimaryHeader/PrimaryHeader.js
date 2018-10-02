import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/authActions';

import classes from './PrimaryHeader.module.css';

import { APP_TITLE } from '../../constants/strings';
import Banner from '../Common/Banner';
import Button from '../UI/Button/Button';
import { LOGOUT_BTN_ID, LOGIN_BTN_ID } from '../../constants/ui';

const PrimaryHeader = ({ isAuthenticated, login, logout }) => {
  let button = (
    <Button type="primary" id={LOGIN_BTN_ID} clicked={login}>
      Login
    </Button>
  );
  if (isAuthenticated) {
    button = (
      <Button type="primary" id={LOGOUT_BTN_ID} clicked={logout}>
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
  isAuthenticated: PropTypes.bool.isRequired,
};

PrimaryHeader.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(actions.authenticateSuccess()),
  logout: () => dispatch(actions.authenticateFailed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryHeader);
