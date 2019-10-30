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

const Div = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 250;
  background-color: rgba(0, 0, 0, 0.35);
`;

const Backdrop = ({ clicked, show, ...rest }) => show && <Div onClick={clicked} {...rest} />;

Backdrop.propTypes = {
  clicked: PropTypes.func,
  show: PropTypes.bool.isRequired,
};

Backdrop.defaultProps = {
  clicked: null,
  show: false,
};

export default Backdrop;
