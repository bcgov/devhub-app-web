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
import reducer from '../../src/store/reducers/resources';
import defaultFilters from '../../src/constants/filterGroups';
import * as actions from '../../src/store/actions';
import { SIPHON_NODES_MAP, SIPHON_NODES } from '../../__fixtures__/siphon-fixtures';

describe('resources reducer', () => {
  const initialState = {
    resources: {
      byId: {},
      allIds: [],
    },
    query: null,
    searchBarTerms: '',
    searchResults: [null],
    loading: false,
    error: false,
    messages: [],
    filters: defaultFilters,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle loading resources', () => {
    const expectedState = {
      ...initialState,
      resources: {
        byId: SIPHON_NODES_MAP.map,
        allIds: SIPHON_NODES_MAP.all,
      },
    };

    expect(reducer(initialState, actions.loadResources(SIPHON_NODES))).toEqual(expectedState);
  });
});
