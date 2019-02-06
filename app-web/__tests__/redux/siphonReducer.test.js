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
import reducer, {
  applyPropsToFilterByResourceCount,
  getTruePositionFromWeightedScale,
} from '../../src/store/reducers/siphon';
import { ACTIONS, INITIAL_STATES, DEFAULT_FILTER_GROUPS } from '../../__fixtures__/redux-fixtures';
import { COLLECTIONS } from '../../__fixtures__/siphon-fixtures';
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

  // sometimes when toggling through the primary filters, there may be a secondary filter that
  // was toggled that doesnt apply to the primary filtered nodes, in that case it should automatically
  // be unset
  it("should set filter to inactive when added if there aren't any available nodes", () => {
    // the fixtured action ADD_FILTER targets personas that = designer
    // the fixture node that has resource type = documentation does not have this persona
    const collections = collectionsFixture.filter(n => n.resourceType === 'Documentation');
    const state = { ...INITIAL_STATES.SIPHON, _collections: collectionsFixture, collections };

    const newState = reducer(state, ACTIONS.ADD_FILTER);
    const filter = newState.filters.find(f => f.key === ACTIONS.ADD_FILTER.payload.key);

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

  it('should filter nodes by persona', () => {
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
    const newState = reducer(state, ACTIONS.FILTER_SIPHON_NODES_BY_LIST);
    expect(newState.filteredCollections[0].nodes.length).toBe(numPersonasInFirstCollection);
  });

  it('correctly sets available resources count', () => {
    const personaFilter = DEFAULT_FILTER_GROUPS[0];
    // in our fixtured nodes, there is only one node that has the designer persona attribute
    expect(personaFilter.availableResources).toBe(0);
    const newFilter = applyPropsToFilterByResourceCount(personaFilter, collectionsFixture);

    // manually reduce the amount of available resources within the collections
    const availableResources = collectionsFixture.reduce((acc, collection) => {
      return (
        acc +
        collection.nodes.filter(n => n.attributes.personas.some(p => p === personaFilter.value))
          .length
      );
    }, 0);

    expect(newFilter.availableResources).toBe(availableResources);
  });

  it('correctly sets isFilterable if count > 0', () => {
    const personaFilter = DEFAULT_FILTER_GROUPS[0];

    expect(personaFilter.isFilterable).toBe(false);
    const newFilter = applyPropsToFilterByResourceCount(personaFilter, collectionsFixture);
    expect(newFilter.isFilterable).toBe(true);
  });

  it('set active to false if count === 0', () => {
    const productOwnerFilter = DEFAULT_FILTER_GROUPS[2];
    productOwnerFilter.active = true;
    // in our fixtured nodes, there are zero nodes that have the product owner persona
    const newFilter = applyPropsToFilterByResourceCount(productOwnerFilter, collectionsFixture);
    expect(newFilter.active).toBe(false);
  });

  it('calculates position correctly from [0, 1, 1]', () => {
    const position = getTruePositionFromWeightedScale([0, 1, 1]);
    expect(position).toBe('100.20.2');
  });

  it("positions don't conflict when there are a large number of smaller weighted items", () => {
    const position1 = getTruePositionFromWeightedScale([2, 1, 1994]);
    const position2 = getTruePositionFromWeightedScale([3, 0, 0]);
    // sort positions lexographically
    const toSort = [position1, position2].sort((a, b) => {
      if (a < b) return 1;
      if (a > b) return -1;
      return 0;
    });
    // we should expect position2 to still be ahead of position1
    expect(toSort).toEqual([position2, position1]);
  });

  it.skip('should handle applying search results', () => {
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
});
