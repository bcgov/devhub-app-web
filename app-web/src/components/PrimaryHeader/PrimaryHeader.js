import React from 'react';
import PropTypes from 'prop-types';

import classes from './PrimaryHeader.module.css';

import { APP_TITLE } from '../../constants/strings';
import Banner from '../Common/Banner';
import Button from '../UI/Button/Button';
import { LOGOUT_BTN_ID, LOGIN_BTN_ID } from '../../constants/ui';

const PrimaryHeader = ({ isAuthenticated }) => {
  let button = (
    <Button type="primary" id={LOGIN_BTN_ID} clicked={() => undefined}>
      Login
    </Button>
  );
  if (isAuthenticated) {
    button = (
      <Button type="primary" id={LOGOUT_BTN_ID} clicked={() => undefined}>
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

export default PrimaryHeader;
