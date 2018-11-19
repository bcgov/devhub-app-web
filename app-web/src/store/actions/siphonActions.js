import * as actionTypes from './actionTypes';

export const loadSiphonNodes = nodes => {
  return {
    type: actionTypes.LOAD_SIPHON_NODES,
    payload: {
      nodes,
    },
  };
};

export const filterSiphonNodes = (filteredBy, value) => {
  return {
    type: actionTypes.FILTER_SIPHON_NODES,
    payload: {
      filteredBy,
      value,
    },
  };
};
