/*
Copyright 2018 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from '../../theme';
import Hamburger, { TEST_IDS } from '../../src/components/UI/Hamburger/Hamburger';

describe('Hamburger Component', () => {
  const props = {
    clicked: jest.fn(),
    className: 'foo',
  };

  test('it matches snapshot', () => {
    const { container, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Hamburger {...props} />
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
    const hamburger = getByTestId(TEST_IDS.hamburger);
    fireEvent.click(hamburger);
    expect(props.clicked).toHaveBeenCalled();
  });
});
