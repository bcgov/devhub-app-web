import React from 'react';
import { mount } from 'enzyme';
import Do from './do';

describe('Do Container', () => {
  test('it renders without crashing', () => {
    //   using mount instead of shallow as Deliver has a ref for now
    const wrapper = mount(<Do />);
  });
});
