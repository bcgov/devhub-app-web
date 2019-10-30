import React from 'react';
import Pill, { TEST_IDS } from '../../src/components/UI/Pill';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
describe('Pill Component', () => {
  const props = {
    label: 'hello world',
    onClick: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    props.onClick.mockReset();
    props.onDelete.mockReset();
  });

  afterEach(cleanup);

  it('renders a pill', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Pill {...props} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('does not show font awesome icon if deletable is false', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <Pill {...props} deletable={false} />
      </ThemeProvider>,
    );
    expect(queryByTestId(TEST_IDS.pillIcon)).not.toBeInTheDocument();
  });

  it('calls onDelete if deletable and icon is clicked', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Pill {...props} />
      </ThemeProvider>,
    );
    const pillIcon = getByTestId(TEST_IDS.pillIcon);
    fireEvent.click(pillIcon);
    expect(props.onDelete).toHaveBeenCalledWith(props.label);
  });

  it('calls onClick when Pill is clicked and it exists in props', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Pill {...props} />
      </ThemeProvider>,
    );
    const pill = getByTestId(TEST_IDS.pill);
    fireEvent.click(pill);
    expect(props.onClick).toHaveBeenCalled();
  });

  it('does not call onClick when Pill is clicked and it does not exist in props', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Pill {...props} onClick={undefined} />
      </ThemeProvider>,
    );
    const pill = getByTestId(TEST_IDS.pill);
    fireEvent.click(pill);
    expect(props.onClick).not.toHaveBeenCalled();
  });
});
