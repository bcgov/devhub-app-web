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
import * as actionTypes from '../actions/actionTypes';
import cloneDeep from 'lodash/cloneDeep';
import { arrayToMapByProp } from '../../utils/dataHelpers';
import dotProp from 'dot-prop-immutable';
import defaultFilterGroups from '../../constants/filterGroups';
import { TypeCheck } from '@bcgov/common-web-utils';
import { action } from 'popmotion';

const initialState = {
  resources: {
    byId: {},
    allIds: [],
  }, // this is set by the resource type, ie Component/Documentation etc
  availableResources: {
    byId: {},
    allIds: [],
  },
  query: null, // the persisted search query
  searchBarTerms: '', // the global state for
  searchResults: [null],
  loading: false,
  error: false,
  messages: [],
  filters: defaultFilterGroups,
};

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
 * returns all resources from state.resource
 * @param {State} state
 * @returns {Array} the list of all resources
 */
const getResources = resources => resources.allIds.map(id => ({ ...resources.byId[id] }));

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
};

/**
 * removes filter from list of filters
 * @param {Object} state
 * @param {String} key
 */
const removeFilter = (state, key) => {
  return toggleFilter(state, key, false);
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
 * @param {Object} state
 * @param {Array} resources the list of resources
 * @returns {Object} the next state
 */
const loadResources = (state, resources) => {
  // convert resources list to a map by {id: item} key value pairs
  const resourceMap = arrayToMapByProp(resources, 'id');
  // secondary clone for available resources
  const availableResourceMap = arrayToMapByProp(resources, 'id');
  return {
    ...state,
    resources: {
      byId: resourceMap.map,
      allIds: resourceMap.all,
    },
    availableResources: {
      byId: availableResourceMap.map,
      allIds: availableResourceMap.all,
    },
  };
};

/**
 * sets state for search results and applies it against the available resource state
 * @param {Object} state
 * @param {Array} results
 * @returns {Object} the new state
 */
const applySearchResults = (state, results) => {
  const resultIds = Object.keys(results);

  const availableResources = {
    byId: {},
    allIds: [],
  };

  resultIds.forEach(id => {
    availableResources.byId[id] = cloneDeep(state.resources.byId[id]);
    availableResources.allIds.push(id);
  });

  // a store of all nodes that passed the filter this is passed into the apply props to filter fn
  // as an optimization. Soon to be added is a caching mechanism where search terms and newstate collections
  // are cached in a map of 'search term': [collections]
  const availableResourcesList = getResources(availableResources);
  const filters = state.filters.map(f =>
    applyPropsToFilterByResourceCount(f, availableResourcesList),
  );
  return { ...state, searchResults: results, loading: false, availableResources, filters };
};

const setSearchQuery = (state, query) => ({ ...state, query, loading: true });

const setSearchBarTerms = (state, searchBarTerms) => ({ ...state, searchBarTerms });

const resourcesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_RESOURCES:
      return loadResources(state, action.payload.resources);
    case actionTypes.ADD_FILTER:
      return addFilter(state, action.payload.key);
    case actionTypes.REMOVE_FILTER:
      return removeFilter(state, action.payload.key);
    case actionTypes.REMOVE_ALL_FILTERS:
      return resetFilters(state);
    case actionTypes.SET_SEARCH_RESULTS:
      return applySearchResults(state, action.payload.searchResults);
    case actionTypes.SET_SEARCH_QUERY:
      return setSearchQuery(state, action.payload.query);
    case actionTypes.SET_SEARCH_BAR_TERMS:
      return setSearchBarTerms(state, action.payload.searchBarTerms);
    default:
      return state;
  }
};

export default resourcesReducer;
