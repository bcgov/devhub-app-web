/*
Copyright 2019 Province of British Columbia

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
import PropTypes from 'prop-types';
import Link from './Link';
import styled from '@emotion/styled';

const ButtonLink = ({ to, children, ...rest }) => (
  <Link to={to} {...rest}>
    {children}
  </Link>
);

const StyledLink = styled(ButtonLink)`
  background-color: ${({ theme }) => theme.colors.blue};
  font-weight: 400;
  text-align: center;
  color: white;
  border-radius: 5px;
  display: block;
  margin: 0 auto;
  padding: 0.5em;
  width: 150px;
  text-decoration: none;
`;

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default StyledLink;
