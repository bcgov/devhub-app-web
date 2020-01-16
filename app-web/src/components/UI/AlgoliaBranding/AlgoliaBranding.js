import React from 'react';
import Aux from '../../../hoc/auxillary';
import logo from '../../../assets/images/algolia.svg';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const noMargin = css`
  margin-bottom: 0;
`;
const LargeLogo = styled.img`
  ${noMargin}
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 10%;
  @media (max-width: 480px) {
    display: none;
  }
`;

const AlgoliaLogo = () => (
  <Aux>
    <LargeLogo src={logo} alt="Powered By Algolia" />
  </Aux>
);

export default AlgoliaLogo;
