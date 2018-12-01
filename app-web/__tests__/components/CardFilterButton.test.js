import React from 'react';
import { shallow } from 'enzyme';
import CardFilterButton from '../../src/components/CardFilterButton/CardFilterButton';

describe('CardFilterButton Component', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<CardFilterButton filterSiphonNodes={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('it calls event handling function when clicked', () => {
    const clickFn = jest.fn();
    const wrapper = shallow(<CardFilterButton filterSiphonNodes={clickFn} />);
    wrapper.simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});
