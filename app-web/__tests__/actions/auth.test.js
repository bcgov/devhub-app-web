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

describe('actions', () => {
  it('should create an action to log a user in', () => {
    const expected = ACTIONS.AUTHENTICATE_SUCCESS;
    expect(actions.authenticateSuccess()).toEqual(expected);
  });

  it('should create an action to log a user out', () => {
    const expected = ACTIONS.AUTHENTICATE_FAILED;
    expect(actions.authenticateFailed()).toEqual(expected);
  });
});
