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
/*
  These are set of jest utilities/helpers for unit testing. Ideally, there would be 
  npm packages that jest can straight plugin too. These helpers are interim solutions while
  said 'plugins' build solutions for the problems these helpers address
*/

// providing emotion themes to styled components
// credit too https://github.com/styled-components/styled-components/issues/1319#issuecomment-345989894
import React from 'react';
import { shallow, mount } from 'enzyme';
import { render } from 'react-testing-library';
import { ThemeProvider } from 'emotion-theming';
import theme from '../theme';

export function wrapWithTheme(fn, children, options) {
  const wrapper = fn(<ThemeProvider theme={theme}>{children}</ThemeProvider>, options);
  return wrapper;
}

/**
 * wraps the component being testing with the emotion theme provider
 * using the react-testing-library render fn
 */
export function renderWithTheme() {
  return wrapWithTheme(render, ...arguments);
}

/**
 * wraps the component being testing with the emotion theme provider
 * using the enzyme shallow fn
 */
export function shallowWithTheme() {
  return wrapWithTheme(shallow, ...arguments);
}

/**
 * wraps the component being testing with the emotion theme provider
 * using the enzyme mount fn
 */
export function mountWithTheme() {
  return wrapWithTheme(mount, ...arguments);
}
