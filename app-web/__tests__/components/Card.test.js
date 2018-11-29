import React from 'react';
import { shallow } from 'enzyme';
import DefaultCard from '../../src/components/Cards/Card/DefaultCard';

describe('Card Component', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(
      <DefaultCard
        title="title"
        description="description"
        resourcePath="resourcePath"
        sourcePath="sourcePath"
        sourceName="sourceName"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
