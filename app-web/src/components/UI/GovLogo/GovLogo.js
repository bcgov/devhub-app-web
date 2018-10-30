import React from 'react';
import Link from '../../Common/Link';
import logo from '../../../assets/images/logo.png';
import classes from './GovLogo.module.css';
import { HOME_ROUTE } from '../../../constants/routes';

const GovLogo = () => (
  <div className={classes.GovLogo}>
    <Link to={HOME_ROUTE}>
      <img src={logo} alt="Government of British Columbia" />
    </Link>
  </div>
);

export default GovLogo;
