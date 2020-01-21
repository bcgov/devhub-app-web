import React from 'react';
import logo from '../../../assets/images/algolia.svg';
import styled from '@emotion/styled';

const LogoContainer = styled.div`
  display: inline block;
  padding: 15px;
  max-width: 220px;
  img {
    width: 100%;
  }
`;

const AlgoliaLogo = ({ ...rest }) => (
  <LogoContainer {...rest}>
    <a href="https://www.algolia.com/">
      <img src={logo} alt="Algolia Logo" />
    </a>
  </LogoContainer>
);
export default AlgoliaLogo;
