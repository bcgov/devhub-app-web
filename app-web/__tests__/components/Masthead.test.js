import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Masthead, { TEST_IDS } from '../../src/components/Home/Masthead';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import { useImplicitAuth } from '../../src/utils/hooks';
import { AuthProvider } from '../../src/AuthContext';
jest.mock('../../src/utils/hooks');
describe('Masthead Component', () => {
  afterEach(cleanup);
  // jwt time stamps are in seconds. dividing by 1000 to convert date.now ms to s
  const currentDate = Date.now() / 1000;
  it('It shows an alert window when a search has happened', () => {
    useImplicitAuth.mockReturnValue({});

    const { queryByTestId, rerender } = render(
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Masthead query={'openshift'} searchSourcesLoading={true} />
        </AuthProvider>
      </ThemeProvider>,
    );
    const alert = queryByTestId(TEST_IDS.alertBox);
    expect(alert).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Masthead query={'devop'} searchSourcesLoading={true} />
        </AuthProvider>
      </ThemeProvider>,
    );
    expect(alert).toBeInTheDocument();

    const closeBtn = alert.querySelector('button');
    fireEvent.click(closeBtn);
    expect(alert).not.toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Masthead query={'happy'} searchSourcesLoading={true} />
        </AuthProvider>
      </ThemeProvider>,
    );

    expect(alert).not.toBeInTheDocument();
  });

  it('The alert box does not show when authenticated', () => {
    useImplicitAuth.mockReturnValue({
      idToken: {
        data: {
          exp: currentDate + 50000,
        },
      },
    });
    const { queryByTestId, rerender } = render(
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Masthead query={'openshift'} searchSourcesLoading={true} />
        </AuthProvider>
      </ThemeProvider>,
    );
    const alert = queryByTestId(TEST_IDS.alertBox);
    expect(alert).not.toBeInTheDocument();
    rerender(
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Masthead query={'happy'} searchSourcesLoading={true} />
        </AuthProvider>
      </ThemeProvider>,
    );

    expect(alert).not.toBeInTheDocument();
  });
});
