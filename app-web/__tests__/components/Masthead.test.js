import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Masthead, { TEST_IDS } from '../../src/components/Home/Masthead';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import { useAuthenticated } from '../../src/utils/hooks';
jest.mock('../../src/utils/hooks');
describe('Masthead Component', () => {
  afterEach(cleanup);

  it('It shows an alert window when a search has happened', () => {
    useAuthenticated.mockReturnValue({ authenticated: false });

    const { queryByTestId, rerender } = render(
      <ThemeProvider theme={theme}>
        <Masthead query={'openshift'} searchSourcesLoading={true} resultCount={12} />
      </ThemeProvider>,
    );
    const alert = queryByTestId(TEST_IDS.alertBox);
    expect(alert).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Masthead query={'devop'} searchSourcesLoading={true} resultCount={0} />
      </ThemeProvider>,
    );
    expect(alert).toBeInTheDocument();

    const closebtn = alert.querySelector('button');
    fireEvent.click(closebtn);
    expect(alert).not.toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Masthead query={'happy'} searchSourcesLoading={true} resultCount={0} />
      </ThemeProvider>,
    );

    expect(alert).not.toBeInTheDocument();
  });

  it('The alert box does not show when authenticated', () => {
    useAuthenticated.mockReturnValue({ authenticated: true });

    const { queryByTestId, rerender } = render(
      <ThemeProvider theme={theme}>
        <Masthead query={'openshift'} searchSourcesLoading={true} resultCount={12} />
      </ThemeProvider>,
    );
    const alert = queryByTestId(TEST_IDS.alertBox);
    expect(alert).not.toBeInTheDocument();
    rerender(
      <ThemeProvider theme={theme}>
        <Masthead query={'happy'} searchSourcesLoading={true} resultCount={0} />
      </ThemeProvider>,
    );

    expect(alert).not.toBeInTheDocument();
  });
});
