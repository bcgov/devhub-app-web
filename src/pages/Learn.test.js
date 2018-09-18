import React from 'react';
import { mount } from 'enzyme';
import Learn from './learn';

describe('Learn Container', () => {
  test('it renders without crashing', () => {
    //   using mount instead of shallow as Learn has a ref for now
    const wrapper = mount(<Learn />);
  });
});
