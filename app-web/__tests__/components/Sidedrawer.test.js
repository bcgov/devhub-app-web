import React from 'react';
import { shallow } from 'enzyme';
import SideDrawer from '../../src/components/SideDrawer/SideDrawer';

describe('404 Page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SideDrawer title="this is a title" closeDrawer={jest.fn()} />);
  });

  test('it matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('it calls drawer close fn when x button is clicked', () => {
    const button = wrapper.find;
  });
});
