import React from 'react';
import PropTypes from 'prop-types';
import { navigateTo } from 'gatsby-link';
import { BANNER_ID } from '../../constants/ui';
import GovLogo from '../UI/GovLogo/GovLogo';
import classes from './Common.module.css';

const Banner = ({ title, navigateOnClickPath }) => {
  return (
    <div
      id={BANNER_ID}
      onClick={() => {
        if (navigateOnClickPath) {
          navigateTo(navigateOnClickPath);
        }
      }}
      className={classes.Logo}
    >
      <GovLogo />
      <h1>{title}</h1>
    </div>
  );
};

Banner.propTypes = {
  title: PropTypes.string.isRequired,
  navigateOnClickPath: PropTypes.string,
};

Banner.defaultProps = {
  navigateOnClickPath: '',
};

export default Banner;
