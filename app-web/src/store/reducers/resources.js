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
import * as actionTypes from '../actions/actionTypes';
import { arrayToMapByProp } from '../../utils/dataHelpers';
import dotProp from 'dot-prop-immutable';
import defaultFilterGroups from '../../constants/filterGroups';
import { TypeCheck } from '@bcgov/common-web-utils';
import { action } from 'popmotion';

const initialState = {
  resources: {
    byId: {},
    allIds: [],
  }, // this is set by the resource type, ie Component/Documentation etc
  query: null, // the persisted search query
  searchBarTerms: '', // the global state for
  searchResults: [null],
  loading: false,
  error: false,
  messages: [],
  filters: defaultFilterGroups,
};

/**
 * @param {Object} state
 * @param {Array} resources the list of resources
 * @returns {Object} the next state
 */
const loadResources = (state, resources) => {
  // convert resources list to a map by {id: item} key value pairs
  const resourceMap = arrayToMapByProp(resources, 'id');
  return {
    ...state,
    resources: {
      byId: resourceMap.map,
      allIds: resourceMap.all,
    },
  };
};

const resourcesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_RESOURCES:
      return loadResources(state, action.payload.resources);
    default:
      return state;
  }
};

export default resourcesReducer;
