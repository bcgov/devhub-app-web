import React from 'react';
import PropTypes from 'prop-types';
import { Flag } from 'flag';
import classes from './PrimaryHeader.module.css';
import { APP_TITLE } from '../../constants/ariaLabels';
import Banner from '../UI/Banner/Banner';
import Hamburger from '../UI/Hamburger/Hamburger';
import Login from '../Auth/Login/Login';

export const PrimaryHeader = ({ showHamburger, hamburgerClicked }) => (
  <header className={classes.PrimaryHeader}>
    <Banner title={APP_TITLE} navigateOnClickPath="/" />
    <div className={classes.Other}>
      <Flag name="features.login">
        <Login />
      </Flag>
      {showHamburger ? (
        <Hamburger clicked={hamburgerClicked} className={classes.Hamburger} />
      ) : null}
    </div>
  </header>
);

PrimaryHeader.propTypes = {
  showHamburger: PropTypes.bool,
  hamburgerClicked: PropTypes.func,
};

PrimaryHeader.defaultProps = {
  showHamburger: false,
  hamburgerClicked: () => undefined,
};

export default PrimaryHeader;
