import React from 'react';
import { shallow, mount } from 'enzyme';
import SideDrawer from '../../src/components/SideDrawer/SideDrawer';

describe('404 Page', () => {
  let wrapper, closeDrawer;
  let title = 'Foo';
  beforeEach(() => {
    closeDrawer = jest.fn();
    wrapper = shallow(<SideDrawer title={title} closeDrawer={closeDrawer} />);
  });

  test('it matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('it calls drawer close fn when x button is clicked', () => {
    const button = wrapper.find('IconButton');
    button.simulate('click');

    expect(closeDrawer).toHaveBeenCalled();
  });

  test('it calls drawer close fn when backdrop is clicked', () => {
    const closeDrawer2 = jest.fn();
    const wrapper = mount(<SideDrawer title={title} closeDrawer={closeDrawer2} />);
    const backdrop = wrapper.find('Backdrop');
    backdrop.simulate('click');
    expect(closeDrawer2).toHaveBeenCalled();
  });

  test('it displays the title when passed in', () => {
    const h2 = wrapper.find('H2');
    expect(h2.containsMatchingElement(<span>{title}</span>)).toBeTruthy();
  });

  test('it allow children to be passed', () => {
    const child = <p>yoyoyoy</p>;
    expect(wrapper.containsMatchingElement(child)).not.toBeTruthy();

    wrapper.setProps({ children: child }).update();
    expect(wrapper.containsMatchingElement(child)).toBeTruthy();
  });
});
