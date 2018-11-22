import React from 'react';
import PropTypes from 'prop-types';
import { BANNER_ID } from '../../constants/ui';
import { HOME_ROUTE } from '../../constants/routes';
import GovLogo from '../UI/GovLogo/GovLogo';
import AppLogo from '../UI/AppLogo/AppLogo';
import Link from './Link';
import classes from './Common.module.css';

const Banner = () => {
  return (
    <Link id={BANNER_ID} className={classes.Logo} to={HOME_ROUTE}>
      <GovLogo />
      <AppLogo />
    </Link>
  );
};

Banner.propTypes = {
  navigateOnClickPath: PropTypes.string,
};

Banner.defaultProps = {
  navigateOnClickPath: '',
};

export default Banner;
