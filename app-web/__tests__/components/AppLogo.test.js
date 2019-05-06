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
import { render } from 'react-testing-library';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import AppLogo from '../../src/components/UI/AppLogo/AppLogo';

describe('Applogo Component', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <AppLogo />
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
