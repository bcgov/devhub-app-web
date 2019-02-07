import React from 'react';
import NameSpacedImg from '../../src/components/UI/NameSpacedImg/NameSpacedImg';
import { shallow } from 'enzyme';

describe('NameSpacedImg', () => {
  it('renders a font awesome icon when passed in a font awesome name spaced value', () => {
    const wrapper = shallow(<NameSpacedImg src="fa:edit" />);
    expect(
      wrapper
        .find('i')
        .first()
        .prop('className'),
    ).toBe('fa-edit');
  });

  it('renders an img when no namespaced value is passed in as src', () => {
    const src = 'https://myimage.com';
    const wrapper = shallow(<NameSpacedImg src={src} alt="image" />);
    expect(
      wrapper
        .find('img')
        .first()
        .prop('src'),
    ).toBe(src);
  });
});
