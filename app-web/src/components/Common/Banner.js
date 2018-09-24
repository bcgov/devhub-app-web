import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { HOME_ROUTE } from '../../constants/routes';
import GovLogo from '../UI/GovLogo/GovLogo';
import classes from './Common.module.css';

const Banner = ({ title }) => {
  return (
    <Link to={HOME_ROUTE} className={classes.Logo}>
      <GovLogo />
      <h1>{title}</h1>
    </Link>
  );
};

Banner.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Banner;
