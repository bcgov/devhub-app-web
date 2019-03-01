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
