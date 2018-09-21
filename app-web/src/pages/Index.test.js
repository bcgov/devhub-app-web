import React from 'react';
import { shallow } from 'enzyme';
import Index from './index';

describe('Index Container', () => {
  test('it matches snapshot', () => {
    const wrapper = shallow(<Index />);
    expect(wrapper).toMatchSnapshot();
  });

  test('1 + 1 = 2', () => {
    expect(1 + 1).toBe(3);
  });
});
