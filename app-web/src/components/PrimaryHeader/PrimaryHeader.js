import React from 'react';
import Link from 'gatsby-link';
import classes from './PrimaryHeader.module.css';
import { APP_TITLE } from '../../constants/strings';
import Banner from '../Common/Banner';
import Button from '../UI/Button/Button';
const PrimaryHeader = () => {
  return (
    <header className={classes.PrimaryHeader}>
      <Banner title={APP_TITLE} />
      {/*<Button type="primary" clicked={() => undefined}>
        Login
      </Button>*/}
    </header>
  );
};

export default PrimaryHeader;
