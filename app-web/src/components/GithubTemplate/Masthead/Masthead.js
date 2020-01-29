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
import styled from '@emotion/styled';
import { withPadding } from '../common';
import CardHeader from '../../Card/CardHeader';
import { Title } from '../../Page';
import { RESOURCE_TYPES_LIST } from '../../../constants/ui';

const Header = styled.header`
  background-color: #f1f1f1;
  border-bottom: 1px solid #ccc;
  ${withPadding}
`;
export const TEST_IDS = {
  header: 'github.topic.masthead',
};

const Masthead = ({ title, description, type, render }) => (
  <Header data-testid={TEST_IDS.header}>
    <CardHeader resourceType={type} />
    <Title title={title} subtitle={description} />
    {render && render()}
  </Header>
);

Masthead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.oneOf(RESOURCE_TYPES_LIST),
  render: PropTypes.func,
};

Masthead.defaultProps = {
  description: '',
};

export default Masthead;
