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

const initialState = {
  nodes: [],
  primaryFilteredNodes: [], // this is filtered by the resource type top level filters
  secondaryFilteredNodes: [], // subsequent filters using the filter side menu
  groupBy: null,
  loading: false,
  error: false,
  messages: [],
  filters: defaultFilterGroups,
};

/**
 * filters through the primary filtered nodes by filters
 * found from the state.filters list
 * checks if the dot prop matches the value for a given siphon node
 * @param {Object} node
 * @param {String} dotProp
 * @param {String} value
 */
const dotPropMatchesValue = (node, filterBy, value) => dotProp.get(node, filterBy) === value;

/**
 * Check the number of resources that match a filter
 * and applies other props based on if the count is > 0
 * @param {Object} filter
 */
const applyPropsToFilterByResourceCount = (filter, primaryNodes) => {
  let count = 0;
  // loop over all secondary filtered nodes and tally up count of matching filters
  primaryNodes.forEach(n => {
    count += dotPropMatchesValue(n, filter.filterBy, filter.value);
  });

  // check if this filter has been set to active and if it should remain so
  // this would onyl be the case if the available resources are greater than 0
  const shouldStayActive = filter.active && count > 0;

  return {
    ...filter,
    availableResources: count,
    isFilterable: count > 0,
    active: shouldStayActive,
  };
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
 * @param {Object} state
 * @param {String} key
 * @param {Boolean} isActive
 */
const toggleFilter = (state, key, isActive) => {
  const newState = { ...state };
  const fg = findFilter(state, key);
  fg.active = isActive;

  const newFilters = newState.filters.map(f => {
    if (f.key === fg.key) return fg;
    return f;
  });

  newState.filters = newFilters;
  return newState;
};

/**
 * retrieves nodes by filtering for a given value in a nested siphon property
 */
const applyPrimaryFilter = (state, filteredBy, value) => {
  // filter the initial nodes based off the main filterBy value
  const primaryFilteredNodes = state.nodes
    .filter(n => value === 'All' || dotProp.get(n, filteredBy) === value)
    .map(n => ({ ...n }));
  const newState = { ...state, primaryFilteredNodes };
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
  // get counts of filters and apply other properties based on if count is 0
  newState.filters = newState.filters.map(filter =>
    applyPropsToFilterByResourceCount(filter, newState.primaryFilteredNodes),
  );

  const filtersToApply = getActiveFilters(newState.filters);
  // if there aren't any filters to apply, the secondary filtered nodes is reset to what the primary
  // nodes are
  if (filtersToApply.length > 0) {
    // loop over filters and see that atleast one of the filters suceeeds against the node
    newState.secondaryFilteredNodes = newState.primaryFilteredNodes.filter(n =>
      filtersToApply.some(filter => dotPropMatchesValue(n, filter.filterBy, filter.value)),
    );
  } else {
    newState.secondaryFilteredNodes = newState.primaryFilteredNodes.map(f => ({ ...f }));
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

const loadNodes = (state, nodes) => {
  const newState = { ...state };
  newState.nodes = nodes.map(n => ({ ...n }));
  // nodes will be filtered eventually be resource type which is the top level navigation
  newState.primaryFilteredNodes = nodes.map(n => ({ ...n }));
  return applySecondaryFilters(newState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_SIPHON_NODES:
      return loadNodes(state, action.payload.nodes);
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
