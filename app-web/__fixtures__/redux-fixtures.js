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
import * as actions from '../src/store/actions/actionTypes';
import { LUNR_SEARCH_RESULTS, LUNR_SEARCH_RESULTS_2 } from './lunr';
import { COLLECTIONS, SIPHON_NODES } from './siphon-fixtures';

export const DEFAULT_FILTER_GROUPS = [
  {
    filterBy: 'attributes.personas',
    value: 'Designer',
    text: 'Designers',
    active: false,
    availableResources: SIPHON_NODES.filter(node =>
      node.attributes.personas.some(persona => persona === 'Designer'),
    ).length,
    isFilterable: false,
    key: 'foo',
    title: 'For',
  },
  {
    filterBy: 'attributes.personas',
    value: 'Developer',
    text: 'Developers',
    active: true,
    availableResources: SIPHON_NODES.filter(node =>
      node.attributes.personas.some(persona => persona === 'Developer'),
    ).length,
    isFilterable: false,
    key: 'bar',
    title: 'For',
  },
  {
    filterBy: 'attributes.personas',
    value: 'Product Owner',
    text: 'Product Owners',
    active: false,
    availableResources: SIPHON_NODES.filter(node =>
      node.attributes.personas.some(persona => persona === 'Product Owner'),
    ).length,
    isFilterable: false,
    key: 'baz',
    title: 'For',
  },
];

export const ACTIONS = {
  ADD_FILTER: {
    type: actions.ADD_FILTER,
    payload: {
      key: 'foo',
    },
  },
  REMOVE_FILTER: {
    type: actions.REMOVE_FILTER,
    payload: {
      key: 'bar',
    },
  },
  LOAD_SIPHON_COLLECTIONS: {
    type: actions.LOAD_SIPHON_COLLECTIONS,
    payload: {
      nodes: COLLECTIONS,
    },
  },
  TOGGLE_FILTER_GROUP: {
    type: actions.TOGGLE_FILTER_GROUP,
    payload: {
      key: 'foo',
    },
  },
  FILTER_SIPHON_NODES_BY_LIST: {
    type: actions.FILTER_SIPHON_NODES_BY_FILTER_LIST,
  },
  TOGGLE_MAIN_NAVIGATION_ON: {
    type: actions.TOGGLE_MAIN_NAVIGATION,
    payload: {
      toggled: true,
    },
  },
  TOGGLE_MAIN_NAVIGATION_OFF: {
    type: actions.TOGGLE_MAIN_NAVIGATION,
    payload: {
      toggled: false,
    },
  },
  AUTHENTICATE_SUCCESS: {
    type: actions.AUTHENTICATE_SUCCESS,
  },
  AUTHENTICATE_FAILED: {
    type: actions.AUTHENTICATE_FAILED,
  },
  SET_SEARCH_RESULTS: {
    type: actions.SET_SEARCH_RESULTS,
    payload: {
      searchResults: LUNR_SEARCH_RESULTS_2,
    },
  },
  RESET_SEARCH: {
    type: actions.RESET_SEARCH,
  },
  SET_SEARCH_RESULTS_ALL: {
    type: actions.SET_SEARCH_RESULTS,
    payload: {
      searchResults: LUNR_SEARCH_RESULTS, // contains results for all nodes in the collections fixture
    },
  },
};

export const INITIAL_STATES = {
  SIPHON: {
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
    filters: DEFAULT_FILTER_GROUPS,
  },
  UI: {
    selectedFilterOption: null,
    mainNavigationToggled: false,
  },
  AUTH: {
    isAuthenticated: false,
    accessToken: null,
    idToken: null,
    error: false,
    messages: [],
  },
};

// the entire appliation state preloaded with some data to simulate
// many of the actions that are fired on did mount
export const STATE = {
  siphon: {
    ...INITIAL_STATES.SIPHON,
    collections: COLLECTIONS,
    searchResults: LUNR_SEARCH_RESULTS_2,
    loaded: true,
    totalResources: SIPHON_NODES.length,
  },
  ui: { ...INITIAL_STATES.UI },
  auth: { ...INITIAL_STATES.AUTH },
};
