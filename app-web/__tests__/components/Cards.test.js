import React from 'react';
import { shallow } from 'enzyme';
import Cards from '../../src/components/Cards/Cards';

import { RESOURCE_TYPES } from '../../src/constants/ui';

describe('Card Component', () => {
  const CARDS = {
    DEFAULT: {
      resourceType: null,
      title: 'title',
      description: 'description',
      resourcePath: '/',
      repository: 'foo',
      owner: 'bar',
    },
    REPOSITORY: {
      resourceType: RESOURCE_TYPES.RESPOSITORIES,
      title: 'title',
      description: 'description',
      resourcePath: '/',
      repository: 'foo',
      owner: 'bar',
    },
    SELF_SERVICE: {
      resourceType: RESOURCE_TYPES.RESPOSITORIES,
      title: 'title',
      description: 'description',
      resourcePath: '/',
      repository: 'foo',
      owner: 'bar',
    },
    COMPONENT: {
      resourceType: RESOURCE_TYPES.RESPOSITORIES,
      title: 'title',
      description: 'description',
      resourcePath: '/',
      repository: 'foo',
      owner: 'bar',
    },
    DOCUMENT: {
      resourceType: RESOURCE_TYPES.RESPOSITORIES,
      title: 'title',
      description: 'description',
      resourcePath: '/',
      repository: 'foo',
      owner: 'bar',
    },
  };

  it('matches snapshot', () => {
    const wrapper = shallow(<Cards cards={[CARDS.DEFAULT]} topic="topic" />);
    expect(wrapper).toMatchSnapshot();
  });
});
