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
import reducer, { applyPropsToFilterByResourceCount } from '../../src/store/reducers/siphon';
import { ACTIONS, INITIAL_STATES, DEFAULT_FILTER_GROUPS } from '../../__fixtures__/redux-fixtures';
import { COLLECTIONS, SIPHON_NODES } from '../../__fixtures__/siphon-fixtures';

describe('reducer', () => {
  let collectionsFixture = [];
  beforeEach(() => {
    collectionsFixture = [...COLLECTIONS];
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toBeDefined();
  });

  it('should handle LOAD SIPHON COLLECTIONS', () => {
    expect(INITIAL_STATES.SIPHON.collections.length).toBe(0);
    const newState = reducer(INITIAL_STATES.SIPHON, ACTIONS.LOAD_SIPHON_COLLECTIONS);
    expect(newState.collections.length).toBe(collectionsFixture.length);
    expect(newState.collections[0].nodes.length).toBe(collectionsFixture[0].nodes.length);
  });

  it('should set filter to active when added and if there are available nodes', () => {
    // add some nodes to the initial state
    const state = {
      ...INITIAL_STATES.SIPHON,
      _collections: collectionsFixture,
      collections: collectionsFixture,
    };
    const newState = reducer(state, ACTIONS.ADD_FILTER);
    const filter = newState.filters.find(f => f.key === ACTIONS.ADD_FILTER.payload.key);

    expect(filter.active).toBe(true);
  });

  it("should set filter to inactive when added if there aren't any available nodes", () => {
    // the fixtured action ADD_FILTER targets personas that = designer
    // the fixture node that has resource type = documentation does not have this persona
    const state = { ...INITIAL_STATES.SIPHON, _collections: collectionsFixture };
    // first add filter
    const newState = reducer(state, ACTIONS.ADD_FILTER);
    // add filter action toggles the filter with persona = designer
    // apply search results that doesn't contain any resource with persona designer
    const nextState = reducer(newState, ACTIONS.SET_SEARCH_RESULTS);
    // assert filter has been auto set to inactive
    const filter = nextState.filters.find(f => f.key === ACTIONS.ADD_FILTER.payload.key);
    expect(filter.active).toBe(false);
  });

  it('should set filter to inactive when removed', () => {
    // add some nodes to the initial state
    const state = {
      ...INITIAL_STATES.SIPHON,
      _collections: collectionsFixture,
      collections: collectionsFixture,
    };
    const newState = reducer(state, ACTIONS.REMOVE_FILTER);
    const filter = newState.filters.find(f => f.key === ACTIONS.REMOVE_FILTER.payload.key);

    expect(filter.active).toBe(false);
  });

  // filtering isn't accoomplish by a reducer anymore
  // this will need to be re written for the memoized reselect selectors
  it.skip('should filter nodes by persona', () => {
    // the default state has a the 'developer' persona filter group active
    const state = {
      ...INITIAL_STATES.SIPHON,
      _collections: collectionsFixture,
      collections: collectionsFixture,
    };
    // in the initial state we stub in only 1 active filter
    const activeFilter = state.filters.find(f => f.active);
    // find it and get a count of the amount of personas in the first collection
    const numPersonasInFirstCollection = collectionsFixture[0].nodes.filter(n =>
      n.attributes.personas.some(p => p === activeFilter.value),
    ).length;
    //after calling reducer we'd expect the counts of the first collection in the new state
    // to be the same as the count found here
    const newState = reducer(state, ACTIONS.SET_SEARCH_RESULTS_ALL);
    expect(newState.filteredCollections[0].nodes.length).toBe(numPersonasInFirstCollection);
  });

  it('correctly sets available resources count', () => {
    const personaFilter = DEFAULT_FILTER_GROUPS[0];

    const newFilter = applyPropsToFilterByResourceCount(personaFilter, SIPHON_NODES);

    // manually reduce the amount of available resources within the collections
    const availableResources = SIPHON_NODES.reduce((acc, node) => {
      return acc + node.attributes.personas.some(p => p === personaFilter.value);
    }, 0);

    expect(newFilter.availableResources).toBe(availableResources);
  });

  it('correctly sets isFilterable if count > 0', () => {
    const personaFilter = DEFAULT_FILTER_GROUPS[0];

    expect(personaFilter.isFilterable).toBe(false);
    const newFilter = applyPropsToFilterByResourceCount(personaFilter, SIPHON_NODES);
    expect(newFilter.isFilterable).toBe(true);
  });

  it('set active to false if count === 0', () => {
    const productOwnerFilter = DEFAULT_FILTER_GROUPS[2];
    productOwnerFilter.active = true;
    // in our fixtured nodes, there are zero nodes that have the product owner persona
    const newFilter = applyPropsToFilterByResourceCount(productOwnerFilter, collectionsFixture);
    expect(newFilter.active).toBe(false);
  });

  it('should handle applying search results', () => {
    const state = {
      ...INITIAL_STATES.SIPHON,
      _collections: collectionsFixture,
      collections: collectionsFixture,
    };

    const newState = reducer(state, ACTIONS.SET_SEARCH_RESULTS);
    const totalNodes = newState.collections.reduce(
      (acc, collection) => acc + collection.nodes.length,
      0,
    );
    // we'd expect that the collections total nodes have been reduced to the length of the search results
    expect(totalNodes).toEqual(
      Object.keys(ACTIONS.SET_SEARCH_RESULTS.payload.searchResults).length,
    );
  });

  it('should handle resetting search', () => {
    const state = {
      ...INITIAL_STATES.SIPHON,
      _collections: collectionsFixture,
      collections: [],
    };

    const newState = reducer(state, ACTIONS.RESET_SEARCH);
    // we'd expect that the collections total nodes have been reduced to the length of the search results
    expect(newState.collections).toEqual(collectionsFixture);
    expect(newState.searchResults).toEqual({});
    expect(newState.loading).toBe(false);
    expect(newState.query).toBe(null);
    expect(newState.searchBarTerms).toBe('');
    expect(newState.filters[0].availableResources).toBe(
      INITIAL_STATES.SIPHON.filters[0].availableResources,
    );
  });
});
