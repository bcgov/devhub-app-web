//
// Dev Hub
//
// Copyright © 2018 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Created by Patrick Simonian on 2018-10-12.
//
const _ = require('lodash'); // eslint-disable-line
const chalk = require('chalk'); // eslint-disable-line
const { TypeCheck } = require('@bcgov/common-web-utils');
const slugify = require('slugify');
const {
  hashString,
  isSourceCollection,
  validateRegistryItemAgainstSchema,
  newCollection,
  getCollectionDescriptionBySourceType,
  assignPositionToCollection,
  assignPositionToSource,
  getClosest,
} = require('./utils/helpers');
const { fetchFromSource, validateSourceRegistry } = require('./utils/fetchSource');
const {
  COLLECTION_TYPES,
  REGISTRY_ITEM_SCHEMA,
  COLLECTION_TEMPLATES,
  COLLECTION_TEMPLATES_LIST,
} = require('./utils/constants');
const { createSiphonNode, createCollectionNode } = require('./utils/createNode');
const Store = require('./utils/Store');
/**
 * maps root level attributes to a child 'source'
 * this only happens for collections that are set in the registry
 * @param {Object} rootSource
 * @param {Object} targetSource
 */
const mapInheritedSourceAttributes = ({ name, attributes, resourceType }, targetSource) => ({
  attributes: normalizeAttributes({
    ...attributes,
    ...targetSource.attributes,
  }),
  resourceType,
  name,
  collection: {
    name,
    type: COLLECTION_TYPES.CURATED,
  },
  ...targetSource,
});

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
  if (!registry.sources || !sourcesAreValid(registry.sources)) {
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
    return registryFound[0];
  }

  throw new Error('Registry not found');
};

/**
 * Filteres out resources that have the ignore metadata property set to true
 * @param {Array} sources
 * @returns {Array} the filtered sources
 */
const filterIgnoredResources = sources =>
  sources.filter(s => {
    if (!Object.prototype.hasOwnProperty.call(s.metadata, 'ignore') || !s.metadata.ignore) {
      return true;
    }
    console.log(
      chalk`\n The resource {green.bold ${
        s.metadata.name
      }} has been flagged as {green.bold 'ignore'} and will not have a Siphon Node created for it`,
    );
    return false;
  });

/**
 * simply maps persona to personas as an array
 * if personas already exists and its valid, persona does not override
 * @param {Object} attributes the attribute registry item property
 */
const normalizePersonas = attributes => {
  const newAttributes = { ...attributes };
  if (
    Object.prototype.hasOwnProperty.call(newAttributes, 'personas') &&
    TypeCheck.isArrayOf(String, newAttributes.personas)
  ) {
    return newAttributes;
  } else if (
    Object.prototype.hasOwnProperty.call(newAttributes, 'persona') &&
    TypeCheck.isString(newAttributes.persona)
  ) {
    newAttributes.personas = [newAttributes.persona];
  } else {
    newAttributes.personas = [];
  }

  return newAttributes;
};

/**
 * helper to normalize any inconsistencies in the attributes for a registry item
 * @param {Object} attributes
 */
const normalizeAttributes = attributes => {
  return normalizePersonas(attributes);
};

/**
 * creates the list of 'source' objects that are used by the fetch source routine
 * if a source is a collection
 * its child 'sources' inherit attributes from the collection like name, attributes, resourceType
 * and then is flattened out along with all other sources
 * if the child sources have properties (with the exception of name) that conflict with the parent
 * the child properties take priority
 * @param {Array} sources
 */
