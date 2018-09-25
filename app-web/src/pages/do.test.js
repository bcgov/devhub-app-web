import React from 'react';
import { shallow } from 'enzyme';
import Do from './do';

describe('Do Container', () => {
  test('it renders without crashing', () => {
    const context = {
      router: {
        history: '',
      },
    };
    const wrapper = shallow(<Do />, context);
  });
});
