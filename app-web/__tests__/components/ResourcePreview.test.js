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
import {
  ResourcePreview,
  handleFilterToggle,
  ALL_FILTER,
} from '../../src/components/Home/ResourcePreview';
import { SIPHON_NODES } from '../../__fixtures__/nodes';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';

describe('Resource Preview Component', () => {
  it('matches snapshot', () => {
    const props = {
      title: 'foo',
      link: {
        to: '/',
        text: 'bar',
      },
      resources: SIPHON_NODES,
      location: {
        search: '',
      },
      filters: [{ name: 'Foo' }, { name: 'Bar' }],
      amountToShow: 6,
    };
    const { container } = render(
      <ThemeProvider theme={theme}>
        <ResourcePreview {...props} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('handleFilterToggle', () => {
    it('it return [] if all is passed in', () => {
      const activeFilters = ['foo', 'bar'];
      expect(handleFilterToggle(ALL_FILTER, activeFilters)).toEqual([]);
    });

    it("it adds a filter if it doesn't exist in active list", () => {
      const activeFilters = ['foo', 'bar'];

      expect(handleFilterToggle('baz', activeFilters)).toEqual(['foo', 'bar', 'baz']);
    });

    it('it removes a filter if it does exist in active list', () => {
      const activeFilters = ['foo', 'bar'];

      expect(handleFilterToggle('bar', activeFilters)).toEqual(['foo']);
    });
  });
});
