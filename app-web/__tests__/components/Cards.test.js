import React from 'react';
import { shallow } from 'enzyme';
import Cards from '../../src/components/Cards/Cards';
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
});
