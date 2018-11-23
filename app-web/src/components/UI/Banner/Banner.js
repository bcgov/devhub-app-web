import React from 'react';
import PropTypes from 'prop-types';
import { BANNER_ID } from '../../../constants/ui';
import { HOME_ROUTE } from '../../../constants/routes';
import GovLogo from '../GovLogo/GovLogo';
import AppLogo from '../AppLogo/AppLogo';
import Link from '../Link/Link';
import classes from './Banner.module.css';

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
