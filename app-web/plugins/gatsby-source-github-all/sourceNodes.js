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
const { isArray, isString, every, isPlainObject } = require('lodash');
const slugify = require('slugify');
const {
  hashString,
  isSourceTopic,
  newTopic,
  getTopicDescriptionBySourceType,
  assignPositionToTopic,
  assignPositionToSource,
  getClosest,
  assignPositionToResource,
  validateAgainstSchema,
} = require('./utils/helpers');
const siphonMessenger = require('./utils/console');
const { fetchFromSource, validateSourceRegistry } = require('./utils/fetchSource');
const {
  TOPIC_TYPES,
  TOPIC_TEMPLATES,
  SOURCE_TYPES,
  TOPIC_TEMPLATES_LIST,
  TOPIC_SOURCE,
} = require('./utils/constants');
const { createSiphonNode } = require('./utils/createNode');
const Store = require('./utils/Store');
const {
  getRegistry,
  checkRegistry,
  expandRegistry,
  applyInferredIdToSources,
} = require('./utils/registryHelpers');
/**
 * maps root level attributes to a child 'source'
 * this only happens for topics that are set in the registry
 * @param {Object} rootSource
 * @param {Object} targetSource
 */
const mapInheritedSourceAttributes = ({ name, attributes, resourceType, slug }, targetSource) => ({
  attributes: normalizeAttributes({
    ...attributes,
    ...targetSource.attributes,
  }),
  resourceType,
  name,
  topic: {
    name,
    type: TOPIC_TEMPLATES.CURATED,
    slug,
  },
  ...targetSource,
});

// /**
//  * @param {Object} registryItem the registry item found within the registry file sources[index]
//  * @returns {Boolean} true if registry item is valid
//  */
// const validateRegistryItem = registryItem =>
//   validateRegistryItemAgainstSchema(registryItem, REGISTRY_ITEM_SCHEMA);

/**
 * loops over sources and validates them based on their type
 * @param {Array} sources the sources
 * @returns {Boolean}
 */
