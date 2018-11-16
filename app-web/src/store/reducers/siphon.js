import * as actionTypes from '../actions/actionTypes';
import dotProp from 'dot-prop';

const initialState = {
  nodes: [],
  filteredNodes: [],
  filtered: {
    by: null,
    value: null,
  },
  groupBy: null,
  loading: false,
  error: false,
  messages: [],
};

/**
 * retrieves nodes by filtering for a given value in a nested siphon property
 */
export const filterNodesByParam = (filtered, nodes) => {
  return nodes.filter(n => dotProp.get(n, filtered.by) === filtered.value);
};

const loadNodes = (state, nodes) => {
  const newState = { ...state };
  newState.nodes = nodes.map(n => ({ ...n }));
  // nodes will be filtered eventually be resource type which is the top level navigation
  newState.filteredNodes = nodes.map(n => ({ ...n }));
  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_SIPHON_NODES:
      return loadNodes(state, action.payload.nodes);
    default:
      return state;
  }
};

export default reducer;
