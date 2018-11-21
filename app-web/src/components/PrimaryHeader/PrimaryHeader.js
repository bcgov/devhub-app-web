import React from 'react';
import { Flag } from 'flag';
import classes from './PrimaryHeader.module.css';
import { APP_TITLE } from '../../constants/strings';
import Banner from '../Common/Banner';
import Login from '../Auth/Login/Login';
import PrimaryNavigation from '../Navigation/PrimaryNavigation';

export const PrimaryHeader = () => {
  return (
    <header className={classes.PrimaryHeader}>
      <Banner title={APP_TITLE} navigateOnClickPath="/" />
      <div className={classes.Other}>
        <Flag name="features.login">
          <Login />
        </Flag>
        <Flag name="features.sourceFiltering">
          <PrimaryNavigation />
        </Flag>
      </div>
    </header>
  );
};

export default PrimaryHeader;
