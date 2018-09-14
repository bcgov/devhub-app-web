import React from 'react';
import { shallow } from 'enzyme';
import PrimaryHeader from './PrimaryHeader';

let wrapper;

beforeEach(() => {
  shallow(<PrimaryHeader />);
});

describe('Primary Header Component', () => {
  test('it matches snapshot', () => {
    const wrapper = shallow(<PrimaryHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
