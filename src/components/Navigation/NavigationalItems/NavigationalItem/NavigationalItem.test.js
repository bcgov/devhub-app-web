import React from 'react';
import { shallow } from 'enzyme';
import NavigationalItem from './NavigationalItem';

describe('Navigational Item Component', () => {
  test('it allows node to be passed in as child', () => {
    const child = <div>Child</div>;
    const wrapper = shallow(<NavigationalItem>{child}</NavigationalItem>);
    expect(wrapper.containsMatchingElement(child)).toBe(true);
  });
});
