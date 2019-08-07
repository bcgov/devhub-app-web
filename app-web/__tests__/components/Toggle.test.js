import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import { shallow } from 'enzyme';
import Toggle, { TEST_IDS } from '../../src/components/Cards/Toggle';
import Button from '../../src/components/UI/Button/Button';
describe('Toggle Component', () => {
  afterEach(cleanup)
  it('matches snapshot', () => {
    const cardLimit = 1;
    const cards = ['card1', 'card2', 'card3'];
    const {container} = render(<ThemeProvider theme={theme}><Toggle cardComponents={cards} cardLimits={cardLimit} /></ThemeProvider>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('shows collapse button when toggled on', () => {
    const cardLimit = 1;
    const cards = ['card1', 'card2', 'card3'];
    const {getByTestId} = render(<ThemeProvider theme={theme}><Toggle cardComponents={cards} cardLimits={cardLimit} /></ThemeProvider>);
    const ToggleOnButton = getByTestId(TEST_IDS.toggleOn);
    // clicks button
    expect(ToggleOnButton).toBeInTheDocument();
    fireEvent.click(ToggleOnButton);
    
    const ToggleOffButton = getByTestId(TEST_IDS.toggleOff);
    expect(ToggleOffButton).toBeInTheDocument();
    
  });


  it('hides toggle button when number of cards is less than limit', () => {
    const cardLimit = 4;
    const cards = ['card1', 'card2', 'card3'];
    const {container, rerender} = render(<ThemeProvider theme={theme}><Toggle cardComponents={cards} cardLimits={cardLimit} /></ThemeProvider>);

    expect(container.querySelectorAll('button').length).toBe(0);
    rerender(<ThemeProvider theme={theme}><Toggle cardComponents={cards} cardLimits={1} /></ThemeProvider>);
    expect(container.querySelectorAll('button').length).toBeGreaterThan(0);

  });
});
