import React from 'react';
import classes from './PrimaryHeader.module.css';
import { Flag } from 'flag';
import { APP_TITLE } from '../../constants/strings';
import Banner from '../Common/Banner';
import Login from '../Auth/Login/Login';

const PrimaryHeader = () => {
  return (
    <header className={classes.PrimaryHeader}>
      <Banner title={APP_TITLE} navigateOnClickPath="/" />
      <Flag name='features.login'>
        <Login />
      </Flag>
    </header>
  );
};

export default PrimaryHeader;
