import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

let wrapper;
let mockFn;

beforeEach(() => {
  wrapper = shallow(<Button />);
  mockFn = jest.fn();
});

describe('Button Component', () => {
  test('it allow text to be passed in as children', () => {
    const text = `click me!!!!${Date.now()}`;
    const wrapper = shallow(<Button>{text}</Button>);
    expect(wrapper.text()).toBe(text);
  });
});
