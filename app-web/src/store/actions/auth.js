import * as actionTypes from './actionTypes';

export const authenticateSuccess = () => {
  return {
    type: actionTypes.AUTHENTICATE_SUCCESS,
  };
};

export const authenticateFailed = () => {
  return {
    type: actionTypes.AUTHENTICATE_FAILED,
  };
};
