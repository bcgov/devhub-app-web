import React from 'react';
import { shallow } from 'enzyme';
import Cards, { getIdealCardsLargeLimit } from '../../src/components/Cards/Cards';
import { COLLECTIONS } from '../../__fixtures__/siphon-fixtures';

describe('Card Component', () => {
  const CARDS = {
    DEFAULT: COLLECTIONS[0].nodes[0],
    REPOSITORY: COLLECTIONS[0].nodes[0],
    SELF_SERVICE: COLLECTIONS[0].nodes[0],
    COMPONENT: COLLECTIONS[0].nodes[0],
    DOCUMENT: COLLECTIONS[0].nodes[0],
  };

  it('matches snapshot', () => {
    const wrapper = shallow(<Cards cards={[CARDS.DEFAULT]} topic="topic" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calculates toggle card limit correctly', () => {
    const MAX_CARD_LIMIT = 9;
    const CARDS_PER_ROW = 3;
    const NUM_CARDS1 = 8;
    const NUM_CARDS2 = 6;
    const NUM_CARDS3 = 2;
    const NUM_CARDS4 = 9;
    const NUM_CARDS5 = 10;
    const NUM_CARDS6 = 0;
    const NUM_CARDS7 = 4;

    expect(getIdealCardsLargeLimit(MAX_CARD_LIMIT, NUM_CARDS1, CARDS_PER_ROW)).toBe(6);
    expect(getIdealCardsLargeLimit(MAX_CARD_LIMIT, NUM_CARDS2, CARDS_PER_ROW)).toBe(6);
    expect(getIdealCardsLargeLimit(MAX_CARD_LIMIT, NUM_CARDS3, CARDS_PER_ROW)).toBe(3);
    expect(getIdealCardsLargeLimit(MAX_CARD_LIMIT, NUM_CARDS4, CARDS_PER_ROW)).toBe(9);
    expect(getIdealCardsLargeLimit(MAX_CARD_LIMIT, NUM_CARDS5, CARDS_PER_ROW)).toBe(9);
    expect(getIdealCardsLargeLimit(MAX_CARD_LIMIT, NUM_CARDS6, CARDS_PER_ROW)).toBe(3);
    expect(getIdealCardsLargeLimit(MAX_CARD_LIMIT, NUM_CARDS7, CARDS_PER_ROW)).toBe(3);
  });
});
