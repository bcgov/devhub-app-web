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
export const loadSiphonCollections = nodes => {
  return {
    type: actionTypes.LOAD_SIPHON_COLLECTIONS,
    payload: {
      nodes,
    },
  };
};

export const removeAllFilters = () => {
  return {
    type: actionTypes.REMOVE_ALL_FILTERS,
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

export const setSearchResults = searchResults => {
  return {
    type: actionTypes.SET_SEARCH_RESULTS,
    payload: { searchResults },
  };
};

export const setSearchQuery = onSearch => {
  return {
    type: actionTypes.SET_SEARCH_QUERY,
    payload: { onSearch },
  };
};

export const setSearchBarTerms = searchBarTerms => {
  return {
    type: actionTypes.SET_SEARCH_BAR_TERMS,
    payload: { searchBarTerms },
  };
};
