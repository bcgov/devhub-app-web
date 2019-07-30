import React from 'react';
import { mount } from 'enzyme';
import { Login } from '../../src/components/Auth/Login';
import { LOGOUT_BTN_ID, LOGIN_BTN_ID } from '../../src/constants/ui';

describe('Login Component', () => {
  it('shows logout button when logged in', () => {
    const wrapper = mount(<Login isAuthenticated />);
    expect(wrapper.find(`button#${LOGOUT_BTN_ID}`).text()).toBe('Logout');
  });

  it('shows login button when logged out', () => {
    const wrapper = mount(<Login isAuthenticated={false} />);
    expect(wrapper.find(`button#${LOGIN_BTN_ID}`).text()).toBe('Login');
  });

  it('logs user out when logout button clicked', () => {});
});
