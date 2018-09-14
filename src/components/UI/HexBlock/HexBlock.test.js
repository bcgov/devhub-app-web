import React from 'react';
import { shallow } from 'enzyme';

import HexBlock from './HexBlock';

describe('Hex Block Component', () => {
  test('it accepts nodes as children', () => {
    const child = <p>I'm a child</p>;
    const wrapper = shallow(<HexBlock>{child}</HexBlock>);
    expect(wrapper.containsMatchingElement(child)).toBe(true);
  });

  test('should trigger fn when clicked', () => {
    const baseProps = {
      clicked: jest.fn(),
    };

    const wrapper = shallow(<HexBlock {...baseProps} />);
    //find hex dom element wrapper that has the click event bound to it and click it
    wrapper.simulate('click');

    // expect(baseProps.clicked).toHaveBeenCalledTimes(1);
    expect(baseProps.clicked).toHaveBeenCalledTimes(1);
  });

  test('it adds to classNames if collapse flag is passed', () => {
    const wrapper = shallow(<HexBlock />);
    const initialClassNames = wrapper.prop('className').split(' ');
    wrapper.setProps({ collapses: true });
    wrapper.update();
    const updatedClassNames = wrapper.prop('className').split(' ');
    expect(initialClassNames.length).toBeLessThan(updatedClassNames.length);
  });

  test('it adds icon if flag passed', () => {
    const icon = 'blah';
    const wrapper = shallow(<HexBlock icon={icon} />);
    expect(wrapper.find('.Icon').length).toBe(1); //only 1 icon is passed in for now
    wrapper.setProps({ icon: '' });
    wrapper.update();
    expect(wrapper.find('.Icon').length).toBe(0);
  });
});
