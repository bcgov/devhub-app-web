import React from 'react';
import { shallow } from 'enzyme';

import HexBlock from './HexBlock';

describe('Hex Block Component', () => {
  test('it accepts nodes as children', () => {
    const child = <p>I'm a child</p>;
    const wrapper = shallow(<HexBlock>{child}</HexBlock>);
    expect(wrapper.containsMatchingElement(child)).toBe(true);
  });
});
