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

// reselect selector unit tests
import { STATE } from '../../__fixtures__/redux-fixtures';
import {
  SORTED_COLLECTIONS,
  FILTERED_COLLECTIONS,
  SIPHON_NODES,
} from '../../__fixtures__/siphon-fixtures';
import * as selectors from '../../src/store/selectors';
describe('Reselect Selectors', () => {
  it('returns the siphon state', () => {
    expect(selectors.siphonSelector(STATE)).toEqual(STATE.siphon);
  });

  it('returns a list of collections', () => {
    expect(selectors.collectionsSelector(STATE)).toEqual(STATE.siphon.collections);
  });

  it('returns a list of filters', () => {
    expect(selectors.selectFilters(STATE)).toEqual(STATE.siphon.filters);
  });

  it('returns active filters', () => {
    const activeFilters = STATE.siphon.filters.filter(f => f.active);
    expect(selectors.selectActiveFilters(STATE)).toEqual(activeFilters);
  });

  it('returns collections loaded', () => {
    expect(selectors.selectCollectionsLoaded(STATE)).toEqual(STATE.siphon.collectionsLoaded);
  });

  it('returns collections sorted', () => {
    expect(selectors.selectSortedCollections(STATE)).toEqual(SORTED_COLLECTIONS);
  });

  it('returns all collections when there are no active filters', () => {
    const state = {
      ...STATE,
      siphon: {
        ...STATE.siphon,
        filters: STATE.siphon.filters.map(f => ({ ...f, active: false })),
      },
    };

    expect(selectors.selectFilteredCollections(state)).toEqual(SORTED_COLLECTIONS);
  });

  it('returns filtered collections  there are active filters', () => {
    expect(selectors.selectFilteredCollections(STATE)).toEqual(FILTERED_COLLECTIONS);
  });

  it('returns the query', () => {
    expect(selectors.selectQuery(STATE)).toEqual(STATE.siphon.query);
  });

  it('returns the search results length', () => {
    expect(selectors.selectSearchResultsLength(STATE)).toEqual(
      Object.keys(STATE.siphon.searchResults).length,
    );
  });

  it('returns the total resource', () => {
    expect(selectors.selectTotalResources(STATE)).toEqual(SIPHON_NODES.length);
  });

  it('returns search word length', () => {
    expect(selectors.selectSearchWordLength(STATE)).toEqual(STATE.siphon.searchBarTerms.length);
  });

  it('returns siphons loading indicator', () => {
    expect(selectors.selectSiphonReducerLoading(STATE)).toEqual(STATE.siphon.loading);
  });
});
