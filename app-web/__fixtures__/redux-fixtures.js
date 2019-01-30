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
import { LUNR_SEARCH_RESULTS_2 } from './lunr';
import { COLLECTIONS } from './siphon-fixtures';

export const DEFAULT_FILTER_GROUPS = [
  {
    filterBy: 'attributes.personas',
    value: 'Designer',
    text: 'Designers',
    active: false,
    availableResources: 0,
    isFilterable: false,
    key: 'foo',
    title: 'For',
  },
  {
    filterBy: 'attributes.personas',
    value: 'Developer',
    text: 'Developers',
    active: true,
    availableResources: 0,
    isFilterable: false,
    key: 'bar',
    title: 'For',
  },
  {
    filterBy: 'attributes.personas',
    value: 'Product Owner',
    text: 'Product Owners',
    active: false,
    availableResources: 0,
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
  SELECT_FILTER_OPTION: {
    type: actions.SET_SELECTED_FILTER_OPTION,
    payload: {
      foo: 'bar',
    },
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
};

export const INITIAL_STATES = {
  SIPHON: {
    collections: [],
    primaryFilteredNodes: [],
    secondaryFilteredNodes: [],
    filters: DEFAULT_FILTER_GROUPS,
    groupBy: null,
    loading: false,
    error: false,
    messages: [],
  },
  UI: {
    selectedFilterOption: null,
    mainNavigationToggled: false,
    welcomePanelWasViewed: false,
  },
  AUTH: {
    isAuthenticated: false,
    accessToken: null,
    idToken: null,
    error: false,
    messages: [],
  },
};
