import React from 'react';
import classes from './PrimaryHeader.module.css';
import GovLogo from '../UI/GovLogo/GovLogo';

const PrimaryHeader = () => {
  return (
    <header className={classes.PrimaryHeader}>
      <GovLogo />
      <h1>Developers Hub</h1>
    </header>
  );
};

export default PrimaryHeader;
