import React from 'react';
import PropTypes from 'prop-types';
import { navigateTo } from 'gatsby-link';
import { BANNER_ID } from '../../constants/ui';
import GovLogo from '../UI/GovLogo/GovLogo';
import classes from './Common.module.css';

const Banner = ({ title }) => {
  return (
    <div onClick={() => {
      navigateTo('/');
    }} className={classes.Logo}>
      <GovLogo />
      <h1>{title}</h1>
    </div>
  );
};

Banner.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Banner;
