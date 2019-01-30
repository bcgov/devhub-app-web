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
import queryString from 'query-string';
import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';
import Search from '../../Search/Search';

// bootstraps the gatsby link, when the 'to' prop is a relative path,
// the active class is set based on if the if the query string parameter matches
// this is not a replacement for the Link component, as setting activeClassName by path matching
// doesn't work anymore
export const linkMatchesQueryString = (location, to, activeClassName) => {
  // convert to into an URL object
  // at this point we absolutely know that 'to' must be a relative path,
  // there for we prepend a dummy url to it so that it can be processed by URL
  const url = new URL(`https://developer.gov.bc.ca/${to}`);

  const currentQueryString = queryString.parse(location.search);
  const linkQueryString = queryString.parse(url.search);

  // see if current query string contains link query strings value and they match
  const matches = Object.keys(currentQueryString).some(
    key => linkQueryString[key] && currentQueryString[key] === linkQueryString[key],
  );

  return matches ? { className: activeClassName } : null;
};

const SearchAwareLink = ({ activeClassName, children, ...rest }) => (
  <Link
    {...rest}
    getProps={(location, href) => linkMatchesQueryString(location, href, activeClassName)}
  >
    {children}
  </Link>
);

SearchAwareLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SearchAwareLink;
