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
import validUrl from 'valid-url';
import dotProp from 'dot-prop';
import { GITHUB_URL } from '../constants/api';
import { TypeCheck } from '@bcgov/common-web-utils';
import { RESOURCE_TYPES } from '../constants/ui';
import { TOPICS } from '../constants/topics';
import converter from 'number-to-words';
import { MAIN_NAV_ROUTES } from '../constants/routes';

export const getGithubRepoRoute = (repository, owner) => `${GITHUB_URL}/${owner}/${repository}`;

export const getGithubIssuesRoute = (repository, owner) =>
  `${getGithubRepoRoute(repository, owner)}/issues`;

export const getGithubForkRoute = (repository, owner) =>
  `${getGithubRepoRoute(repository, owner)}/fork`;

export const getGithubWatchRoute = (repository, owner) =>
  `${getGithubRepoRoute(repository, owner)}/subscription`;

export const getGithubUsernameURL = username => `${GITHUB_URL}/${username}`;

/**
 * returns the text and path being used for the link in the ResourcePreview below
 * the text will be reflective of the resourceType and is sensitive to different search result # cases
 * the link takes you to the corresponding resource type page but with the search active on that page
 * @param {String} resourceType the given resource type (event, documentation etc)
 * @param {Object} resourcesByType collection of resources for search results, grouped by type
 * @returns {Object}
 */
export const getTextAndLink = (resourceType, resourcesByType) => {
  const numOfResults = converter.toWords(resourcesByType[resourceType].length);
  // The resourceSearchPath will give you the string of the query as its used in the URL
  // ex: '?q=Open%20Shift' so that we can use it in the link for each resourceType result
  let resourceSearchPath = window.location.search;
  //default values
  let textAndPath = {
    to: `${MAIN_NAV_ROUTES[resourceType].to}${resourceSearchPath}`,
    text: `${numOfResults} results found`,
  };
  //changes pluralization if only one result is found
  if (resourcesByType[resourceType].length === 1) {
    textAndPath.text = `${numOfResults} result found`;
  }
  return textAndPath;
};

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
 * gets a github issue route with a precanned message as params
 * @param {String} repo
 * @param {String} owner
 * @param {String} pageTitle the title of the resource page
 * @param {String} originalSource path to the markdown file as found in github
 * @param {String} devhubPath path to the resource page as found in devhub
 * @returns {String} the url to the issues route
 */
export const getCannedIssueMessage = (repo, owner, pageTitle, originalSource, devhubPath) => {
  const route = getGithubIssuesRoute(repo, owner);
  const title = encodeURIComponent(`Devhub Issue: ${pageTitle} [short description here]`);
  const body = encodeURIComponent(
    `> path: (do not delete) ${originalSource}\n > (do not delete) devhub page: ${devhubPath}\n\n## Devhub Content Issue\n`,
  );
  return `${route}/new?title=${title}&body=${body}`;
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

/**
 * returns the first non external page path from a list of resources which
 * ideally should belong to a particular topic
 * @param {Array} resources the list of resources
 */
export const getFirstNonExternalResource = resources => {
  for (let i = 0; i < resources.length; i++) {
    const path = resources[i].resource.path;
    if (!validUrl.isWebUri(path)) {
      return path;
    }
  }
  return null;
};

/**
 *
 * given a nested path to an objects property and an expected value
 * it returns a boolean based on
 * if property is an Array => if atleast one value matches in the array it returns true
 * if property is String => if value matches exactly
 * an assumption is made that if the prop is an array, its elements are all of type String
 * @param {Object} node the siphon node
 * @param {String} dotProp a dot prop string notiation to access a nested value within the node
 * https://github.com/sindresorhus/dot-prop
 * @param {String} value the value to match against nodes value found by the dot prop
 */
export const dotPropMatchesValue = (node, filterBy, value) => {
  const prop = dotProp.get(node, filterBy);
  if (TypeCheck.isArray(prop)) {
    return prop.some(p => p === value);
  } else {
    return prop === value;
  }
};

/**
 * filters all resources nodes based on the active filters list
 * @param {Array} resources
 * @param {Array} filters these are assumed to be active filters
 */
export const filterResources = (resources, filters) =>
  resources.filter(resource =>
    filters.some(filter => dotPropMatchesValue(resource, filter.filterBy, filter.value)),
  );

/**
 * given a filter and a set of resources
 * apply the following props to a new object
 * - isFilterable: if the count of filterable resources is > 0
 * - availableResources: the count of filterable resources for the given filter
 * @param {Object} filter the filter object
 * @param {Array} nodes all resources
 * @returns {Object} a new filter object
 */
export const setFilterPropsBasedOnResourceCounts = (filter, nodes) => {
  const { filterBy, value } = filter;
  let newFilter = { ...filter, availableResources: 0 };
  nodes.forEach(n => {
    // only attempt to check if node should be apart of count if it matches the current resource type
    // or if resource tpye is null (which means we are on the index page)
    newFilter.availableResources += dotPropMatchesValue(n, filterBy, value);
  });

  const count = newFilter.availableResources;
  newFilter.isFilterable = count > 0;
  // check if this filter has been set to active and if it should remain so
  // this would onyl be the case if the available resources are greater than 0
  return newFilter;
};

/**
 * checks if only one filter in a set of filters isFilterable
 * @param {Array} filters
 */
export const isFilterLonely = filters => {
  const numAreFilterable = filters.reduce((sum, filter) => sum + filter.isFilterable, 0);
  return numAreFilterable === 1;
};

// topics are sorted based on our arbitrary config where design system is first and then
// all other topics sorted lexographically
/**
 *
 * @param {Array} topics the raw topic data (aka topics) as taken from the graphql query
 * @param {Object} topics[ind] {node: {..., name: {string }}}
 * @returns {Array} the sorted topics with Featured Cards, Design System and Getting Started on the DevOps Platform first!
 */
export const sortDevhubTopicsAfterSelectedTopics = topics => {
  // it is unknown what position the selected topcs will be since this can change build to build
  const featuredIndex = topics.findIndex(topic => topic.node.name === TOPICS.FEATURED_RESOURCES);
  const designIndex = topics.findIndex(topic => topic.node.name === TOPICS.DESIGN_SYSTEM);
  const devOpsPlatformIndex = topics.findIndex(
    topic => topic.node.name === TOPICS.GETTING_STARTED_ON_THE_DEVOPS_PLATFORM,
  );

  const designSystem = { ...topics[designIndex] };
  const featuredResources = { ...topics[featuredIndex] };
  const devOpsPlatform = { ...topics[devOpsPlatformIndex] };
  // remove selected topics
  const topicsWithoutSelectedTopics = topics.filter(
    topic =>
      topic.node.name !== TOPICS.FEATURED_RESOURCES &&
      topic.node.name !== TOPICS.DESIGN_SYSTEM &&
      topic.node.name !== TOPICS.GETTING_STARTED_ON_THE_DEVOPS_PLATFORM,
  );

  const sortedTopics = topicsWithoutSelectedTopics.sort((topicA, topicB) => {
    const topicNameA = topicA.node.name.toLowerCase();
    const topicNameB = topicB.node.name.toLowerCase();

    if (topicNameA < topicNameB) return -1;
    if (topicNameA > topicNameB) return 1;
    return 0;
  });

  //Add featured Cards, Design System, Getting Started on the DevOps Platform and then the rest of the topics
  return [featuredResources]
    .concat([designSystem])
    .concat([devOpsPlatform])
    .concat(sortedTopics);
};
