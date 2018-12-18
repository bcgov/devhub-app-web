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
import { ACTIONS, INITIAL_STATES } from '../../__fixtures__/redux-fixtures';

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
    expect(INITIAL_STATES.SIPHON.nodes.length).toBe(0);
    const newState = reducer(INITIAL_STATES.SIPHON, ACTIONS.LOAD_SIPHON_NODES);
    const filteredState = reducer(newState, ACTIONS.FILTER_SIPHON_NODES);
    expect(filteredState.primaryFilteredNodes.length).toBe(1);
  });

  it('should return all nodes if Filtered value is All', () => {
    expect(INITIAL_STATES.SIPHON.nodes.length).toBe(0);
    const newState = reducer(INITIAL_STATES.SIPHON, ACTIONS.LOAD_SIPHON_NODES);
    const filteredState = reducer(newState, ACTIONS.FILTER_SIPHON_NODES_BY_ALL);
    expect(filteredState.primaryFilteredNodes.length).toBe(3);
  });

  it('should add a filter group to filters list', () => {
    expect(INITIAL_STATES.SIPHON.filters.length).toBe(0);

    const newState = reducer(INITIAL_STATES.SIPHON, ACTIONS.ADD_FILTER);

    expect(newState.filters.length).toBe(1);
  });

  it('should remove a filter group from filters list', () => {
    expect(INITIAL_STATES.SIPHON.filters.length).toBe(0);

    const newState = reducer(INITIAL_STATES.SIPHON, ACTIONS.ADD_FILTER);

    expect(newState.filters.length).toBe(1);

    const finalState = reducer(newState, ACTIONS.REMOVE_FILTER);

    expect(finalState.filters.length).toBe(0);
  });
});
