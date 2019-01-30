import React from 'react';
import { SearchAwareLink, Link } from '../../src/components/UI/Link';
import { linkMatchesQueryString } from '../../src/components/UI/Link/SearchAwareLink';
import { shallow, mount } from 'enzyme';

describe('Search Aware Link', () => {
  it('renders a Link component', () => {
    const wrapper = shallow(<SearchAwareLink>foo</SearchAwareLink>);
    expect(wrapper.find(Link)).toBeDefined();
  });

  it('linkMatchesQueryString returns true when strings match', () => {
    const location = {
      search: '?q=foo&l=bar',
    };

    const to = '/?q=foo';

    const matches = linkMatchesQueryString(location, to);
    expect(matches).toBe(true);
  });

  it('linkMatchesQueryString returns false when strings dont have a match', () => {
    const location = {
      search: '?q=foo&l=bar',
    };

    const to = '/?q=nancy';

    const matches = linkMatchesQueryString(location, to);
    expect(matches).toBe(false);
  });

  it('linkMatchesQueryString returns true when to matches within a set of search params', () => {
    const location = {
      search: '?q=foo&l=bar&matt=damon',
    };

    const to = '/?matt=damon';

    const matches = linkMatchesQueryString(location, to);
    expect(matches).toBe(true);
  });
});
