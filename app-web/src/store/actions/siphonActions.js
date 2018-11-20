import * as actionTypes from './actionTypes';

/**
 * Loads graphQL nodes from gatsby data layer into the redux store
 * @param {Array} nodes 
 */
export const loadSiphonNodes = nodes => {
  return {
    type: actionTypes.LOAD_SIPHON_NODES,
    payload: {
      nodes,
    },
  };
};

/**
 * filters siphon nodes
 * @param {String} filteredBy use dot prop notation if you are intending on accessing a nested node property eg 'prop1.prop2'
 * @param {String} value 
 */
export const filterSiphonNodes = (filteredBy, value) => {
  return {
    type: actionTypes.FILTER_SIPHON_NODES,
    payload: {
      filteredBy,
      value,
    },
  };
};
