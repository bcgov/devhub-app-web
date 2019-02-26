/*
Copyright 2019 Province of British Columbia

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
import { Layout } from '../../src/hoc/Layout';
import { create_iam } from '../../src/auth';
jest.mock('../../src/auth');

create_iam.mockImplementation(() => ({
  registerHooks: jest.fn(),
  handleOnPageLoad: jest.fn(),
}));

describe('Layout Component', () => {
  it('can toggle a menu', () => {
    const wrapper = shallow(
      <Layout
        showMenu={false}
        login={jest.fn()}
        logout={jest.fn()}
        useAuth={false}
        toggleMenu={jest.fn()}
      >
        foo
      </Layout>,
    );
    const Navbars = wrapper.find('Navbar');
    // there are two navbars one made for mobile and one for large screens
    // the hamburger menu triggers a state change that renders the second navbar (the mobile one)
    expect(Navbars.length).toBe(1);

    wrapper.setProps({ showMenu: true });
    wrapper.update();

    expect(wrapper.find('Navbar').length).toBe(2);
  });
});
