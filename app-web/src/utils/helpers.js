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

export const getGithubRepoRoute = (repository, owner) => `${GITHUB_URL}/${owner}/${repository}`;

export const getGithubIssuesRoute = (repository, owner) =>
  `${getGithubRepoRoute(repository, owner)}/issues`;

export const getGithubForkRoute = (repository, owner) =>
  `${getGithubRepoRoute(repository, owner)}/fork`;

export const getGithubWatchRoute = (repository, owner) =>
  `${getGithubRepoRoute(repository, owner)}/subscription`;

export const getGithubUsernameURL = username => `${GITHUB_URL}/${username}`;
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
 * ideally should belong to a particular collection
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
 * @param {Array} topics the raw topic data (aka collections) as taken from the graphql query
 * @param {Object} topics[ind] {node: {..., name: {string }}}
 * @returns {Array} the sorted topics with Featured Cards and Design System first!
 */
export const sortDevhubTopicsAfterDesignSystemAndFeatured = topics => {
  // it is unknown what position design system and featured cards will be since this can change build to build
  const featuredIndex = topics.findIndex(topic => topic.node.name === TOPICS.FEATURED_RESOURCES);
  const designIndex = topics.findIndex(topic => topic.node.name === TOPICS.DESIGN_SYSTEM);
  const designSystem = { ...topics[designIndex] };
  const featuredResources = { ...topics[featuredIndex] };
  // remove design system from topics list and then featured cards
  const topicsWithoutDS = topics.filter(topic => topic.node.name !== TOPICS.FEATURED_RESOURCES);
  const topicsWithoutDSAndFC = topicsWithoutDS.filter(
    topic => topic.node.name !== TOPICS.DESIGN_SYSTEM,
  );

  const sortedTopics = topicsWithoutDSAndFC.sort((topicA, topicB) => {
    const topicNameA = topicA.node.name.toLowerCase();
    const topicNameB = topicB.node.name.toLowerCase();

    if (topicNameA < topicNameB) return -1;
    if (topicNameA > topicNameB) return 1;
    return 0;
  });

  //Add featured Cards, then Design System, then the rest of the topics
  return [featuredResources].concat([designSystem]).concat(sortedTopics);
};
