import React from 'react';
import { shallow } from 'enzyme';
import Card from '../../src/components/Cards/Card/Card';

describe('Card Component', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(
      <Card
        title="title"
        description="description"
        resourcePath="resourcePath"
        sourcePath="sourcePath"
        sourceName="sourceName"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
