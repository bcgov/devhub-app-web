import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Masthead, { TEST_IDS } from '../../src/components/Home/Masthead';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import { useKeycloak } from '@react-keycloak/web';
jest.mock('@react-keycloak/web');
jest.mock('../../src/utils/hooks');
describe('Masthead Component', () => {
  afterEach(cleanup);
  // jwt time stamps are in seconds. dividing by 1000 to convert date.now ms to s

  it('It shows an alert window when a search has happened', () => {
    useKeycloak.mockReturnValue([{ authenticated: false }]);
    const { queryByTestId, rerender } = render(
      <ThemeProvider theme={theme}>
        <Masthead query={'openshift'} searchSourcesLoading={true} />
      </ThemeProvider>,
    );
    const alert = queryByTestId(TEST_IDS.alertBox);
    expect(alert).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Masthead query={'devop'} searchSourcesLoading={true} />
      </ThemeProvider>,
    );
    expect(alert).toBeInTheDocument();

    const closeBtn = alert.querySelector('button');
    fireEvent.click(closeBtn);
    expect(alert).not.toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Masthead query={'happy'} searchSourcesLoading={true} />
      </ThemeProvider>,
    );

    expect(alert).not.toBeInTheDocument();
  });

  it('The alert box does not show when authenticated', () => {
    useKeycloak.mockReturnValue([{ authenticated: true }]);
    const { queryByTestId, rerender } = render(
      <ThemeProvider theme={theme}>
        <Masthead query={'openshift'} searchSourcesLoading={true} />
      </ThemeProvider>,
    );
    const alert = queryByTestId(TEST_IDS.alertBox);
    expect(alert).not.toBeInTheDocument();
    rerender(
      <ThemeProvider theme={theme}>
        <Masthead query={'happy'} searchSourcesLoading={true} />
      </ThemeProvider>,
    );

    expect(alert).not.toBeInTheDocument();
  });
});
