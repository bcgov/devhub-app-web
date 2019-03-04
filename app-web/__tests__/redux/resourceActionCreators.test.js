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
import * as actions from '../../src/store/actions';
import * as actionTypes from '../../src/store/actions/actionTypes';
import { SIPHON_NODES, COLLECTIONS } from '../../__fixtures__/siphon-fixtures';
import { LUNR_SEARCH_RESULTS_2 } from '../../__fixtures__/lunr';
import defaultFilters from '../../src/constants/filterGroups';

describe('actions', () => {
  it('should create an action to load siphon nodes', () => {
    const expected = {
      type: actionTypes.LOAD_RESOURCES,
      payload: {
        resources: SIPHON_NODES,
        collections: COLLECTIONS,
      },
    };

    expect(actions.loadResources(SIPHON_NODES, COLLECTIONS)).toEqual(expected);
  });

  it('should create an action to add a filter group to filters list', () => {
    const expected = {
      type: actionTypes.ADD_FILTER,
      payload: {
        key: defaultFilters[0].key,
      },
    };
    expect(actions.addFilter(defaultFilters[0].key)).toEqual(expected);
  });

  it('should create an action to remove a filter group to filters list', () => {
    const expected = {
      type: actionTypes.REMOVE_FILTER,
      payload: {
        key: defaultFilters[0].key,
      },
    };

    expect(actions.removeFilter(defaultFilters[0].key)).toEqual(expected);
  });

  it('should create an action to remove all filters', () => {
    const expected = {
      type: actionTypes.REMOVE_ALL_FILTERS,
    };

    expect(actions.removeAllFilters()).toEqual(expected);
  });

  it('should create an action to set search results', () => {
    const expected = {
      type: actionTypes.SET_SEARCH_RESULTS,
      payload: {
        searchResults: LUNR_SEARCH_RESULTS_2,
      },
    };
    expect(actions.setSearchResults(LUNR_SEARCH_RESULTS_2)).toEqual(expected);
  });

  it('should create an action to set search query', () => {
    const expected = {
      type: actionTypes.SET_SEARCH_QUERY,
      payload: {
        query: 'foo',
      },
    };
    expect(actions.setSearchQuery('foo')).toEqual(expected);
  });

  it('should create an action to reset search', () => {
    const expected = {
      type: actionTypes.RESET_SEARCH,
    };

    expect(actions.resetSearch()).toEqual(expected);
  });

  it('should create an action to set resource type', () => {
    const expected = {
      type: actionTypes.SET_RESOURCE_TYPE,
      payload: {
        type: '',
      },
    };

    expect(actions.setResourceType('')).toEqual(expected);
  });
});
