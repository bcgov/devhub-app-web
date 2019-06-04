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

const TitleWrapper = styled.div`
  margin-bottom: 10px;
  color: #494949;
  h1 {
    margin-bottom: 5px;
  }
`;

const Subtitle = styled.h4`
  font-size: 1em;
  max-width: 565px;
  margin-bottom: 0;
  padding: 3px;
  line-height: 1.5em;
`;

export const Title = ({ title, subtitle }) => (
  <TitleWrapper>
    <h1>{title}</h1>
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
  </TitleWrapper>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

Title.defaultProps = {
  subtitle: null,
};

export default Title;
