import React from 'react';
import { shallow } from 'enzyme';
import GatsbyLink from 'gatsby-link';
import Link from './Link';
describe('Gatsby Link Component', () => {
  test("it renders an anchor tag if passed a path that doesn't link to a page component", () => {
    const to = 'https://www.google.com';
    const wrapper = shallow(<Link to={to} />);
    const expected = <a href={to} />;
    expect(wrapper.matchesElement(expected)).toBe(true);
  });

  test('it renders a gatsby link if passed a path that links to a page componented', () => {
    const to = '/learn';
    const wrapper = shallow(<Link to={to} />);
    expect(wrapper.type()).toEqual(GatsbyLink);
  });
});
