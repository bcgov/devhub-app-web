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
import dotProp from 'dot-prop-immutable';
import defaultFilterGroups from '../../constants/filterGroups';
import { TypeCheck } from '@bcgov/common-web-utils';
import { action } from 'popmotion';

const initialState = {
  collectionsLoaded: false,
  page: '',
  resources: {
    byId: {},
    allIds: [],
  }, // this is set by the resource type, ie Component/Documentation etc
  query: null,
  searchBarTerms: '',
  searchResults: [null],
  totalResources: 0,
  loading: false,
  error: false,
  messages: [],
  filters: defaultFilterGroups,
};

const resoucesReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOAD_RESOURCES:
    default:
      return state;
  }
};
