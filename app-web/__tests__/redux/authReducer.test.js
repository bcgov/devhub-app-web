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
import reducer from '../../src/store/reducers/auth';
import { ACTIONS, INITIAL_STATES } from '../../__fixtures__/redux-fixtures';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATES.AUTH);
  });

  it('should handle authenticate success', () => {
    expect(INITIAL_STATES.AUTH.isAuthenticated).toBe(false);
    const newState = reducer(INITIAL_STATES.AUTH, ACTIONS.AUTHENTICATE_SUCCESS);
    expect(newState.isAuthenticated).toBe(true);
  });

  it('should handle authenticate failed', () => {
    expect(INITIAL_STATES.AUTH.isAuthenticated).toBe(false);

    const newState = reducer(INITIAL_STATES.AUTH, ACTIONS.AUTHENTICATE_SUCCESS);

    expect(newState.isAuthenticated).toBe(true);

    expect(reducer(newState, ACTIONS.AUTHENTICATE_FAILED).isAuthenticated).toBe(false);
  });
});
