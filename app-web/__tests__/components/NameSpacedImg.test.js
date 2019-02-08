import React from 'react';
import NameSpacedImg from '../../src/components/UI/NameSpacedImg/NameSpacedImg';
import Avatar from 'react-avatar';
import { shallow } from 'enzyme';

describe('NameSpacedImg', () => {
  it('renders a font awesome icon when passed in a font awesome name spaced value', () => {
    const wrapper = shallow(<NameSpacedImg src="fontawesome:edit" />);
    expect(
      wrapper
        .find('i')
        .first()
        .prop('className'),
    ).toBe('fas fa-edit');
  });

  it('renders an avatar when no namespaced value is passed in as src and the image is absolute', () => {
    const src = 'https://myimage.com';
    const wrapper = shallow(<NameSpacedImg src={src} alt="image" />);
    expect(
      wrapper
        .find(Avatar)
        .first()
        .prop('src'),
    ).toBe(src);
  });

  it('renders an img tag if the src is an svg', () => {
    const src = 'myfile.svg';
    const wrapper = shallow(<NameSpacedImg src={src} alt="image" />);
    expect(
      wrapper
        .find('img')
        .first()
        .prop('src'),
    ).toBe(src);
  });

  it('renders an img tag if the src is a b64 string', () => {
    const src = `data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
        9TXL0Y4OHwAAAABJRU5ErkJggg==`;
    const wrapper = shallow(<NameSpacedImg src={src} alt="image" />);
    expect(
      wrapper
        .find('img')
        .first()
        .prop('src'),
    ).toBe(src);
  });

  it("renders an Avatar component with the name attribute if src doesn't meet other checks and allowNameFallBack is true", () => {
    const src = 'Matt Damon';
    const wrapper = shallow(<NameSpacedImg src={src} alt="image" allowNameFallback="true" />);
    expect(
      wrapper
        .find(Avatar)
        .first()
        .prop('name'),
    ).toBe(src);
  });

  it("retuns null if src passed doesn't satisify any cases", () => {
    const src = 'Matt Damon';
    const wrapper = shallow(<NameSpacedImg src={src} alt="image" />);
    expect(wrapper.type()).toBe(null);
  });
});
