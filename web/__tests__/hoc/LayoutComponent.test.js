/*
Copyright 2019 Province of British Columbia

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
import 'jest-dom/extend-expect';
import { Layout } from '../../src/hoc/Layout';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import { TEST_IDS as HAMBURGER_TEST_IDS } from '../../src/components/UI/Hamburger/Hamburger';
import { TEST_IDS as NAVBAR_TEST_IDS } from '../../src/components/Navbar/Navbar';

describe('Layout Component', () => {
  it('can toggle a menu', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <Layout>test</Layout>
      </ThemeProvider>,
    );

    const Navbar = queryByTestId(NAVBAR_TEST_IDS.regular);
    let NavbarMobile = queryByTestId(NAVBAR_TEST_IDS.mobile);
    expect(Navbar).toBeInTheDocument();
    expect(NavbarMobile).not.toBeInTheDocument();
    // the hamburger menu triggers a state change that renders the second navbar (the mobile one)
    const Hamburger = queryByTestId(HAMBURGER_TEST_IDS.hamburger);

    fireEvent.click(Hamburger);
    NavbarMobile = queryByTestId(NAVBAR_TEST_IDS.mobile);
    expect(NavbarMobile).toBeInTheDocument();
  });
  // to do: debug why css serialization fails specifically for this and not others?
  test.skip('it matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Layout>test</Layout>
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
