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
  collections: [],
  primaryFilteredNodes: [], // this is filtered by the resource type top level filters
  secondaryFilteredNodes: [], // subsequent filters using the filter side menu
  groupBy: null,
  loading: false,
  error: false,
  messages: [],
  filters: defaultFilterGroups,
};

const mapWithCallback = (array, cb) => array.map(cb);

/**
 * from an array of siphon positions
 * [collection, source, resource]
 * we return an integer by weighting each index to a power of ten
 * weighting decreases left to right
 * @param {Array} position
 * @returns {String} an address of the position based on weight
 * [0, 2, 5] = 100.30.6
 */
export const getTruePositionFromWeightedScale = position => {
  return position
    .reduce((pos, val, index) => {
      const power = position.length - index - 1;

      const multiplier = val + 1; // since positions start at 0, we are adding 1 so that
      // we don't run into an issue of 0 x 10^index which would lead to bad things

      return `${pos}.${multiplier * Math.pow(10, power)}`;
    }, '')
    .slice(1);
};

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
 * filters through the primary filtered nodes by filters
 * found from the state.filters list
 * checks if the dot prop matches the value for a given siphon node
 * @param {Object} node the siphon node
 * @param {String} dotProp a dot prop string notiation to access a nested value within the node
 * https://github.com/sindresorhus/dot-prop
 * @param {String} value the value to match against nodes value found by the dot prop
 */
const dotPropMatchesValue = (node, filterBy, value) => {
  const prop = dotProp.get(node, filterBy);
  if (TypeCheck.isArray(prop)) {
    return prop.some(p => p === value);
  } else {
    return prop === value;
  }
};

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
 * @param {Array} primaryFilteredNodes
 */
export const applyPropsToFilterByResourceCount = (filter, primaryFilteredNodes) => {
  // get a flattened set of the nodes from all collections to loop over
  const nodes = getAllNodesFromCollections(primaryFilteredNodes);
  const filterBy = filter.filterBy;
  const value = filter.value;
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
 * returns filter groups that are currently active
 * @param {Array} filters
 */
const getActiveFilters = filters => filters.filter(fg => fg.active);

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
 * applies resource type filters against all nodes inside of all collections
 * @param {Object} state
 * @param {String} filteredBy
 * @param {String} value
 * @returns {Object} the new state
 */
const applyPrimaryFilter = (state, filteredBy, value) => {
  // filter the initial nodes based off the main filterBy value
  let newPrimaryFilteredNodes;
  // if value is All then primary filtered nodes are reset
  if (value === 'All') {
    newPrimaryFilteredNodes = newCollections(state.collections);
  } else {
    newPrimaryFilteredNodes = state.collections.map(collection => {
      const clonedCollection = newCollection(collection);
      const filteredNodes = clonedCollection.nodes.filter(n =>
        dotPropMatchesValue(n, filteredBy, value),
      );
      clonedCollection.nodes = filteredNodes;
      return clonedCollection;
    });
  }

  const newState = { ...state, primaryFilteredNodes: newPrimaryFilteredNodes };
  return applySecondaryFilters(newState);
};

/**
 * filters through the primary filtered nodes by the active
 * filters in the state.filters list
 * additionally tallies up how many resources apply to a filter and applies
 * other metadata for a filter
 */
const applySecondaryFilters = state => {
  const newState = { ...state };
  newState.primaryFilteredNodes = newCollections(newState.primaryFilteredNodes);
  newState.secondaryFilteredNodes = newCollections(newState.primaryFilteredNodes);
  // get counts of filters and apply other properties based on if count is 0
  newState.filters = newState.filters.map(filter =>
    applyPropsToFilterByResourceCount(filter, newState.primaryFilteredNodes),
  );

  const filtersToApply = getActiveFilters(newState.filters);
  // if there aren't any filters to apply, the secondary filtered nodes is reset to what the primary
  // nodes are
  if (filtersToApply.length > 0) {
    // loop over filters and see that atleast one of the filters suceeeds against the node
    newState.secondaryFilteredNodes = newState.secondaryFilteredNodes.filter(collection => {
      collection.nodes = collection.nodes.filter(n =>
        filtersToApply.some(filter => dotPropMatchesValue(n, filter.filterBy, filter.value)),
      );
      return collection;
    });
  }

  return newState;
};

/**
 * adds filter to list of filters
 * @param {Obejct} state
 * @param {String} key
 */
const addFilter = (state, key) => {
  const newState = toggleFilter(state, key, true);
  return applySecondaryFilters(newState);
};

/**
 * removes filter from list of filters
 * @param {Object} state
 * @param {String} key
 */
const removeFilter = (state, key) => {
  const newState = toggleFilter(state, key, false);
  return applySecondaryFilters(newState);
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
  // sort collection nodes by position
  let sortedCollections = collections.map(c => {
    c.nodes = c.nodes.sort((a, b) => {
      // lexographic search
      const address1 = getTruePositionFromWeightedScale(a._metadata.position);
      const address2 = getTruePositionFromWeightedScale(b._metadata.position);
      if (address1 < address2) return 1;
      if (address1 > address2) return -1;
      return 0;
    });
    return c;
  });
  newState.collections = newCollections(sortedCollections);
  // nodes will be filtered eventually be resource type which is the top level navigation
  newState.primaryFilteredNodes = newCollections(sortedCollections);
  return applySecondaryFilters(newState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_SIPHON_COLLECTIONS:
      return setCollections(state, action.payload.nodes);
    case actionTypes.FILTER_SIPHON_NODES:
      return applyPrimaryFilter(state, action.payload.filteredBy, action.payload.value);
    case actionTypes.ADD_FILTER:
      return addFilter(state, action.payload.key);
    case actionTypes.REMOVE_FILTER:
      return removeFilter(state, action.payload.key);
    case actionTypes.REMOVE_ALL_FILTERS:
      return resetFilters(state);
    case actionTypes.FILTER_SIPHON_NODES_BY_FILTER_LIST:
      return applySecondaryFilters(state);
    default:
      return state;
  }
};

export default reducer;
