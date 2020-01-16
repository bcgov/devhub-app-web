import React from 'react';
import Aux from '../../../hoc/auxillary';
import logo from '../../../assets/images/algolia.png';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const noMargin = css`
  margin-bottom: 0;
`;

const SmallLogo = styled.img`
  ${noMargin}
  width: 50px;
  @media (min-width: 480px) {
    display: none;
  }
`;

const AlgoliaBranding = () => (
  <Aux>
    <SmallLogo src={logo} alt="Algolia" />
  </Aux>
);

export default AlgoliaBranding;
