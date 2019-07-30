import React from 'react';
import PropTypes from 'prop-types';
import classes from './PrimaryHeader.module.css';
import Banner from '../UI/Banner/Banner';
import Hamburger from '../UI/Hamburger/Hamburger';
// login not being implemented at this time
import Login from '../Auth/Login';

export const PrimaryHeader = ({ showHamburger, hamburgerClicked, authenticated }) => (
  <header className={classes.PrimaryHeader}>
    <Banner />
    <div className={classes.Other}>
      <Login authenticated={authenticated} />
      {showHamburger ? (
        <Hamburger clicked={hamburgerClicked} className={classes.Hamburger} />
      ) : null}
    </div>
  </header>
);

PrimaryHeader.propTypes = {
  showHamburger: PropTypes.bool,
  hamburgerClicked: PropTypes.func,
  authenticated: PropTypes.bool,
};

PrimaryHeader.defaultProps = {
  showHamburger: false,
  authenticated: false,
  hamburgerClicked: () => undefined,
};

export default PrimaryHeader;
