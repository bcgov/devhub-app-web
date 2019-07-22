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
const { RESOURCE_TYPES_LIST } = require('../../src/constants/ui');
const isGithubRaw = node => node.internal.type === 'GithubRaw';
const isMarkdownRemark = node => node.internal.type === 'MarkdownRemark';
const isDevhubSiphon = node => node.internal.type === 'DevhubSiphon';
const isDevhubTopic = node => node.internal.type === 'DevhubTopic';
const isMeetupEvent = node => node.internal.type === 'MeetupEvent';
const isEventbriteEvents = node => node.internal.type === 'EventbriteEvents';
const isRegistryJson = node => node.internal.type === 'RegistryJson';
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
 */
const getClosestResourceType = resourceType => {
  // if its blank don't bother checking closeness
  if (resourceType === '') return '';
  return getClosest(resourceType, RESOURCE_TYPES_LIST);
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

module.exports = {
  isGithubRaw,
  isMeetupEvent,
  isMarkdownRemark,
  isMarkdownRemarkFrontmatter,
  isDevhubSiphon,
  isDevhubTopic,
  isEventbriteEvents,
  isRegistryJson,
  isMatomoPageStats,
  getClosest,
  getClosestPersona,
  getClosestResourceType,
};
