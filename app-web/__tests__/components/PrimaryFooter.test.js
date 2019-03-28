import React from 'react';
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect'; // extends jest expect api

import PrimaryFooter from '../../src/components/PrimaryFooter/PrimaryFooter';
import { wrapWithTheme } from '../helpers';
import { IDS } from '../../src/components/Disclaimer/Disclaimer';
// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Primary Footer Component', () => {
  // any warnings about styled/active link prop warnings are a non issue, it is because gatsby link is being mocked
  // to a regular anchor tag
  test('it renders and matches snapshot, when the Fair Use button is clicked it triggers the disclaimer', async () => {
    const { getByText, getByTestId, container } = wrapWithTheme(render, <PrimaryFooter />);
    const Disclaimer = await waitForElement(() => getByText('Fair Use'));
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(Disclaimer);

    const Modal = await waitForElement(() => getByTestId(IDS.body));
    expect(Modal).toHaveAttribute('open', true);
  });
});
