import React from 'react';
import Aux from '../../../hoc/auxillary';
import logo from '../../../assets/images/BCID_H_rgb_rev.svg';
import logoMobile from '../../../assets/images/logo.svg';
import { css } from '@emotion/core';

const noMargin = css`
  margin-bottom: 0;
`;

const GovLogo = () => (
  <Aux>
    <img
      src={logo}
      css={css`
        ${noMargin}
        width: 175px;
        @media (max-width: 480px) {
          display: none;
        }
      `}
      alt="Government of British Columbia"
    />

    <img
      src={logoMobile}
      css={css`
        ${noMargin}
        width: 50px;
        @media (min-width: 480px) {
          display: none;
        }
      `}
      alt="Government of British Columbia"
    />
  </Aux>
);

export default GovLogo;
