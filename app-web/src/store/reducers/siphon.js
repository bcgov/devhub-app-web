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
  filters: [],
  filterGroups: defaultFilterGroups,
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
 * Check the number of resources that match a filter group
 * @param {Object} state
 */
const getCountOfResourcesByFilter = state => {
  const newState = { ...state };
  const filterGroups = newState.filterGroups.map(filter => {
    let count = 0;
    // loop over all secondary filtered nodes and tally up count of matching filters
    newState.primaryFilteredNodes.forEach(n => {
      if (dotPropMatchesValue(n, filter.filterBy, filter.value)) {
        count += 1;
      }
    });
    return { ...filter, availableResources: count, isFilterable: count > 0 };
  });

  return filterGroups;
};
/**
 * filters through the already filtered nodes with additional
 * filters found from the filters list
 */
const applySecondaryFilters = state => {
  const newState = { ...state };
  if (newState.filters.length > 0) {
    newState.secondaryFilteredNodes = newState.primaryFilteredNodes.filter(n =>
      state.filters.some(filter => dotPropMatchesValue(n, filter.filterBy, filter.value)),
    );
  } else {
    newState.secondaryFilteredNodes = newState.primaryFilteredNodes.map(f => ({ ...f }));
  }
  // tallies up the count of resources that belong to a given filter group
  newState.filterGroups = getCountOfResourcesByFilter(newState);

  return newState;
};

/**
 * helper to find a filter group by key
 * @param {Object} state
 * @param {String} key
 */
const findFilterGroup = (state, key) => {
  const ind = state.filterGroups.findIndex(f => f.key === key);
  const fg = { ...state.filterGroups[ind] };

  return fg;
};

/**
 * sets 'active' property on a filter config object
 * @param {Object} state
 * @param {String} key
 */
const toggleFilter = (state, key) => {
  const newState = { ...state };
  const fg = findFilterGroup(state, key);

  fg.active = !fg.active;
  const newFilterGroups = newState.filterGroups.map(f => {
    if (f.key === fg.key) return fg;
    return f;
  });

  newState.filterGroups = newFilterGroups;
  return newState;
};

/**
 * adds filter to list of filters
 * @param {Obejct} state
 * @param {String} key
 */
const addFilter = (state, key) => {
  const fg = findFilterGroup(state, key);
  const newState = { ...state, filters: state.filters.concat(fg) };
  return applySecondaryFilters(newState);
  // return newState;
};

/**
 * removes filter from list of filters
 * @param {Object} state
 * @param {String} key
 */
const removeFilter = (state, key) => {
  const newState = { ...state };
  newState.filters = newState.filters.filter(f => f.key !== key);
  return applySecondaryFilters(newState);
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

const loadNodes = (state, nodes) => {
  const newState = { ...state };
  newState.nodes = nodes.map(n => ({ ...n }));
  // nodes will be filtered eventually be resource type which is the top level navigation
  newState.primaryFilteredNodes = nodes.map(n => ({ ...n }));
  newState.secondaryFilteredNodes = nodes.map(n => ({ ...n }));
  newState.filterGroups = getCountOfResourcesByFilter(newState);
  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_SIPHON_NODES:
      return loadNodes(state, action.payload.nodes);
    case actionTypes.FILTER_SIPHON_NODES:
      return applyPrimaryFilter(state, action.payload.filteredBy, action.payload.value);
    case actionTypes.TOGGLE_FILTER_GROUP:
      return toggleFilter(state, action.payload.key);
    case actionTypes.ADD_FILTER:
      return addFilter(state, action.payload.key);
    case actionTypes.REMOVE_FILTER:
      return removeFilter(state, action.payload.key);
    case actionTypes.FILTER_SIPHON_NODES_BY_FILTER_LIST:
      return applySecondaryFilters(state);
    default:
      return state;
  }
};

export default reducer;
