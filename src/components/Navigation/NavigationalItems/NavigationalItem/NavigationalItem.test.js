import React from 'react';
import { shallow } from 'enzyme';
import NavigationalItem from './NavigationalItem';

describe('Navigational Item Component', () => {
  test('it matches snapshot', () => {
    const title = 'this is the title';
    const description = 'this is the description';
    const wrapper = shallow(
      <NavigationalItem title={title} description={description} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
