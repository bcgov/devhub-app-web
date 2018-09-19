import React from 'react';
import { shallow } from 'enzyme';
import PrimaryFooter from './PrimaryFooter';

let wrapper;

beforeEach(() => {
  shallow(<PrimaryFooter />);
});

describe('Primary Footer Component', () => {
  test('it matches snapshot', () => {
    const wrapper = shallow(<PrimaryFooter />);
    expect(wrapper).toMatchSnapshot();
  });
});
