import React from 'react';
import { shallow } from 'enzyme';
import { PrimaryHeader } from './PrimaryHeader';
import { LOGOUT_BTN_ID, LOGIN_BTN_ID } from '../../constants/ui';

describe('Primary Header Component', () => {
  test('it matches snapshot', () => {
    const wrapper = shallow(<PrimaryHeader />);
    expect(wrapper).toMatchSnapshot();
  });

  it('shows logout button when authenticated', () => {
    const wrapper = shallow(<PrimaryHeader isAuthenticated />);
    expect(wrapper.find(`#${LOGOUT_BTN_ID}`).length).toBe(1);
    expect(wrapper.find(`#${LOGIN_BTN_ID}`).length).toBe(0);
  });

  it('shows login button when not authenticated', () => {
    const wrapper = shallow(<PrimaryHeader isAuthenticated={false} />);
    expect(wrapper.find(`#${LOGOUT_BTN_ID}`).length).toBe(0);
    expect(wrapper.find(`#${LOGIN_BTN_ID}`).length).toBe(1);
  });
});
