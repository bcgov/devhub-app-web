import React from 'react';
import { shallow } from 'enzyme';
import NavigationalItems from './NavigationalItems';

describe('Navigational Item Component', () => {
  test('it matches snapshot', () => {
    const links = [{ title: 'link1', link: '/' }, { title: 'link2', link: '/2' }];
    const wrapper = shallow(<NavigationalItems navItems={links} />);
    expect(wrapper).toMatchSnapshot();
  });
});
