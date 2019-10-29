import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SideDrawer, { TEST_IDS } from '../../src/components/SideDrawer/SideDrawer';

describe('Sidedrawer Page', () => {
  let title = 'Foo';
  let show = true;
  let closeDrawer = jest.fn();
  afterEach(cleanup);
  beforeEach(() => {
    closeDrawer.mockReset();
  });

  test('it matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <SideDrawer show={show} title={title} closeDrawer={closeDrawer} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('it calls drawer close fn when x button is clicked', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <SideDrawer show={show} title={title} closeDrawer={closeDrawer} />
      </ThemeProvider>,
    );

    const button = getByTestId(TEST_IDS.closeButton);

    fireEvent.click(button);
    expect(closeDrawer).toHaveBeenCalled();
  });

  test('it calls drawer close fn when backdrop is clicked', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <SideDrawer show={show} title={title} closeDrawer={closeDrawer} />
      </ThemeProvider>,
    );

    const backdrop = getByTestId(TEST_IDS.backdrop);

    fireEvent.click(backdrop);
    expect(closeDrawer).toHaveBeenCalled();
  });
});
