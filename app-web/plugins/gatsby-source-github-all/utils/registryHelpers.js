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
  isConfigForFetchingFiles, // checks if the source properties for sourcetype github is for fetching multiple files
} = require('./sources/github/helpers.js');
const { flattenGithubFilesToRegistryItems } = require('./sources/github');
const { inferIdByType } = require('./inferIdByType');

/**
 * registry configuration allows for multiple ways of configuring particular sources
 * for example github sources can grab a file or files
 * this function normalizes these configurations and 'expands' any condensed configurations
 * suchs as the github source files property
 * @param {Array} registry the registry
 * @returns {Array} the expanded registry
 */
const expandRegistry = registry =>
  registry.map(registryItem => {
    // expand regisrty item sources
    registryItem.sources = registryItem.sources.reduce((sources, currentSource) => {
      if (currentSource.sourceType === SOURCE_TYPES.GITHUB) {
        // github sources have the convenient interface for registering multiple files in the registry config
        // they are now expanded to be individual 'source' configs so that they may be indentifiable
        if (isConfigForFetchingFiles(currentSource.sourceProperties)) {
          sources = sources.concat(flattenGithubFilesToRegistryItems(currentSource));
        } else {
          sources = sources.concat(currentSource);
        }
      } else {
        sources = sources.concat(currentSource);
      }
      return sources;
    }, []);

    return registryItem;
  });

/**
 * loops over all expanded sources in the registry and binds a unique id
 * @param {Array} registry
 * @returns {Array} registry with sources bound to ids
 */
const applyInferredIdToSources = registry =>
  registry.map(registryItem => {
    registryItem.sources.map(source => ({
      ...source,
      id: inferIdByType(source),
    }));

    return registryItem;
  });
/**
 * extracts all sources from the registry and processes them into a flat
 * array
 * @param {Array} registry the registry items
 * @returns {Array} the list of individual sources
 */
const extractSourcesFromRegistry = registry => {
  let sources = [];
  registry.forEach(registryItem => {
    registryItem.sourceProperties.sources.forEach(source => {
      sources = sources.concat(source);
    });
  });

  return sources;
};

module.exports = { extractSourcesFromRegistry, applyInferredIdToSources, expandRegistry };
