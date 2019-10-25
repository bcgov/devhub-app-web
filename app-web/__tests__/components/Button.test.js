import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import Button, { TEST_IDS } from '../../src/components/UI/Button/Button';

describe('Button Component', () => {
  it('matches snapshot, when clicked it calls function', () => {
    const clickFn = jest.fn();
    const { container, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Button clicked={clickFn} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
    const button = getByTestId(TEST_IDS.button);
    fireEvent.click(button);

    expect(clickFn).toHaveBeenCalled();
  });
});
