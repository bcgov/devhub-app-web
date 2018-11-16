import * as actionTypes from './actionTypes';

export const loadSiphonNodes = nodes => {
  return {
    type: actionTypes.LOAD_SIPHON_NODES,
    payload: {
      nodes,
    },
  };
};
