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
import { graphql } from 'gatsby';
import validUrl from 'valid-url';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import NavItem from './NavItem';

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
// navigation for dynamically created page components
const Navigation = ({ items }) => {
  // map over items and generate links
  const links = items.map(({ unfurl: { title }, resource: { path }, source: { type } }) => (
    <NavItem key={path} text={title} to={path} isExternal={validUrl.isWebUri(path)} />
  ));
  return <List>{links}</List>;
};

export const query = graphql`
  fragment NavigationFragment on DevhubSiphon {
    unfurl {
      title
    }
    resource {
      path
    }
    source {
      type
    }
    _metadata {
      position
    }
  }
`;

Navigation.propTypes = {
  item: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        resourcePath: PropTypes.string,
        resourceTitle: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default Navigation;
