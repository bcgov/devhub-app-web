import React from 'react';
import { shallow } from 'enzyme';
import { CardFilterButton } from '../../src/components/CardFilterButton/CardFilterButton';

describe('CardFilterButton Component', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<CardFilterButton filterSiphonNodes={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
