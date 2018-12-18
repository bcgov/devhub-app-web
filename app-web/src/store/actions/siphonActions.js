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
import * as actionTypes from './actionTypes';

/**
 * Loads graphQL nodes from gatsby data layer into the redux store
 * @param {Array} nodes
 */
export const loadSiphonNodes = nodes => {
  return {
    type: actionTypes.LOAD_SIPHON_NODES,
    payload: {
      nodes,
    },
  };
};

/**
 * filters siphon nodes
 * @param {String} filteredBy use dot prop notation if you are intending on accessing a nested node property eg 'prop1.prop2'
 * @param {String} value
 */
export const filterSiphonNodes = (filteredBy, value) => {
  return {
    type: actionTypes.FILTER_SIPHON_NODES,
    payload: {
      filteredBy,
      value,
    },
  };
};

export const toggleFilterGroup = key => {
  return {
    type: actionTypes.TOGGLE_FILTER_GROUP,
    payload: {
      key,
    },
  };
};

export const addFilter = key => {
  return {
    type: actionTypes.ADD_FILTER,
    payload: {
      key,
    },
  };
};

export const removeFilter = key => {
  return {
    type: actionTypes.REMOVE_FILTER,
    payload: {
      key,
    },
  };
};

export const filterSiphonNodesByFilterList = () => {
  return {
    type: actionTypes.FILTER_SIPHON_NODES_BY_FILTER_LIST,
  };
};
