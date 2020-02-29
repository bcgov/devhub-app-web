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
import { Link } from '../UI/Link';
import { CUSTOM_BREAKPOINTS } from '../../constants/designTokens';
import Login from '../Auth/Login';

export const NavContainer = styled.nav`
  background-color: ${({ theme }) => theme.colors['bgBlue']};
  color: #fff;
  display: ${({ toggled }) => (toggled ? 'block' : 'none')};
  position: fixed;
  left: 0;
  right: 0;
  top: 65px;
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  z-index: 150;

  ${CUSTOM_BREAKPOINTS.navbar} {
    display: block;
    padding: 0 65px;
    font-size: 14px;
  }
  @media screen and (min-width: 932px) {
    font-size: 16px;
  }
`;

export const NavLink = styled(Link)`
  color: inherit;
  cursor: pointer;
  display: flex;
  color: #fff;
  flex-grow: 1;
  box-sizing: border-box;
  text-transform: capitalize;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  padding: 14px 10px;
  :visited,
  :hover {
    color: #fff;
  }
  ${CUSTOM_BREAKPOINTS.navbar} {
    padding: 14px 10px;
  }
  &.active {
    padding-bottom: 12px;
    background-color: rgba(123, 162, 204, 0.5);
    border-bottom: 2px solid #fcc219;
  }
`;

export const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: column;
  text-align: center;
  li {
    margin: 0;
  }
  ${CUSTOM_BREAKPOINTS.navbar} {
    display: flex;

    flex-flow: row wrap;
  }
`;

const AuthContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid #bbc7d5;
  text-align: right;
  display: block;
  a {
    text-decoration: none;
  }
  ${CUSTOM_BREAKPOINTS.navbar} {
    display: none;
  }
`;

export const Navbar = ({ links, toggled }) => {
  const navlinks = links.map(l => (
    <li key={l.to}>
      <NavLink to={l.to} activeClassName="active">
        {l.text}
      </NavLink>
    </li>
  ));

  return (
    <NavContainer toggled={toggled}>
      <AuthContainer>
        <Login />
      </AuthContainer>
      <NavList>{navlinks}</NavList>
    </NavContainer>
  );
};

Navbar.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({ to: PropTypes.string, text: PropTypes.string })),

  toggled: PropTypes.bool,
};
