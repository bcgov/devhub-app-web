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
import reducer from '../../src/store/reducers/siphon';
import { ACTIONS, INITIAL_STATES, NODES } from '../../__fixtures__/redux-fixtures';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toBeDefined();
  });

  it('should handle LOAD SIPHON NODES', () => {
    expect(INITIAL_STATES.SIPHON.nodes.length).toBe(0);
    const newState = reducer(INITIAL_STATES.SIPHON, ACTIONS.LOAD_SIPHON_NODES);
    expect(newState.nodes.length).toBe(3);
  });

  it('should handle FILTER SIPHON NODES', () => {
    const state = { ...INITIAL_STATES.SIPHON, nodes: NODES, primaryFilteredNodes: NODES };

    const filteredState = reducer(state, ACTIONS.FILTER_SIPHON_NODES);

    expect(filteredState.primaryFilteredNodes.length).toBe(2);
  });

  it('should return all nodes if Filtered value is All', () => {
    const state = { ...INITIAL_STATES.SIPHON, nodes: NODES, primaryFilteredNodes: NODES };

    const filteredState = reducer(state, ACTIONS.FILTER_SIPHON_NODES_BY_ALL);

    expect(filteredState.primaryFilteredNodes.length).toBe(3);
  });

  it('should set filter to active when added and if there are available nodes', () => {
    // add some nodes to the initial state
    const state = { ...INITIAL_STATES.SIPHON, nodes: NODES, primaryFilteredNodes: NODES };
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
    const primaryFilteredNodes = NODES.filter(n => n.resourceType === 'Documentation');
    const state = { ...INITIAL_STATES.SIPHON, nodes: NODES, primaryFilteredNodes };

    const newState = reducer(state, ACTIONS.ADD_FILTER);
    const filter = newState.filters.find(f => f.key === ACTIONS.ADD_FILTER.payload.key);

    expect(filter.active).toBe(false);
  });

  it('should set filter to inactive when removed', () => {
    // add some nodes to the initial state

    const state = { ...INITIAL_STATES.SIPHON, nodes: NODES, primaryFilteredNodes: NODES };
    const newState = reducer(state, ACTIONS.REMOVE_FILTER);
    const filter = newState.filters.find(f => f.key === ACTIONS.REMOVE_FILTER.payload.key);

    expect(filter.active).toBe(false);
  });
});
