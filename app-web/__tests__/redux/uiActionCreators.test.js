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
import * as actions from '../../src/store/actions';
import { ACTIONS } from '../../__fixtures__/redux-fixtures';

describe('ui action creators', () => {
  it('should create an action to set main navigiaton toggle', () => {
    const expected = ACTIONS.TOGGLE_MAIN_NAVIGATION_ON;
    expect(actions.toggleMainNavigation(ACTIONS.TOGGLE_MAIN_NAVIGATION_ON.payload.toggled)).toEqual(
      expected,
    );
  });
});
