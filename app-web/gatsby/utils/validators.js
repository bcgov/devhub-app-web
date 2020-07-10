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

// node validators
const stringSimilarity = require('string-similarity');
const { slugBlackList } = require('../../devhub.config.json');

const isGithubRaw = node => node.internal.type === 'GithubRaw';
const isMarkdownRemark = node => node.internal.type === 'MarkdownRemark';
const isDevhubSiphon = node => node.internal.type === 'DevhubSiphon';
const isMeetupEvent = node => node.internal.type === 'MeetupEvent';
const isEventbriteEvents = node => node.internal.type === 'EventbriteEvents';
const isTopicRegistryJson = node => node.internal.type === 'TopicRegistryJson';
const isJourneyRegistryJson = node => node.internal.type === 'JourneyRegistryJson';
const isMarkdownRemarkFrontmatter = node => node.internal.type === 'MarkdownRemarkFrontmatter';
const isMatomoPageStats = node => node.internal.type === 'MatomoPageStats';

const getClosest = (value, list) => {
  const matches = stringSimilarity.findBestMatch(value, list);
  // only return the best match if its greater than .5 in similarity
  return matches.bestMatch.rating >= 0.5 ? matches.bestMatch.target : '';
};

/**
 * returns the closest resourceType from the constant resourceTypes array based on the
 * uncontrolled resourceType (given to us by contributors)
 * @param {String} resourceType the resource type provided by a specific piece of content
 * @param {Array} resourceTypes the list of resource types
 */
const getClosestResourceType = (resourceType, resourceTypes) => {
  // if its blank don't bother checking closeness
  if (resourceType === '') return '';
  return getClosest(resourceType, resourceTypes);
};

/**
 * returns the closest persona from the array of personas based on the
 * uncontrolled persona (given to us by contributors)
 * @param {Array} personas the personas provided by a specific piece of content
 * @param {Array} personas the valid personas list
 */
const getClosestPersona = (personaList, personas) => {
  // if its blank don't bother checking closeness
  if (personaList.length === 0) return [];

  return personaList.map(p => {
    return getClosest(p, personas);
  });
};

/**
 * Journeys need to be validated for github sources
 * the 'files' argument is not allowed for journeys since a journey
 * explicitly defines an orderered set of resources
 * this fn will throw if the registry item is invalid
 * @param {Object} registryItem
 * @returns {void}
 */
const verifyJourney = registryItem => {
  const throwIfInvalidGithubSource = source => {
    if (source.sourceType === 'github') {
      if (source.sourceProperties.files) {
        throw new Error(`Error with Journey Registry: ${registryItem.name}.
          A primary stop in a registry cannot have multiple files associated with it. Avoid using
          the 'files' argument as it would be used in a topic. 
        `);
      }
    }
  };

  registryItem.sourceProperties.stops.forEach(throwIfInvalidGithubSource);
};
/**
 * @param {String} topic the name of the topic
 * @param {Object} node the node to check against
 * @param {Object} node.fields
 * @param {Array} node.fields.topics
 */
const nodeBelongsToTopic = (topic, node) => node.fields.topics.includes(topic);

/**
 * creates the base black list of slugs that are not allowed to createNodefields for
 * @returns {Object} the base black list mapping
 */
const createSlugBlacklist = () => {
  const BASE_BLACK_LIST = {
    topic: 'topic',
    '404': '404',
    aboutDevhub: 'aboutDevhub',
    '/': '',
    journeys: 'journeys',
    sitemap: 'sitemap',
    repositories: 'repositories',
    'past-events': 'past-events',
    'contentContribution': 'contentContribution',
  };
  const CONFIG_LIST = slugBlackList.reduce((map, slug) => {
    map[slug] = slug;
    return map;
  }, {});

  return {
    ...CONFIG_LIST,
    ...BASE_BLACK_LIST,
  };
};

/**
 * a simple lookup of a slug against the black list  map
 * @param {Object} blackList the blacklist map
 * @param {String} slug the  slug to check against
 * @returns {Boolean}
 */
const isInBlackList = (blackList, slug) => !!blackList[slug.trim().toLowerCase()];

module.exports = {
  isGithubRaw,
  isMeetupEvent,
  isMarkdownRemark,
  isMarkdownRemarkFrontmatter,
  isDevhubSiphon,
  isEventbriteEvents,
  isTopicRegistryJson,
  isJourneyRegistryJson,
  isMatomoPageStats,
  getClosest,
  getClosestPersona,
  getClosestResourceType,
  nodeBelongsToTopic,
  verifyJourney,
  createSlugBlacklist,
  isInBlackList,
};
