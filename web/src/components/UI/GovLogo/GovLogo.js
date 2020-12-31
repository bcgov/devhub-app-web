import React from 'react';
import Aux from '../../../hoc/auxillary';
import logo from '../../../assets/images/BCID_H_rgb_rev.svg';
import logoMobile from '../../../assets/images/logo.svg';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const noMargin = css`
  margin-bottom: 0;
`;
const LargeLogo = styled.img`
  ${noMargin}
  width: 175px;
  @media (max-width: 480px) {
    display: none;
  }
`;
const SmallLogo = styled.img`
  ${noMargin}
  width: 50px;
  @media (min-width: 480px) {
    display: none;
  }
`;

const GovLogo = () => (
  <Aux>
    <LargeLogo src={logo} alt="Government of British Columbia" />

    <SmallLogo src={logoMobile} alt="Government of British Columbia" />
  </Aux>
);

export default GovLogo;
