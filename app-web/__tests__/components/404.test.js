import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../src/pages/404';

describe('404 Page', () => {
  test('it matches snapshot', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});
