import React from 'react';
import { shallow } from 'enzyme';
import Deliver from './deliver';

describe('Deliver Container', () => {
  test('it renders without crashing', () => {
    const context = {
      router: {
        history: '',
      },
    };
    const wrapper = shallow(<Deliver />, context);
  });
});
