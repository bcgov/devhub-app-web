import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Search, TEST_IDS } from '../../src/components/Search';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';

describe('Search Bar', () => {
  const keyupHandled = jest.fn();
  const search = jest.fn();
  const terms = '';
  const sampleText = 'foo';
  const inputConfig = {
    name: 'bar',
    id: 'baz',
  };

  beforeEach(() => {
    search.mockClear();
  });
  afterEach(cleanup);

  it('matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Search onkeyup={keyupHandled} onSearch={search} terms={terms} inputConfig={inputConfig} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls the search handler when button is clicked and terms have length', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <Search onkeyup={keyupHandled} onSearch={search} terms={terms} inputConfig={inputConfig} />
      </ThemeProvider>,
    );

    const button = queryByTestId(TEST_IDS.button);
    fireEvent.click(button);
    expect(search).toHaveBeenCalled();
  });

  it('doesn not call the search handle if the enter key is pressed with searchOnEnter = false', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <Search
          onkeyup={keyupHandled}
          onSearch={search}
          terms={terms}
          inputConfig={inputConfig}
          searchOnEnter={false}
        />
      </ThemeProvider>,
    );

    let input = queryByTestId(TEST_IDS.input);
    // change text of input field
    fireEvent.change(input, { target: { value: sampleText } });
    // hit enter key
    // setting charcode to address known issue where keyPress event is not actually being fired
    // https://github.com/testing-library/@testing-library/react/issues/269#issuecomment-455854112
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

    expect(search).not.toHaveBeenCalled();
  });

  it(`calls the search handler with ${sampleText} when that text is entered and the enter key is pressed`, () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <Search
          onkeyup={keyupHandled}
          onSearch={search}
          terms={terms}
          inputConfig={inputConfig}
          searchOnEnter={true}
        />
      </ThemeProvider>,
    );

    let input = queryByTestId(TEST_IDS.input);
    // change text of input field
    fireEvent.change(input, { target: { value: sampleText } });
    // hit enter key
    // setting charcode to address known issue where keyPress event is not actually being fired
    // https://github.com/testing-library/@testing-library/react/issues/269#issuecomment-455854112
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

    expect(search).toHaveBeenCalledWith(sampleText);
  });
});
