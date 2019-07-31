/* eslint-disable jsx-a11y/anchor-is-valid */
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
import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import { MAIN_NAV_ROUTES } from '../../constants/routes';
import { createIam } from '../../auth';
import styled from '@emotion/styled';

export const TEST_IDS = {
  mobile: 'navbar-mobile',
  regular: 'navbar-regular',
};

const UL = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;

  li {
    height: 44px;
    margin-bottom: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  a {
    :hover {
      text-decoration: underline;
    }
    &.activeFilter:hover {
      text-decoration: none;
    }
    &.activeFilter {
      background-color: rgba(123, 162, 204, 0.5);
      border-bottom: 2px solid #fcc219;
    }
    color: inherit;
    cursor: pointer;
    display: flex;
    flex-grow: 1;
    padding: 0 10px;
    height: 100%;
    align-items: center;
    justify-content: center;
    :visited {
      color: inherit;
    }
  }
  @media screen and (min-width: 932px) {
    li:first-child {
      flex-basis: 75px;
      text-align: center;
    }
  }
`;

const AuthContainer = styled.div`
  padding: 10px;
  background-color: #fafafa;
  text-align: right;
`;

const Container = styled.nav`
  background-color: #38598a;
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 65px;
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.25);
  z-index: 150;

  .largeOnly {
    display: none;
  }

  @media screen and (min-width: 932px) {
    padding: 0 65px;

    .mobileOnly {
      display: none;
    }

    .largeOnly {
      display: flex;
      align-items: center;
      flex-flow: row wrap;
    }
  }
`;

export const Navbar = ({ mobile, authenticated }) => {
  const [implicitAuthManager, setImplicitAuthManager] = useState(null);
  useEffect(() => {
    setImplicitAuthManager(createIam());
  }, [implicitAuthManager]);

  const links = Object.keys(MAIN_NAV_ROUTES).map(resourceType => {
    return (
      <li key={MAIN_NAV_ROUTES[resourceType].to}>
        <Link
          exact="true"
          to={MAIN_NAV_ROUTES[resourceType].to}
          data-testid={MAIN_NAV_ROUTES[resourceType].testId}
          activeClassName={'activeFilter'}
        >
          {MAIN_NAV_ROUTES[resourceType].text}
        </Link>
      </li>
    );
  });

  let loginComponent = null;
  if (implicitAuthManager) {
    loginComponent = authenticated ? (
      <a
        onClick={() => implicitAuthManager.clearAuthLocalStorage()}
        href={implicitAuthManager.getSSOLogoutURI()}
      >
        Login
      </a>
    ) : (
      <a href={implicitAuthManager.getSSOLoginURI()}>Login</a>
    );
  }
  return (
    <Container data-testid={mobile ? TEST_IDS.mobile : TEST_IDS.regular}>
      {mobile && <AuthContainer>{loginComponent}</AuthContainer>}
      <UL className={mobile ? 'mobileOnly' : 'largeOnly'}>{links}</UL>
    </Container>
  );
};

Navbar.propTypes = {
  mobile: PropTypes.bool,
  authenticated: PropTypes.bool,
};

Navbar.defaultProps = {
  mobile: false,
  authenticated: false,
};

export default Navbar;
