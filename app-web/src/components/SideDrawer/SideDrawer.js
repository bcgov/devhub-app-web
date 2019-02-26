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
import Aux from '../../hoc/auxillary';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Backdrop from '../UI/Backdrop/Backdrop';

const withPadding = css`
  padding: 10px;
`;

const Div = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 275px;
  background-color: #fff;
  z-index: 300;
  border-right: 1px solid #ccc;
  display: flex;
  flex-flow: column nowrap;
`;

const H2 = styled.h2`
  ${withPadding}
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
  display: flex;
  color: #444;
  margin-bottom: 5px;
  flex: 0 0 auto;
  border-bottom: 1px solid #ccc;
`;

const IconButton = styled.button`
  font-size: 1.5em;
  margin-left: 5px;
  align-self: flex-start;
  cursor: pointer;
  border: none;
  background: transparent;
  :focus {
    outline: none;
  }
`;

const Menu = styled.div`
  ${withPadding}
  overflow: auto;
  flex-grow: 1;
`;

const SideDrawer = ({ closeDrawer, children, title }) => (
  <Aux>
    <Backdrop clicked={closeDrawer} />
    <Div>
      <H2>
        <span>{title}</span>
        <IconButton onClick={closeDrawer}>
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
      </H2>
      <Menu>{children}</Menu>
    </Div>
  </Aux>
);

SideDrawer.propTypes = {
  title: PropTypes.string,
  toggled: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

SideDrawer.defaultProps = {
  title: '',
};

export default SideDrawer;
