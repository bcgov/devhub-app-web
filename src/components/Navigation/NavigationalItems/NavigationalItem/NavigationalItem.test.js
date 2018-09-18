import React from 'react';
import { shallow } from 'enzyme';
import NavigationalItem, { navigate } from './NavigationalItem';

describe('Navigational Item Component', () => {
  test('it matches snapshot', () => {
    const baseProps = {
      title: 'this is the title',
      description: 'this is the description',
      link: '/',
      hexGridClassNumber: 2,
    };

    const wrapper = shallow(<NavigationalItem {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
