import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import { PrimaryHeader } from '../../src/components/PrimaryHeader/PrimaryHeader';

describe('Primary Header Component', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <PrimaryHeader />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
