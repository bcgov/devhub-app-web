import React from 'react';
import { shallow } from 'enzyme';
import Toggle from '../../src/components/Cards/Toggle';
import Button from '../../src/components/UI/Button/Button';
describe('Toggle Component', () => {
  it('matches snapshot', () => {
    const cardLimit = 1;
    const cards = ['card1', 'card2', 'card3'];
    const wrapper = shallow(<Toggle cardComponents={cards} cardLimits={cardLimit} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('shows collapse button when toggled on', () => {
    const cardLimit = 1;
    const cards = ['card1', 'card2', 'card3'];
    const wrapper = shallow(<Toggle cardComponents={cards} cardLimits={cardLimit} />);

    wrapper.setState({ toggled: true });
    wrapper.update();

    expect(
      wrapper
        .find(Button)
        .first()
        .render()
        .text(),
    ).toBe('Collapse');
  });

  it('shows Show All button when toggled off', () => {
    const cardLimit = 1;
    const cards = ['card1', 'card2', 'card3'];
    const wrapper = shallow(<Toggle cardComponents={cards} cardLimits={cardLimit} />);

    wrapper.setState({ toggled: false });
    wrapper.update();

    expect(
      wrapper
        .find(Button)
        .first()
        .render()
        .text(),
    ).toBe('Show All');
  });
});
