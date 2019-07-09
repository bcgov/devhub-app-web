import React from 'react';
import styled from '@emotion/styled';
import { BANNER_ID } from '../../../constants/ui';
import { HOME_ROUTE } from '../../../constants/routes';
import GovLogo from '../GovLogo/GovLogo';

import Link from '../Link/Link';
import AppLogo from '../AppLogo/AppLogo';

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: inherit;
  margin: 0 10px 0 0;
  :hover {
    text-decoration: none;
    color: inherit;
  }
  :visited {
    color: inherit;
  }
`;

const Banner = () => {
  return (
    <StyledLink id={BANNER_ID} to={HOME_ROUTE}>
      <GovLogo />
      <AppLogo />
    </StyledLink>
  );
};

export default Banner;
