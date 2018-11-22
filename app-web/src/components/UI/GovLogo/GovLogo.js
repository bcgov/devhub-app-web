import React from 'react';
import Aux from '../../../hoc/auxillary';
import logo from '../../../assets/images/logo.png';
import logoMobile from '../../../assets/images/logo.svg';
import styles from './GovLogo.module.css';

const GovLogo = () => (
  <Aux>
    <img src={logo} className="large-screen" alt="Government of British Columbia" />
    <img
      src={logoMobile}
      className={[styles.MobileLogo, 'small-screen'].join(' ')}
      alt="Government of British Columbia"
    />
  </Aux>
);

export default GovLogo;