const sourcesAreValid = sources => {
  //firstly flatten out any sources that may contain more sources
  let sourcesToCheck = [];

  sources.forEach(s => {
    if (isSourceTopic(s)) {
      sourcesToCheck = sourcesToCheck.concat(s.sourceProperties.sources);
    } else {
      sourcesToCheck = sourcesToCheck.concat([s]);
    }
  });

  return sourcesToCheck.every(validateSourceRegistry);
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
    // eslint-disable-next-line no-console
    console.log(siphonMessenger.resourceIgnored(s.metadata.name));
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
    isArray(newAttributes.personas) &&
    every(newAttributes.personas, isString)
  ) {
    return newAttributes;
  } else if (
    Object.prototype.hasOwnProperty.call(newAttributes, 'persona') &&
    isString(newAttributes.persona)
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
 * if a source is a topic
 * its child 'sources' inherit attributes from the topic like name, attributes, resourceType
 * and then is flattened out along with all other sources
 * if the child sources have properties (with the exception of name) that conflict with the parent
 * the child properties take priority
 * @param {Array} sources
 */
const getFetchQueue = async (sources, tokens) => {
  const slugStore = new Store([], {
    conflictCb: slug => siphonMessenger.topicSlugConflict(slug),
  });

  const topicPromises = sources.map(async (source, index) => {
    const rootSource = { ...source };
    const { sourceProperties } = rootSource;
    const slug = slugify(rootSource.slug || rootSource.name);
    // check if slug is already in use and if it is print out the warning message as described by
    // the conflic Cb above
    slugStore.checkConflict(slug).set(slug, slug);

    let topicSource = null;
    if (sourceProperties.topicSource && isPlainObject(sourceProperties.topicSource)) {
      topicSource = { ...sourceProperties.topicSource };
    }
    let topic = newTopic(
      assignPositionToTopic(
        {
          name: rootSource.name,
          sources: [],
          topicSource,
          template: rootSource.template
            ? getClosest(rootSource.template, TOPIC_TEMPLATES_LIST)
            : TOPIC_TEMPLATES.DEFAULT,
          templateFile: rootSource.templateFile || '',
          slug,
        },
        index,
      ),
    );
    // create function to set source position by topic
    const setSourcePositionByTopic = assignPositionToSource(topic);

    if (isSourceTopic(rootSource)) {
      // if its a topic, the child sources need some properties from the root source to be
      // mapped to it
      const mappedChildSources = sourceProperties.sources.map((childSource, sourceIndex) =>
        setSourcePositionByTopic(
          mapInheritedSourceAttributes({ ...rootSource, slug }, childSource),
          sourceIndex,
        ),
      );

      topic = newTopic(topic, {
        type: TOPIC_TYPES.CURATED,
        description: rootSource.description,
        sources: mappedChildSources,
      });
    } else {
      const sources = [
        {
          ...rootSource,
          attributes: normalizeAttributes(rootSource.attributes),
          topic: {
            name: rootSource.name,
            type: TOPIC_TYPES[rootSource.sourceType],
            slug,
          },
        },
      ].map((source, sourceIndex) => setSourcePositionByTopic(source, sourceIndex));
      // this is a basic source either github or web
      // we still treat it as its own topic but with a different type
      topic = newTopic(topic, {
        type: TOPIC_TYPES[rootSource.sourceType],
        description: await getTopicDescriptionBySourceType(rootSource, tokens),
        slug,
        sources,
      });
    }
    return topic;
  });

  return Promise.all(topicPromises);
};

/**
 * fetches source based on source type and source properties
 * if source is found to be a topic it recurses over and return
 * @param {Object} source the source object
 * @param {Function} createNodeId gatsby fn
 * @param {Function} createNode gatsby fn
 * @param {Object} tokens the tokens passed from options
 * @returns {Array} the list of resources retrieved from the source
 */
const processSource = async (source, createNodeId, createNode, tokens, topicId) => {
  let resources = await fetchFromSource(source.sourceType, source, tokens);
  const assignPosToResourceBySource = assignPositionToResource({ metadata: source.metadata });
  resources = resources.map((resource, index) => assignPosToResourceBySource(resource, index));
  // any resources that hvae the metadata ignore flag are filtered out to prevent a node being created
  const filteredResources = filterIgnoredResources(resources);
  return Promise.all(
    filteredResources.map(async resource => {
      const hash = hashString(JSON.stringify(resource));
      const id = createNodeId(hash);
      const siphonNode = createSiphonNode(resource, id, topicId);
      await createNode(siphonNode);
      return siphonNode;
    }),
  );
};

/**
 * fetches a github markdown file for a topic and returns the data
 * @param {*} topicSource
 * @param {*} tokens
 */
const getContentForTopic = async (topicSource, tokens, name = '') => {
  const error = validateAgainstSchema(topicSource, TOPIC_SOURCE);

  if (error.isValid) {
    const source = {
      attributes: {},
      sourceProperties: topicSource,
    };
    const file = await fetchFromSource(SOURCE_TYPES.GITHUB, source, tokens);
    // we should only expect one file to be recieved back since topicSource uses the
    // github.file metadata property
    return file[0];
  } else {
    // eslint-disable-next-line no-console
    console.log(siphonMessenger.topicSourceFailed(error.messages, name));
    return {};
  }
};
/**
 * process the topic and fetches all sources for it
 * creating a topic node and all source nodes for the topic,
 * @param {Object} topic the topic
 * @param {Function} createNodeId gatsby fn
 * @param {Function} createNode gatsby fn
 * @param {Function} createParentChildLink gatsby fn
 * @param {Object} tokens tokens passed from options
 * @returns {Object} the topic object
 * {
 *   ...topicProperties
 *   sources: [{...source}]
 * }
 */
const processTopic = async (topic, createNodeId, createNode, createParentChildLink, tokens) => {
  const hash = hashString(JSON.stringify(topic));
  // id for topic node
  const id = createNodeId(hash);
  // fetch all sources
  await Promise.all(
    topic.sources.map(source => processSource(source, createNodeId, createNode, tokens, id)),
  );
  // process topic no longer creates DevhubTopic Nodes !
  // this was removed to make this plugin less monolithic
  // there was code right below this that processed the topic and created a node for it
  // check out the github commits previous to this one to view
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
    // expand and collapsed github source configs (translates files [...] into seperate github sources with file: '...')
    const expandedReg = expandRegistry(registry);
    const regWithIds = applyInferredIdToSources(expandedReg);
    // map of over registry and create a queue of topics to fetch
    const fetchQueue = await getFetchQueue(regWithIds, tokens);
    await Promise.all(
      fetchQueue.map(async topic =>
        processTopic(topic, createNodeId, createNode, createParentChildLink, tokens),
      ),
    );
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
  processTopic,
  getContentForTopic,
};
