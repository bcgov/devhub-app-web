import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';
import { Login, TEST_IDS } from '../../src/components/Auth/Login';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
describe('Login Component', () => {
  afterEach(cleanup);
  it('shows logout button when logged in', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Login authenticated />
      </ThemeProvider>,
    );
    const Button = getByTestId(TEST_IDS.logout);

    expect(Button).toBeInTheDocument();
  });

  it('shows login button when logged out', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Login authenticated={false} />
      </ThemeProvider>,
    );
    const Button = getByTestId(TEST_IDS.login);

    expect(Button).toBeInTheDocument();
  });
});
