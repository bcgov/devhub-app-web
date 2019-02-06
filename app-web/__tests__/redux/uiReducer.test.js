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
import reducer from '../../src/store/reducers/ui';
import { ACTIONS, INITIAL_STATES } from '../../__fixtures__/redux-fixtures';

describe('ui reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATES.UI);
  });

  it('should handle TOGGLE_MAIN_NAVIGATION', () => {
    expect(INITIAL_STATES.UI.mainNavigationToggled).toBe(false);
    const newState = reducer(INITIAL_STATES.UI, ACTIONS.TOGGLE_MAIN_NAVIGATION_ON);
    expect(newState.mainNavigationToggled).toBe(true);
    const nextState = reducer(newState, ACTIONS.TOGGLE_MAIN_NAVIGATION_OFF);
    expect(nextState.mainNavigationToggled).toBe(false);
  });
});
