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
import * as actionTypes from '../actions/actionTypes';
import dotProp from 'dot-prop-immutable';
import defaultFilterGroups from '../../constants/filterGroups';
import { TypeCheck } from '@bcgov/common-web-utils';

const initialState = {
  collectionsLoaded: false,
  _collections: [], // the cached set of ALL collections
  collections: [], // this is set by the resource type, ie Component/Documentation etc
  query: '',
  searchBarTerms: '',
  searchResults: [],
  totalResources: 0,
  loading: false,
  error: false,
  messages: [],
  filters: defaultFilterGroups,
};

const mapWithCallback = (array, cb) => array.map(cb);

/**
 * filters through the primary filtered nodes by filters
 * found from the state.filters list
 * checks if the dot prop matches the value for a given siphon node
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
 * filters all collections nodes based on the filters list
 * @param {Array} collections
 * @param {Array} filters
 */
export const filterCollections = (collections, filters) =>
  collections.map(collection => ({
    ...collection,
    nodes: collection.nodes.filter(n =>
      filters.some(filter => dotPropMatchesValue(n, filter.filterBy, filter.value)),
    ),
  }));

/**
 * clones a siphon node
 * @param {Object} node the siphon node owned by a collection
 * @returns {Object}
 */
const newNode = node => ({ ...node });

/**
 * @param {Object} collection the single collection
 * @returns {Object} the new collection
 */
// filter out siphon nodes where resource type still matches (primary filter nodes)
const newCollection = collection => ({
  ...collection,
  nodes: mapWithCallback(collection.nodes, newNode),
});

/**
 * clones collections
 * @param {Array} collections the list of collections
 * @returns {Array} the cloned collections
 */
const newCollections = collections => mapWithCallback(collections, newCollection);

/**
 * flattens the List of collection.nodes
 * @param {Array} collections the collections list
 * @return {Array} a flattened list of all nodes within all of the collections
 */
const getAllNodesFromCollections = collections =>
  collections.reduce((acc, collection) => acc.concat(collection.nodes), []);

/**
 * Check the number of resources that match a filter
 * and applies count related props to the filter Map
 * @param {Object} filter
 * @param {Array} nodes a flattened list of all nodes from available collections
 */
export const applyPropsToFilterByResourceCount = (filter, nodes) => {
  const { filterBy, value } = filter;
  let newFilter = { ...filter, availableResources: 0 };
  nodes.forEach(n => {
    newFilter.availableResources += dotPropMatchesValue(n, filterBy, value);
  });

  const count = newFilter.availableResources;
  const isActive = count > 0 && newFilter.active;
  newFilter.isFilterable = count > 0;
  // check if this filter has been set to active and if it should remain so
  // this would onyl be the case if the available resources are greater than 0
  newFilter.active = isActive;
  return newFilter;
};

/**
 *
 * @param {Object} state
 * @param {Array} results
 */
const applySearchResultsToPrimaryNodes = (state, results) => {
  const newState = { ...state, searchResults: results, loading: false };
  // results is an array of siphon ids,
  // filter out siphon nodes where resource type still matches (primary filter nodes)
  let collectionNodes = getAllNodesFromCollections(state._collections);
  const nodesMap = new Map();
  collectionNodes.forEach(n => {
    // if node is within results
    if (Object.prototype.hasOwnProperty.call(results, n.id)) {
      // push into map organized by the nodes PARENT (collection id)
      let currentNodes = [];
      if (nodesMap.has(n.parent.id)) {
        currentNodes = nodesMap.get(n.parent.id);
      }
      nodesMap.set(n.parent.id, currentNodes.concat([{ ...n }]));
    }
  });

  // a store of all nodes that passed the filter this is passed into the apply props to filter fn
  // as an optimization. Soon to be added is a caching mechanism where search terms and newstate collections
  // are cached in a map of 'search term': [collections]
  let availableNodes = [];
  // build filtered nodes back into respective collections
  newState.collections = newCollections(state._collections).map(c => {
    const nodes = nodesMap.get(c.id) || [];
    // push in the nodes that are being applied to collection into available nodes
    availableNodes = availableNodes.concat(nodes);
    return {
      ...c,
      nodes,
    };
  });
  newState.filters = newState.filters.map(f =>
    applyPropsToFilterByResourceCount(f, availableNodes),
  );
  return newState;
};

/**
 * helper to find a filter group by key
 * @param {Object} state
 * @param {String} key
 */
const findFilter = (state, key) => {
  const ind = state.filters.findIndex(f => f.key === key);
  const fg = { ...state.filters[ind] };

  return fg;
};

/**
 * sets 'active' property on a filter config object
 * @param {Object} state initial state coming in
 * @param {String} key the key that identifies the filter in state.filters
 * @param {Boolean} isActive sets filter[i].active
 */
const toggleFilter = (state, key, isActive) => {
  const newState = { ...state };
  const fg = findFilter(state, key);
  fg.active = isActive;

  const newFilters = newState.filters.map(f => (f.key === fg.key ? fg : f));

  newState.filters = newFilters;
  return newState;
};

/**
 * adds filter to list of filters
 * @param {Obejct} state
 * @param {String} key
 */
const addFilter = (state, key) => {
  return toggleFilter(state, key, true);
  // return applySecondaryFilters(newState);
};

/**
 * removes filter from list of filters
 * @param {Object} state
 * @param {String} key
 */
const removeFilter = (state, key) => {
  return toggleFilter(state, key, false);
  // return applySecondaryFilters(newState);
};
/**
 * unsets all filters to inactive
 * @param {Object} state
 */
const resetFilters = state => {
  const newState = { ...state };
  newState.filters = newState.filters.map(f => ({ ...f, active: false }));
  return newState;
};

/**
 * set the collections property
 * @param {Object} state
 * @param {Array} collections the list of siphon collection nodes
 */
const setCollections = (state, collections) => {
  const newState = { ...state };

  newState._collections = collections;
  newState.collectionsLoaded = true;
  // nodes will be filtered eventually be resource type which is the top level navigation
  newState.collections = newCollections(collections);
  // get counts of filters and apply other properties based on if count is 0
  newState.filters = newState.filters.map(filter =>
    applyPropsToFilterByResourceCount(filter, newState.collections),
  );

  newState.totalResources = getAllNodesFromCollections(collections).length;

  return newState;
};

const setSearchQuery = (state, query) => ({ ...state, query, loading: true });

const setSearchBarTerms = (state, searchBarTerms) => ({ ...state, searchBarTerms });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_SIPHON_COLLECTIONS:
      return setCollections(state, action.payload.nodes);
    case actionTypes.ADD_FILTER:
      return addFilter(state, action.payload.key);
    case actionTypes.REMOVE_FILTER:
      return removeFilter(state, action.payload.key);
    case actionTypes.REMOVE_ALL_FILTERS:
      return resetFilters(state);
    case actionTypes.SET_SEARCH_RESULTS:
      return applySearchResultsToPrimaryNodes(state, action.payload.searchResults);
    case actionTypes.SET_SEARCH_QUERY:
      return setSearchQuery(state, action.payload.onSearch);
    case actionTypes.SET_SEARCH_BAR_TERMS:
      return setSearchBarTerms(state, action.payload.searchBarTerms);
    default:
      return state;
  }
};

export default reducer;
