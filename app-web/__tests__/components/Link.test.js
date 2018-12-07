import React from 'react';
import { shallow } from 'enzyme';
import Link from '../../src/components/UI/Link/Link';

describe('Gatsby Link Component', () => {
  test("it renders an anchor tag if passed a path that doesn't link to a page component", () => {
    const to = 'https://www.google.com';
    const wrapper = shallow(<Link to={to} />); // eslint-disable-line
    const expected = <a href={to} />; // eslint-disable-line
    expect(wrapper.matchesElement(expected)).toBe(true);
  });

  test('it renders a gatsby link if passed a path that links to a page componented', () => {
    const to = '/learn';
    const gatsbyLinkWrapper = shallow(<Link to={to} />); // eslint-disable-line
    const anchorLinkWrapper = shallow(<Link to="https://www.google.com" />);
    expect(gatsbyLinkWrapper.type()).not.toEqual(anchorLinkWrapper.type());
  });
});
