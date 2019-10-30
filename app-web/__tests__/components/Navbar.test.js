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
import { render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import { Navbar } from '../../src/components/Navbar/Navbar';
import { MAIN_NAV_ROUTE_LIST } from '../../src/constants/routes';

describe('Primary Filter Component', () => {
  const props = {
    authenticated: false,
    implicitAuthManager: {
      getSSOLoginURI: jest.fn(),
      getSSOLogoutURI: jest.fn(),
    },
    toggled: false,
    links: MAIN_NAV_ROUTE_LIST,
  };

  test('it matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Navbar {...props} />
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
