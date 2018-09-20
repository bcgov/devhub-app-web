import React from 'react';
import Link from 'gatsby-link';
import classes from './PrimaryHeader.module.css';
import GovLogo from '../UI/GovLogo/GovLogo';
import { HOME_ROUTE } from '../../constants/routes';

const PrimaryHeader = () => {
  return (
    <header className={classes.PrimaryHeader}>
      <Link to={HOME_ROUTE} className={classes.Logo}>
        <GovLogo />
        <h1>Developers Hub</h1>
      </Link>
    </header>
  );
};

export default PrimaryHeader;
