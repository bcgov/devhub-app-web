import React from 'react';
import { shallow } from 'enzyme';

import HexBlock from './HexBlock';

describe('Hex Block Component', () => {
  test('it accepts nodes as children', () => {
    const baseProps = {
      gridClassNumber: 2,
    };
    const child = <p>I'm a child</p>;
    const wrapper = shallow(<HexBlock {...baseProps}>{child}</HexBlock>);
    expect(wrapper.containsMatchingElement(child)).toBe(true);
  });

  test('it adds to classNames if collapse flag is passed', () => {
    const baseProps = {
      gridClassNumber: 2,
    };
    const wrapper = shallow(<HexBlock {...baseProps} />);
    const initialClassNames = wrapper.prop('className').split(' ');
    wrapper.setProps({ collapses: true });
    wrapper.update();
    const updatedClassNames = wrapper.prop('className').split(' ');
    expect(initialClassNames.length).toBeLessThan(updatedClassNames.length);
  });

  test('it adds icon if flag passed', () => {
    const baseProps = {
      icon: 'blah',
      gridClassNumber: 2,
    };
    const wrapper = shallow(<HexBlock {...baseProps} />);
    expect(wrapper.find('.Icon').length).toBe(1); //only 1 icon is passed in for now
    wrapper.setProps({ icon: '' });
    wrapper.update();
    expect(wrapper.find('.Icon').length).toBe(0);
  });
});
