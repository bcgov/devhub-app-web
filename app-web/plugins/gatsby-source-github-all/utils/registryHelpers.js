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
const {
  isConfigForFetchingFiles, // checks if the source properties for sourcetype github is for fetching multiple files
} = require('./sources/github/helpers.js');
const { flattenGithubFilesToRegistryItems } = require('./sources/github');
const { inferIdByType } = require('./inferIdByType');
const { validateSourceRegistry } = require('./fetchSource');
const { SOURCE_TYPES, REGISTRY_ITEM_SCHEMA } = require('./constants');
const { isSourceCollection, validateRegistryItemAgainstSchema } = require('./helpers');
/**
 * @param {Object} registryItem the registry item found within the registry file sources[index]
 * @returns {Boolean} true if registry item is valid
 */
const validateRegistryItem = registryItem =>
  validateRegistryItemAgainstSchema(registryItem, REGISTRY_ITEM_SCHEMA);

/**
 * loops over sources and validates them based on their type
 * @param {Array} sources the sources
 * @returns {Boolean}
 */
const sourcesAreValid = sources => {
  //firstly flatten out any sources that may contain more sources
  let sourcesToCheck = [];

  sources.forEach(s => {
    if (isSourceCollection(s)) {
      sourcesToCheck = sourcesToCheck.concat(s.sourceProperties.sources);
    } else {
      sourcesToCheck = sourcesToCheck.concat([s]);
    }
  });
  return sourcesToCheck.every(validateSourceRegistry);
};

/**
 * validates source registry
 * @param {Object} registry the source registry
 * @returns {Boolean} returns true if valid or otherwise throws
 */
const checkRegistry = registry => {
  if (!registry || !sourcesAreValid(registry)) {
    throw new Error(
      'Error in Gatsby Source Github All: registry is not valid. One or more repos may be missing required parameters',
    );
  }
  return true;
};

/**
 * Filter out all nodes to get the ones specify for registry yaml file
 * @param {Function} getNodes gatsby builtin function to return all nodes
 * @param {String} sourceRegistryType the internal type refering to registry yaml source
 */
const getRegistry = (getNodes, sourceRegistryType) => {
  const registryFound = getNodes().filter(node => node.internal.type === sourceRegistryType);
  if (registryFound.length > 0) {
    return registryFound;
  }

  throw new Error('Registry not found');
};

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
    const item = { ...registryItem, sourceProperties: { ...registryItem.sourceProperties } };
    // console.log('REGISTRY ITEM START');
    // console.log(registryItem, 'REGISTRY ITEM END');
    // expand registry item sources
    item.sourceProperties.sources = registryItem.sourceProperties.sources.reduce(
      (sources, currentSource) => {
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
      },
      [],
    );

    return item;
  });

/**
 * loops over all expanded sources in the registry and binds a unique id
 * @param {Array} registry
 * @returns {Array} registry with sources bound to ids
 */
const applyInferredIdToSources = registry =>
  registry.map(registryItem => {
    const item = { ...registryItem, sourceProperties: { ...registryItem.sourceProperties } };
    item.sourceProperties.sources = registryItem.sourceProperties.sources.map(source => ({
      ...source,
      id: inferIdByType(source),
    }));

    return item;
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

module.exports = {
  extractSourcesFromRegistry,
  applyInferredIdToSources,
  expandRegistry,
  getRegistry,
  checkRegistry,
  validateRegistryItem,
};
