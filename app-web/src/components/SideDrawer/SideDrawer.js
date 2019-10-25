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
import { css } from '@emotion/core';
import posed from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Backdrop from '../UI/Backdrop/Backdrop';

const withPadding = css`
  padding: 10px;
`;

// create a pose component that can handle animating
const SlideInLeft = posed.div({
  show: {
    x: 0,
    transition: {
      duration: 300,
    },
  },
  hide: {
    x: '-100%',
    transition: {
      duration: 300,
    },
  },
});

// fit posed component into styled component for further styling
const Drawer = styled(SlideInLeft)`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 275px;
  background-color: #fff;
  z-index: 300;
  border-right: 1px solid #ccc;
  display: flex;
  transform: translateX(-100%);
  flex-flow: column nowrap;
`;

const H2 = styled.h2`
  ${withPadding}
  justify-content: space-between;
  word-break: break-word;
  font-size: 25px;
  align-items: center;
  padding: 10px 5px;
  display: flex;
  color: #444;
  margin-bottom: 5px;
  margin-right: 30px;
  padding-right: 30px;
  flex: 0 0 auto;
  border-bottom: 1px solid #ccc;
`;

const TitleDiv = styled.div`
  display: inline-block;
  bottom-margin: 0px;
`;

const IconButton = styled.button`
  font-size: 1em;
  position: absolute;
  right: 5px;
  margin-left: 10px;
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

export const TEST_IDS = {
  drawer: 'side-drawer',
  closeButton: 'side-drawer-close-button',
  backdrop: 'side-drawer-backdrop',
};
export const SideDrawer = ({ closeDrawer, children, title, show, addContent }) => {
  let content = '';
  if (addContent) {
    content = 'Content';
  }
  return (
    <React.Fragment>
      <Backdrop clicked={closeDrawer} show={show} data-testid={TEST_IDS.backdrop} />
      <Drawer pose={show ? 'show' : 'hide'} data-testid={TEST_IDS.drawer}>
        <H2>
          <TitleDiv>
            <span>{title}</span>
            <br />
            {content}
          </TitleDiv>
          <IconButton onClick={closeDrawer} data-testid={TEST_IDS.closeButton}>
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </H2>
        <Menu>{children}</Menu>
      </Drawer>
    </React.Fragment>
  );
};

SideDrawer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  closeDrawer: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

SideDrawer.defaultProps = {
  title: '',
  children: null,
  show: false,
};

export default SideDrawer;
