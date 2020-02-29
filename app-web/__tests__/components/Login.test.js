import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import { Login, TEST_IDS } from '../../src/components/Auth/Login';
import { useKeycloak } from '@react-keycloak/web';
jest.mock('@react-keycloak/web');

describe('Login Component', () => {
  afterEach(cleanup);

  it('shows logout button when logged in', () => {
    useKeycloak.mockReturnValue([{ authenticated: true }]);
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Login authenticated />
      </ThemeProvider>,
    );
    const Button = getByTestId(TEST_IDS.logout);

    expect(Button).toBeInTheDocument();
  });

  it('shows login button when logged out', () => {
    useKeycloak.mockReturnValue([{ authenticated: false }]);
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Login authenticated={false} />
      </ThemeProvider>,
    );
    const Button = getByTestId(TEST_IDS.login);

    expect(Button).toBeInTheDocument();
  });
});
