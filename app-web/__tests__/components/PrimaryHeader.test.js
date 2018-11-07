import React from 'react';
import { shallow } from 'enzyme';
import PrimaryHeader from '../../src/components/PrimaryHeader/PrimaryHeader';

describe('Primary Header Component', () => {
  test('it matches snapshot', () => {
    const wrapper = shallow(<PrimaryHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
