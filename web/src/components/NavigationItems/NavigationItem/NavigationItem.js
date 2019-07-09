/*
Copyright 2018 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/
import React from 'react';
import Link from '../../UI/Link/Link';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
const NavigationItem = ({ to, text }) => (
  <li>
    <Link
      to={to}
      css={css`
        color: #fff;
        font-size: 0.813em;
        text-transform: capitalize;
        font-weight: normal;
        text-decoration: none;
        :hover {
          color: #fff;
        }
      `}
    >
      {text}
    </Link>
  </li>
);

NavigationItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavigationItem;
