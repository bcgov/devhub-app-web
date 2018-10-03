import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  accessToken: null,
  idToken: null,
  error: false,
  messages: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE_SUCCESS:
      console.log('called');
      return { ...state, isAuthenticated: true };
    case actionTypes.AUTHENTICATE_FAILED:
      return { ...state, isAuthenticated: false };
    default: return state;
  }
};

export default reducer;
