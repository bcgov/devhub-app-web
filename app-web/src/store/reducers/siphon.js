import * as actionTypes from '../actions/actionTypes';
import dotProp from 'dot-prop-immutable';

const initialState = {
  nodes: [],
  filteredNodes: [],
  groupBy: null,
  loading: false,
  error: false,
  messages: [],
};

/**
 * retrieves nodes by filtering for a given value in a nested siphon property
 */
export const filterNodesByParam = (state, filteredBy, value) => {
  const filteredNodes = state.nodes
    .filter(n => dotProp.get(n, filteredBy) === value || value === 'All')
    .map(n => ({ ...n }));
  const newState = { ...state, filteredNodes };
  return newState;
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
    case actionTypes.FILTER_SIPHON_NODES:
      return filterNodesByParam(state, action.payload.filteredBy, action.payload.value);
    default:
      return state;
  }
};

export default reducer;
