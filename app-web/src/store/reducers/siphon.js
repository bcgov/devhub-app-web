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
  filteredNodes: [],
  groupBy: null,
  loading: false,
  error: false,
  messages: [],
  filters: [],
  filterGroups: defaultFilterGroups,
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
  return newState;
};

/**
 * removes filter from list of filters
 * @param {Object} state
 * @param {String} key
 */
const removeFilter = (state, key) => {
  const newState = { ...state };
  newState.filters = newState.filters.filter(f => f.key === key);
  return newState;
};
/**
 * retrieves nodes by filtering for a given value in a nested siphon property
 */
export const filterNodesByParam = (state, filteredBy, value) => {
  const filteredNodes = state.nodes
    .filter(n => value === 'All' || dotProp.get(n, filteredBy) === value)
    .map(n => ({ ...n }));
  const newState = { ...state, filteredNodes };
  return newState;
};

const loadNodes = (state, nodes) => {
  const newState = { ...state };
  newState.nodes = nodes.map(n => ({ ...n }));
  // nodes will be filtered eventually be resource type which is the top level navigation
  newState.filteredNodes = nodes.map(n => ({ ...n }));
  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_SIPHON_NODES:
      return loadNodes(state, action.payload.nodes);
    case actionTypes.FILTER_SIPHON_NODES:
      return filterNodesByParam(state, action.payload.filteredBy, action.payload.value);
    default:
      return state;
  }
};

export default reducer;
