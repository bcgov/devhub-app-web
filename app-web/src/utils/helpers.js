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

import { GITHUB_URL } from '../constants/api';
import { TypeCheck } from '@bcgov/common-web-utils';
import { RESOURCE_TYPES } from '../constants/ui';

export const getGithubRepoRoute = (repository, owner) => `${GITHUB_URL}/${owner}/${repository}`;

export const getGithubIssuesRoute = (repository, owner) =>
  `${getGithubRepoRoute(repository, owner)}/issues`;

export const getGithubForkRoute = (repository, owner) =>
  `${getGithubRepoRoute(repository, owner)}/fork`;

export const getGithubWatchRoute = (repository, owner) =>
  `${getGithubRepoRoute(repository, owner)}/subscription`;

export const getGithubUsernameURL = username => `${GITHUB_URL}/${username}`;
/**
 * returns a github username image url
 * @param {String} username
 * @param {Number} size
 * @returns {String} the github path to the user's avatar
 */
export const getGithubAvatarFromUsername = (username, size) => {
  if (!TypeCheck.isString(username) || username.length === 0) {
    return '';
  }
  const sizeParam = size ? `?size=${size}` : '';
  return `${getGithubUsernameURL(username)}.png${sizeParam}`;
};

/**
 * gets the constant resource type related to a page path
 * @param {String} pathname
 * @returns {String} the resource type
 */
export const mapPagePathToResourceTypeConst = pathname => {
  // remove all non word characters
  // path name should come in as '/components' etc
  const trimmedPath = pathname.replace(/[^\w]+/g, '');
  // conver to upper case so we can access resource type enum properties
  return RESOURCE_TYPES[trimmedPath.toUpperCase()];
};

/**
 * gets search results from lunr
 * @param {String} query the search string
 */
export const getSearchResults = async (query, lunr) => {
  const lunrIndex = lunr.en;
  let results = [];
  // search results by a partial query using wild cards
  let partialResults = [];
  let searchQueryPartial = `*${query}*`;
  // attempt to search by parsing query into fields
  try {
    partialResults = lunrIndex.index.search(searchQueryPartial);
    results = lunrIndex.index.search(query);
  } catch (e) {
    // if that fails treat query as plain text and attempt search again
    partialResults = lunrIndex.index.query(function() {
      this.term(searchQueryPartial);
    });
    results = lunrIndex.index.query(function() {
      this.term(searchQueryPartial);
    });
  }
  // combine all partial search results with full search results
  results = results.concat(partialResults);
  // search results is an array of reference keys
  // we need to map those to the index store to get the actual
  // node ids
  const searchResultsMap = results
    .map(({ ref }) => lunrIndex.store[ref])
    .reduce((obj, result) => {
      obj[result.id] = { ...result };
      return obj;
    }, {});

  return searchResultsMap;
};
