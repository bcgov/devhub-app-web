import * as actions from '../src/store/actions/actionTypes';
export const ACTIONS = {
  LOAD_SIPHON_NODES: {
    type: actions.LOAD_SIPHON_NODES,
    payload: {
      nodes: [{ foo: 'bar' }, { foo: 'baz' }, { foo: 'foo' }],
    },
  },
  FILTER_SIPHON_NODES: {
    type: actions.FILTER_SIPHON_NODES,
    payload: {
      filteredBy: 'foo',
      value: 'bar',
    },
  },
};

export const INITIAL_STATES = {
  SIPHON: {
    nodes: [],
    filteredNodes: [],
    groupBy: null,
    loading: false,
    error: false,
    messages: [],
  },
};
