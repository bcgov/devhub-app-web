import React from 'react';
import { shallow } from 'enzyme';
import Learn from './learn';

describe('Learn Container', () => {
  test('it renders without crashing', () => {
    const wrapper = shallow(<Learn />);
  });
});
