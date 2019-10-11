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
const { isTopicRegistryJson, isJourneyRegistryJson } = require('./validators');
const isArray = require('lodash/isArray');

/**
 * reduces a journey which is a 2d version of a  topic to a topic
 * this is purely so that we can leverage routines that are already working in this file
 * to extract github raw sources
 * @param {Array} registry
 * @returns {Array}
 */
const reduceJourneyRegistryToTopic = registry => {
  const topicRegistry = registry.map(r => {
    return {
      ...r,
      sourceProperties: {
        sources: r.sourceProperties.stops.reduce((stopsAcc, stop) => {
          const { stops, ...rest } = stop;
          if (stops) {
            // we need to keep a reference for all 'sub stops' that belong to a stop
            const stopsWithReference = stops.map(s => ({ ...s, connectsWith: { ...rest } }));
            return stopsAcc.concat(rest).concat(stopsWithReference);
          } else {
            return stopsAcc.concat(stop);
          }
        }, []),
      },
    };
  });
  return topicRegistry;
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
        if (currentSource.sourceType === 'github') {
          // github sources have the convenient interface for registering multiple files in the registry config
          // they are now expanded to be individual 'source' configs so that they may be indentifiable
          if (isArray(currentSource.sourceProperties.files)) {
            const { repo, owner, branch } = currentSource.sourceProperties;
            const flattenedSources = currentSource.sourceProperties.files.map(file => {
              return {
                sourceType: 'github',
                sourceProperties: {
                  repo,
                  owner,
                  file,
                  branch,
                },
              };
            });
            sources = sources.concat(flattenedSources);
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
 * split apart sources from their topics so that we have a flat list of sources
 * @param {Array} expandedRegistry
 * @returns {Array} the flattened sources
 */
const flattenExpandedRegistry = expandedRegistry =>
  expandedRegistry.reduce((sources, registryItem) => {
    const personas = registryItem.attributes && registryItem.attributes.personas;
    const flattenedSources = registryItem.sourceProperties.sources.map(s => ({
      source: s,
      topic: registryItem.name,
      topicResourceType: registryItem.resourceType,
      topicPersonas: personas || [],
    }));
    return sources.concat(flattenedSources);
  }, []);

const getFilesFromRegistry = getNodes => {
  const nodes = getNodes();
  const sourceToTopicMap = {};

  const REGISTRY_TYPES = {
    TOPIC: 'TOPIC',
    JOURNEY: 'JOURNEY',
  };
  // get RegistryJson nodes
  const topicRegistry = nodes
    .filter(isTopicRegistryJson)
    .map(n => ({ ...n, type: REGISTRY_TYPES.TOPIC }));
  const journeyRegistry = nodes
    .filter(isJourneyRegistryJson)
    .map(n => ({ ...n, type: REGISTRY_TYPES.JOURNEY }));
  const mappedTopicRegistry = reduceJourneyRegistryToTopic(journeyRegistry);

  // expand registry so that any items that list multiple files (for source: github)
  // are spread into individual objects
  // [{sourceProperties: { files: [A, B]}}] => [{sourceProperties: { file: A}}, {sourceProperties: { file: B}}]
  const expandedRegistry = expandRegistry(topicRegistry.concat(mappedTopicRegistry));

  const sources = expandedRegistry.reduce((sources, registryItem) => {
    const personas = registryItem.attributes && registryItem.attributes.personas;
    const flattenedSources = registryItem.sourceProperties.sources.map(s => {
      if (registryItem.type === REGISTRY_TYPES.TOPIC) {
        return {
          source: s,
          topic: registryItem.name,
          topicResourceType: registryItem.resourceType,
          topicPersonas: personas || [],
        };
      } else if (registryItem.type === REGISTRY_TYPES.JOURNEY) {
        return {
          source: s,
          journey: registryItem.name,
          journeyResourceType: registryItem.resourceType,
          journeyPersonas: personas || [],
        };
      }
      return null;
    });
    return sources.concat(flattenedSources);
  }, []);

  // add position metadata to github urls and set non github source types to null
  // so that they are filterable
  const resolvedGitSources = sources
    .map((s, ind) => {
      const {
        source,
        topic,
        topicResourceType,
        topicPersonas,
        journey,
        journeyResourceType,
        journeyPersonas,
      } = s;

      if (source.sourceType === 'github') {
        const {
          sourceProperties: { repo, owner, branch, file },
          connectsWith,
        } = source;

        const fileBranch = branch ? branch : 'master';
        return {
          url: `https://github.com/${owner}/${repo}/blob/${fileBranch}/${file}`,
          position: ind,
          topic,
          topicResourceType,
          topicPersonas,
          journeyPersonas,
          journey,
          journeyResourceType,
          journeyConnectsWith: connectsWith,
        };
      } else {
        // web source types are ignored
        return null;
      }
    })
    .filter(s => s !== null); // filter out web types

  // map out urls to their respective topics since this is 1 to many relationship
  // ends up with structure that is similar to this => {url1: {topics: [topicA, topicB], ...other props}}
  resolvedGitSources.forEach(
    ({ url, topic, journey, topicResourceType, topicPersonas, position }) => {
      if (Object.prototype.hasOwnProperty.call(sourceToTopicMap, url)) {
        if (topic) {
          sourceToTopicMap[url].topics.push(topic);
        }
        if (journey) {
          sourceToTopicMap[url].journeys.push(journey);
        }
      } else {
        sourceToTopicMap[url] = {
          topics: topic ? [topic] : [],
          journeys: journey ? [journey] : [],
          topicResourceType,
          topicPersonas,
          position: position,
        };
      }
    },
  );

  // convert sourceToTopicMap to an array in the expected structure for the github raw plugin
  return Object.keys(sourceToTopicMap).map(url => ({
    url,
    topics: sourceToTopicMap[url].topics,
    journeys: sourceToTopicMap[url].journeys,
    topicResourceType: sourceToTopicMap[url].topicResourceType, // the following props are being bound to cascade
    // resource types/personas from the collection to the individual resource, this preserves a feature of
    // providing reasonable defaults for resource type/personas if they dont exist inside the github raw nodes
    // markdown frontmatter
    topicPersonas: sourceToTopicMap[url].topicPersonas,
    position: sourceToTopicMap[url].position,
  }));
};

module.exports = {
  getFilesFromRegistry,
  expandRegistry,
  flattenExpandedRegistry,
  reduceJourneyRegistryToTopic,
};
