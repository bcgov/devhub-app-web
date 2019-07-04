import React from 'react';
import { SearchAwareLink } from '../../src/components/UI/Link';
import { linkMatchesQueryString } from '../../src/components/UI/Link/SearchAwareLink';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';

describe('Search Aware Link', () => {
  it('renders a Link component', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <SearchAwareLink activeClassName="bar">foo</SearchAwareLink>
      </ThemeProvider>,
    );
    expect(container.firstChild).toBeDefined();
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
