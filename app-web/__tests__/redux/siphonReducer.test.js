import reducer from '../../src/store/reducers/siphon';
import * as types from '../../src/store/actions/actionTypes';
import { ACTIONS, INITIAL_STATES } from '../../__fixtures__/redux-fixtures';
describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATES.SIPHON);
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
    expect(filteredState.filteredNodes.length).toBe(1);
  });

  it('should return all nodes if Filtered value is All', () => {
    expect(INITIAL_STATES.SIPHON.nodes.length).toBe(0);
    const newState = reducer(INITIAL_STATES.SIPHON, ACTIONS.LOAD_SIPHON_NODES);
    const filteredState = reducer(newState, {
      type: types.FILTER_SIPHON_NODES,
      payload: {
        filteredBy: 'baz',
        value: 'All',
      },
    });
    expect(filteredState.filteredNodes.length).toBe(3);
  });
});
