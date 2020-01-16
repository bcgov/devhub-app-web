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
  margin-top: 15px;
  height: auto;
  width: 10%;
  @media (max-width: 480px) {
    display: none;
  }
`;

const AlgoliaLogo = () => (
  <Aux>
    <a href="https://www.algolia.com/">
      <LargeLogo src={logo} alt="Powered By Algolia" />
    </a>
  </Aux>
);

export default AlgoliaLogo;
