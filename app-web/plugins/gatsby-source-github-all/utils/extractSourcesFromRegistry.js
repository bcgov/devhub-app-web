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
const { SOURCE_TYPES } = require('./constants');
const {
  isConfigForFetchingAFile, // checks if the source properties for sourcetype github is for fetching a single file
  isConfigForFetchingFiles, // checks if the source properties for sourcetype github is for fetching multiple files
} = require('./sources/github/helpers.js');
const { flattenGithubFilesToRegistryItems } = require('./sources/github');
const { inferIdByType } = require('./inferIdByType');
/**
 * extracts all sources from the registry and processes them into a flat
 * array
 * @param {Array} registry the registry items
 */
const extractSourcesFromRegistry = registry => {
  let sources = [];
  registry.forEach(registryItem => {
    registryItem.sourceProperties.sources.forEach(source => {
      // if the source is just a poitner string, return it to be resolved later
      if (source.sourceType === SOURCE_TYPES.WEB) {
        sources = sources.concat({ ...source });
      }

      if (source.sourceType === SOURCE_TYPES.GITHUB) {
        if (isConfigForFetchingAFile(source.sourceProperties)) {
          sources = sources.concat({ ...source });
        } else if (isConfigForFetchingFiles(source.sourceProperties)) {
          sources = sources.concat(flattenGithubFilesToRegistryItems(source));
        }
      }
    });
  });
  // return the sources with the inferred id
  return sources.map(source => ({
    ...source,
    id: inferIdByType(source),
  }));
};

module.exports = { extractSourcesFromRegistry };
