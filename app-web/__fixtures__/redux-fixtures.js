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

export const DEFAULT_FILTER_GROUPS = [
  {
    filterBy: 'attributes.persona',
    value: 'Designer',
    text: 'Designers',
    active: false,
    availableResources: null,
    key: 'foo',
    title: 'For',
  },
  {
    filterBy: 'attributes.persona',
    value: 'Developer',
    text: 'Developers',
    active: false,
    availableResources: null,
    key: 'bar',
    title: 'For',
  },
  {
    filterBy: 'attributes.persona',
    value: 'Product Owner',
    text: 'Product Owners',
    active: false,
    availableResources: null,
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
      key: 'foo',
    },
  },
  LOAD_SIPHON_NODES: {
    type: actions.LOAD_SIPHON_NODES,
    payload: {
      nodes: [{ foo: 'bar' }, { foo: 'baz' }, { foo: 'foo' }],
    },
  },
  TOGGLE_FILTER_GROUP: {
    type: actions.TOGGLE_FILTER_GROUP,
    payload: {
      key: 'foo',
    },
  },
  FILTER_SIPHON_NODES: {
    type: actions.FILTER_SIPHON_NODES,
    payload: {
      filteredBy: 'foo',
      value: 'bar',
    },
  },
  FILTER_SIPHON_NODES_BY_ALL: {
    type: actions.FILTER_SIPHON_NODES,
    payload: {
      filteredBy: 'foo',
      value: 'All',
    },
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
};

export const INITIAL_STATES = {
  SIPHON: {
    nodes: [],
    primaryFilteredNodes: [],
    secondaryFilteredNodes: [],
    filterGroups: DEFAULT_FILTER_GROUPS,
    filters: [],
    groupBy: null,
    loading: false,
    error: false,
    messages: [],
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
