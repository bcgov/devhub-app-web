import React from 'react';
import { shallow, mount } from 'enzyme';
import Hexgrid from './Hexgrid';
import HexBlock from './HexBlock/HexBlock';
describe('Hexgrid component', () => {
  const numComponents = 9;
  test('it matches snapshot', () => {
    const TestComponent = <div>TestComponent</div>;
    const components = new Array(numComponents).fill(TestComponent);
    const wrapper = shallow(<Hexgrid items={components} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('it has the default [3, 2] pattern when no gridPattern is passed in', () => {
    const TestComponent = <div>TestComponent</div>;
    const components = new Array(numComponents).fill(TestComponent);
    const wrapper = mount(<Hexgrid items={components} />);
    const hexblocks = wrapper.find(HexBlock);
    expect(hexblocks.length).toBe(9);
    // we'd expect hex blocks to have the pattern
    const expectedClassPattern = [3, 3, 3, 2, 2, 3, 3, 3, 2];
    hexblocks.forEach((hexblock, ind) => {
      expect(hexblock.prop('gridClassNumber')).toBe(expectedClassPattern[ind]);
    });
  });

  test('it has hex blocks that follow the [5,3] pattern when passed in', () => {
    const TestComponent = <div>TestComponent</div>;
    const components = new Array(numComponents).fill(TestComponent);
    const wrapper = mount(<Hexgrid gridPattern={[5, 3]} items={components} />);
    const hexblocks = wrapper.find(HexBlock);
    expect(hexblocks.length).toBe(9);
    // we'd expect hex blocks to have the pattern
    const expectedClassPattern = [5, 5, 5, 5, 5, 3, 3, 3, 5];
    hexblocks.forEach((hexblock, ind) => {
      expect(hexblock.prop('gridClassNumber')).toBe(expectedClassPattern[ind]);
    });
  });
});
