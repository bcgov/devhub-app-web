import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import Disclaimer from '../../src/components/Disclaimer/Disclaimer';

describe('Disclaimer Component', () => {
  const props = {
    onClose: jest.fn(),
    toggle: jest.fn(),
    open: true,
  };

  it('matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Disclaimer {...props} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
