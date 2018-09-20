import React from 'react';
import { mount } from 'enzyme';
import Deliver from './deliver';

describe('Deliver Container', () => {
  test('it renders without crashing', () => {
    //   using mount instead of shallow as Deliver has a ref for now
    const wrapper = mount(<Deliver />);
  });
});
