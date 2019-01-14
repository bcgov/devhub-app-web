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
import {
  ACTIONS,
  INITIAL_STATES,
  COLLECTIONS,
  DEFAULT_FILTER_GROUPS,
} from '../../__fixtures__/redux-fixtures';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toBeDefined();
  });

  it('should handle LOAD SIPHON COLLECTIONS', () => {
    expect(INITIAL_STATES.SIPHON.collections.length).toBe(0);
    const newState = reducer(INITIAL_STATES.SIPHON, ACTIONS.LOAD_SIPHON_COLLECTIONS);
    expect(newState.collections.length).toBe(1);
    expect(newState.collections[0].nodes.length).toBe(2);
  });

  it('should handle FILTER SIPHON NODES', () => {
    const state = {
      ...INITIAL_STATES.SIPHON,
      collections: COLLECTIONS,
      primaryFilteredNodes: COLLECTIONS,
    };

    // this action filters out all nodes in collections that don't match resource type 'Components'
    const filteredState = reducer(state, ACTIONS.FILTER_SIPHON_NODES);
    // in the fixiture there are only 2 nodes, 1 of them having Components therefor only expect
    // the first collection to have one node left
    expect(filteredState.primaryFilteredNodes[0].nodes.length).toBe(1);
  });

  it('should return all nodes if Filtered value is All', () => {
    const state = {
      ...INITIAL_STATES.SIPHON,
      collections: COLLECTIONS,
      primaryFilteredNodes: COLLECTIONS,
    };

    const filteredState = reducer(state, ACTIONS.FILTER_SIPHON_NODES_BY_ALL);

    expect(filteredState.primaryFilteredNodes[0].nodes.length).toBe(COLLECTIONS[0].nodes.length);
  });

  it('should set filter to active when added and if there are available nodes', () => {
    // add some nodes to the initial state
    const state = {
      ...INITIAL_STATES.SIPHON,
      collections: COLLECTIONS,
      primaryFilteredNodes: COLLECTIONS,
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
    const primaryFilteredNodes = COLLECTIONS.filter(n => n.resourceType === 'Documentation');
    const state = { ...INITIAL_STATES.SIPHON, collections: COLLECTIONS, primaryFilteredNodes };

    const newState = reducer(state, ACTIONS.ADD_FILTER);
    const filter = newState.filters.find(f => f.key === ACTIONS.ADD_FILTER.payload.key);

    expect(filter.active).toBe(false);
  });

  it('should set filter to inactive when removed', () => {
    // add some nodes to the initial state

    const state = {
      ...INITIAL_STATES.SIPHON,
      collections: COLLECTIONS,
      primaryFilteredNodes: COLLECTIONS,
    };
    const newState = reducer(state, ACTIONS.REMOVE_FILTER);
    const filter = newState.filters.find(f => f.key === ACTIONS.REMOVE_FILTER.payload.key);

    expect(filter.active).toBe(false);
  });

  it('should filter nodes by persona', () => {
    console.log('checking secondary filters');
    // the default state has a the 'developer' persona filter group active
    const state = {
      ...INITIAL_STATES.SIPHON,
      collections: COLLECTIONS,
      primaryFilteredNodes: COLLECTIONS,
    };
    // when calling the filter list action, we should expect the filtered nodes to tbe length
    // of 1 from 2 since there is only one node that has that persona
    const newState = reducer(state, ACTIONS.FILTER_SIPHON_NODES_BY_LIST);
    expect(newState.secondaryFilteredNodes[0].nodes.length).toBe(1);
  });

  it('correctly sets available resources count', () => {
    const personaFilter = DEFAULT_FILTER_GROUPS[0];
    // in our fixtured nodes, there is only one node that has the designer persona attribute
    expect(personaFilter.availableResources).toBe(0);
    const newFilter = applyPropsToFilterByResourceCount(personaFilter, COLLECTIONS);
    expect(newFilter.availableResources).toBe(1);
  });

  it('correctly sets isFilterable if count > 0', () => {
    const personaFilter = DEFAULT_FILTER_GROUPS[0];

    expect(personaFilter.isFilterable).toBe(false);
    const newFilter = applyPropsToFilterByResourceCount(personaFilter, COLLECTIONS);
    expect(newFilter.isFilterable).toBe(true);
  });

  it('set active to false if count === 0', () => {
    const productOwnerFilter = DEFAULT_FILTER_GROUPS[2];
    productOwnerFilter.active = true;
    // in our fixtured nodes, there are zero nodes that have the product owner persona
    const newFilter = applyPropsToFilterByResourceCount(productOwnerFilter, COLLECTIONS);
    expect(newFilter.active).toBe(false);
  });
});
