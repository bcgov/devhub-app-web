import React from 'react';
import logo from '../../../assets/images/logo.png';
import classes from './GovLogo.module.css';

const GovLogo = () => (
  <div className={classes.GovLogo}>
    <img src={logo} alt="Government of British Columbia" />
  </div>
);

export default GovLogo;
