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
import * as actions from '../../src/store/actions/actions';
import { ACTIONS } from '../../__fixtures__/redux-fixtures';
import { LUNR_SEARCH_RESULTS_2 } from '../../__fixtures__/lunr';

describe('actions', () => {
  it('should create an action to load siphon nodes', () => {
    const expected = ACTIONS.LOAD_SIPHON_COLLECTIONS;
    expect(actions.loadSiphonCollections(ACTIONS.LOAD_SIPHON_COLLECTIONS.payload.nodes)).toEqual(
      expected,
    );
  });

  it('should create an action to filter siphon nodes', () => {
    const expected = ACTIONS.FILTER_SIPHON_NODES;
    expect(actions.filterSiphonNodes('resource.type', 'Components')).toEqual(expected);
  });

  it('should create an action to add a filter group to filters list', () => {
    const expected = ACTIONS.ADD_FILTER;
    expect(actions.addFilter('foo')).toEqual(expected);
  });

  it('should create an action to remove a filter group to filters list', () => {
    const expected = ACTIONS.REMOVE_FILTER;
    expect(actions.removeFilter('bar')).toEqual(expected);
  });

  it('should create an action to set search results', () => {
    expect(actions.setSearchResults(LUNR_SEARCH_RESULTS_2)).toEqual(ACTIONS.SET_SEARCH_RESULTS);
  });
});
