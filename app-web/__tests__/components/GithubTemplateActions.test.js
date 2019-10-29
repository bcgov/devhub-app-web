import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';

import Actions, { TEST_IDS } from '../../src/components/GithubTemplate/Actions/Actions';

describe('Github Resource Page Actions', () => {
  const props = {
    repo: 'foo',
    owner: 'bar',
    pageTitle: 'About',
    originalSource: '/about.md',
    devhubPath: 'blarb',
  };

  it('creates a link to the appropriate github repo issue page with params', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Actions {...props} />
      </ThemeProvider>,
    );

    const link = getByTestId(TEST_IDS.issue);

    expect(link.href).toBe(
      `https://www.github.com/bar/foo/issues/new?title=Devhub%20Issue%3A%20About%20%5Bshort%20description%20here%5D&body=%3E%20path%3A%20(do%20not%20delete)%20%2Fabout.md%0A%20%3E%20(do%20not%20delete)%20devhub%20page%3A%20blarb%0A%0A%23%23%20Devhub%20Content%20Issue%0A`,
    );
  });
});