const getFetchQueue = async (sources, tokens) => {
  const slugStore = new Store([], {
    conflictCb: slug =>
      `The collection slug ${slug}, has already been used. This is a warning message, in future versions we may remove your collection on conflict`,
  });

  const collectionPromises = sources.map(async (source, index) => {
    const rootSource = { ...source };
    const slug = slugify(rootSource.slug || rootSource.name);
    // check if slug is already in use and if it is print out the warning message as described by
    // the conflic Cb above
    slugStore.checkConflict(slug).set(slug, slug);

    let collection = newCollection(
      assignPositionToCollection(
        {
          name: rootSource.name,
          sources: [],
          template: rootSource.template
            ? getClosest(rootSource.template, COLLECTION_TEMPLATES_LIST)
            : COLLECTION_TEMPLATES.DEFAULT,
          templateFile: rootSource.templateFile || '',
          slug,
        },
        index,
      ),
    );
    // create function to set source position by collection
    const setSourcePositionByCollection = assignPositionToSource(collection);

    if (isSourceCollection(rootSource)) {
      // if its a collection, the child sources need some properties from the root source to be
      // mapped to it
      const mappedChildSources = rootSource.sourceProperties.sources.map(
        (childSource, sourceIndex) =>
          setSourcePositionByCollection(
            mapInheritedSourceAttributes(rootSource, childSource),
            sourceIndex,
          ),
      );

      collection = newCollection(collection, {
        type: COLLECTION_TYPES.CURATED,
        description: rootSource.description,
        sources: mappedChildSources,
      });
    } else {
      const sources = [
        {
          ...rootSource,
          attributes: normalizeAttributes(rootSource.attributes),
          collection: {
            name: rootSource.name,
            type: COLLECTION_TYPES[rootSource.sourceType],
          },
        },
      ].map((source, sourceIndex) => setSourcePositionByCollection(source, sourceIndex));
      // this is a basic source either github or web
      // we still treat it as its own collection but with a different type
      collection = newCollection(collection, {
        type: COLLECTION_TYPES[rootSource.sourceType],
        description: await getCollectionDescriptionBySourceType(rootSource, tokens),
        slug,
        sources,
      });
    }
    return collection;
  });

  return Promise.all(collectionPromises);
};

/**
 * fetches source based on source type and source properties
 * if source is found to be a collection it recurses over and return
 * @param {Object} source the source object
 * @param {Function} createNodeId gatsby fn
 * @param {Function} createNode gatsby fn
 * @param {Object} tokens the tokens passed from options
 * @returns {Array} the list of resources retrieved from the source
 */
const processSource = async (source, createNodeId, createNode, tokens, collectionId) => {
  const resources = await fetchFromSource(source.sourceType, source, tokens);
  // any resources that hvae the metadata ignore flag are filtered out to prevent a node being created
  const filteredResources = filterIgnoredResources(resources);
  return Promise.all(
    filteredResources.map(async resource => {
      const hash = hashString(JSON.stringify(resource));
      const id = createNodeId(hash);
      const siphonNode = createSiphonNode(resource, id, collectionId);
      await createNode(siphonNode);
      return siphonNode;
    }),
  );
};

/**
 * process the collection and fetches all sources for it
 * creating a collection node and all source nodes for the collection,
 * @param {Object} collection the collection
 * @param {Function} createNodeId gatsby fn
 * @param {Function} createNode gatsby fn
 * @param {Function} createParentChildLink gatsby fn
 * @param {Object} tokens tokens passed from options
 * @returns {Object} the collection object
 * {
 *   ...collectionProperties
 *   sources: [{...source}]
 * }
 */
const processCollection = async (
  collection,
  createNodeId,
  createNode,
  createParentChildLink,
  tokens,
) => {
  const hash = hashString(JSON.stringify(collection));
  // id for collection node
  const id = createNodeId(hash);
  // fetch all sources
  const sourceNodes = await Promise.all(
    collection.sources.map(source => processSource(source, createNodeId, createNode, tokens, id)),
  );
  // flatten source nodes to get a list of all the resources
  const resources = _.flatten(sourceNodes, true);
  const collectionNode = createCollectionNode(collection, id);

  await createNode(collectionNode);
  resources.forEach(r => createParentChildLink({ parent: collectionNode, child: r }));
  // establish a parent child link between all resources and the collection node
  return collectionNode;
};

/**
 * event handler for the gatsby source plugin
 * more info https://www.gatsbyjs.org/docs/create-source-plugin/
 * @param {Object} gatsbyEventObject
 * @param {Object} options
 */
// eslint-disable-next-line consistent-return
const sourceNodes = async ({ getNodes, actions, createNodeId }, { tokens, sourceRegistryType }) => {
  // get registry from current nodes
  const registry = getRegistry(getNodes, sourceRegistryType);
  const { createNode, createParentChildLink } = actions;
  try {
    // check registry prior to fetching data
    checkRegistry(registry);
    // map of over registry and create a queue of collections to fetch
    const fetchQueue = await getFetchQueue(registry.sources, tokens);

    const collections = await Promise.all(
      fetchQueue.map(async collection =>
        processCollection(collection, createNodeId, createNode, createParentChildLink, tokens),
      ),
    );

    return collections;
  } catch (e) {
    // failed to retrieve files or some other type of failure
    // eslint-disable-next-line
    console.error(e);
    throw e;
  }
};

module.exports = {
  getRegistry,
  checkRegistry,
  createSiphonNode,
  sourceNodes,
  filterIgnoredResources,
  sourcesAreValid,
  mapInheritedSourceAttributes,
  getFetchQueue,
  normalizePersonas,
  processSource,
  processCollection,
  validateRegistryItem,
};
