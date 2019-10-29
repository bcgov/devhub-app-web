import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import NotFound from '../../src/pages/404';

describe('404 Page', () => {
  test('it matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <NotFound />
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
