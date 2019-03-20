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
import * as actionTypes from './actionTypes';

export const loadResources = (resources, collections) => ({
  type: actionTypes.LOAD_RESOURCES,
  payload: {
    resources,
    collections,
  },
});

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

export const setSearchResults = searchResults => {
  return {
    type: actionTypes.SET_SEARCH_RESULTS,
    payload: { searchResults },
  };
};

export const setSearchQuery = (query, tokenizedQuery) => {
  return {
    type: actionTypes.SET_SEARCH_QUERY,
    payload: { query, tokenizedQuery },
  };
};

export const setSearchBarTerms = searchBarTerms => {
  return {
    type: actionTypes.SET_SEARCH_BAR_TERMS,
    payload: { searchBarTerms },
  };
};

export const resetSearch = () => ({
  type: actionTypes.RESET_SEARCH,
});

export const setResourceType = type => ({
  type: actionTypes.SET_RESOURCE_TYPE,
  payload: { type },
});
