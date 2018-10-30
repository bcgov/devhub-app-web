import React from 'react';
import Link from '../../Common/Link';
import logo from '../../../assets/images/logo.png';
import logoMobile from '../../../assets/images/logo.svg';
import { HOME_ROUTE } from '../../../constants/routes';
import styles from './GovLogo.module.css';

const GovLogo = () => (
  <Link to={HOME_ROUTE}>
    <img src={logo} className="large-screen" alt="Government of British Columbia" />
    <img
      src={logoMobile}
      className={[styles.MobileLogo, 'small-screen'].join(' ')}
      alt="Government of British Columbia"
    />
  </Link>
);

export default GovLogo;
