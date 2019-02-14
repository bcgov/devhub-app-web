import React from 'react';
import AvatarUri from '../../src/hoc/avatarUri';
import { shallow } from 'enzyme';

describe('avatarURI higher order component', () => {
  it('Returns a react component', () => {
    const wrapper = shallow(<AvatarUri uri="github://something" />);
    expect(wrapper.html()).not.toBe(null);
  });
});
