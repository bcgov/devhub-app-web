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
    default:
      return state;
  }
};

export default reducer;
