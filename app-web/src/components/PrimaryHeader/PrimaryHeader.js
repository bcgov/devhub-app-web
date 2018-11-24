import React from 'react';
import { Flag } from 'flag';
import classes from './PrimaryHeader.module.css';
import { APP_TITLE } from '../../constants/ariaLabels';
import Banner from '../UI/Banner/Banner';
import Login from '../Auth/Login/Login';
import PrimaryFilter from '../PrimaryFilter/PrimaryFilter';
import { HOME_ROUTE } from '../../constants/routes';
export const PrimaryHeader = ({ path }) => {
  // only show primary filter on home page
  const primaryFilter =
    path === HOME_ROUTE ? (
      <Flag name="features.sourceFiltering">
        <PrimaryFilter />
      </Flag>
    ) : null;
  return (
    <header className={classes.PrimaryHeader}>
      <Banner title={APP_TITLE} navigateOnClickPath="/" />
      <div className={classes.Other}>
        <Flag name="features.login">
          <Login />
        </Flag>
        {primaryFilter}
      </div>
    </header>
  );
};

export default PrimaryHeader;
