import React from 'react';
import { shallow } from 'enzyme';
import Toggle from '../../src/components/Cards/Toggle';

describe('Toggle Component', () => {
  it('matches snapshot', () => {
    const cardLimit = 1;
    const cards = ['card1', 'card2', 'card3'];
    const wrapper = shallow(<Toggle cardComponents={cards} cardLimits={cardLimit} />);
    expect(wrapper).toMatchSnapshot();
  });
});
