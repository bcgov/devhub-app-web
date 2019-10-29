import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import Link, { TEST_IDS } from '../../src/components/UI/Link/Link';
describe('Gatsby Link Component', () => {
  test("it renders an anchor tag if passed a path that doesn't link to a page component", () => {
    const to = 'https://www.google.com';

    const { queryByTestId, rerender } = render(
      <ThemeProvider theme={theme}>
        <Link to={to} />
      </ThemeProvider>,
    );

    expect(queryByTestId(TEST_IDS.link)).toBeInTheDocument();
    expect(queryByTestId(TEST_IDS.gatsbyLink)).not.toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Link to="/home" />
      </ThemeProvider>,
    );
    expect(queryByTestId(TEST_IDS.link)).not.toBeInTheDocument();
    expect(queryByTestId(TEST_IDS.gatsbyLink)).toBeInTheDocument();
  });
});
