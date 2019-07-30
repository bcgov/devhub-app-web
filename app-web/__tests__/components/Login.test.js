import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';
import { Login, TEST_IDS } from '../../src/components/Auth/Login';

describe('Login Component', () => {
  afterEach(cleanup);
  it('shows logout button when logged in', () => {
    const { getByTestId } = render(<Login authenticated />);
    const Button = getByTestId(TEST_IDS.logout);

    expect(Button).toBeInTheDocument();
  });

  it('shows login button when logged out', () => {
    const { getByTestId } = render(<Login authenticated={false} />);
    const Button = getByTestId(TEST_IDS.login);

    expect(Button).toBeInTheDocument();
  });
});
