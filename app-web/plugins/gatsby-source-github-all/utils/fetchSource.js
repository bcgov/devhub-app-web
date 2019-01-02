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

const { SOURCE_TYPES } = require('./constants');
const { fetchSourceGithub, validateSourceGithub } = require('./sources/github');
const { fetchSourceWeb, validateSourceWeb } = require('./sources/web');
/**
 * maps to a fetch function for that sourceType,
 * all fetch functions implement the same return object
 * @param {String} sourceType // the source type
 * @param {Object} source  // source object as found in source regsitry
 * @param {Object} tokens // relevant API tokens needed to fetch from sources
 */
const fetchFromSource = (sourceType, source, { GITHUB_API_TOKEN }) => {
  switch (sourceType) {
    case SOURCE_TYPES.GITHUB:
      return fetchSourceGithub(source, GITHUB_API_TOKEN);
    case SOURCE_TYPES.WEB:
      return fetchSourceWeb(source);
    default:
      return [];
  }
};

/**
 * validates source registry components
 * based on source type
 * @param {String} sourceType
 * @param {Object} source
 */
const validateSourceRegistry = source => {
  switch (source.sourceType) {
    case SOURCE_TYPES.GITHUB:
      return validateSourceGithub(source);
    case SOURCE_TYPES.WEB:
      return validateSourceWeb(source);
    default:
      return false;
  }
};

module.exports = { fetchFromSource, validateSourceRegistry };
