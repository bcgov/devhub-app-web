import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button Component', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<Button clicked={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('it calls event handling function when clicked', () => {
    const clickFn = jest.fn();
    const wrapper = shallow(<Button clicked={clickFn} />);
    wrapper.simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});
