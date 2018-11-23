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
import React from 'react';
import { shallow } from 'enzyme';
import NavigationItems from '../../src/components/NavigationItems/NavigationItems';
import { FOOTER_NAV } from '../../__fixtures__/ui-fixtures';
describe('Primary Footer Component', () => {
  test('it matches snapshot', () => {
    const wrapper = shallow(<NavigationItems items={FOOTER_NAV} />);
    expect(wrapper).toMatchSnapshot();
  });
});
