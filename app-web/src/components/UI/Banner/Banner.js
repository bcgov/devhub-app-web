import React from 'react';
import PropTypes from 'prop-types';
import { BANNER_ID } from '../../../constants/ui';
import { HOME_ROUTE } from '../../../constants/routes';
import GovLogo from '../GovLogo/GovLogo';
import AppLogo from '../AppLogo/AppLogo';
import PhaseBanner from '../PhaseBanner/PhaseBanner';
import Link from '../Link/Link';
import classes from './Banner.module.css';
import styled from '@emotion/styled';

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;
const Banner = () => {
  return (
    <StyledLink id={BANNER_ID} className={classes.Logo} to={HOME_ROUTE}>
      <GovLogo />
      <AppLogo />
      <PhaseBanner />
    </StyledLink>
  );
};

Banner.propTypes = {
  navigateOnClickPath: PropTypes.string,
};

Banner.defaultProps = {
  navigateOnClickPath: '',
};

export default Banner;
