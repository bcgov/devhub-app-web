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

Created by Shea Phillips
*/
import React from 'react';

import { render } from '@testing-library/react';
import ComponentPreview from '../../src/components/ComponentPreview/ComponentPreview';

describe('ComponentPreview Component', () => {
  fetch.mockResponse({ content: `<div>hello world <button>click me</button></div>` });
  it('matches snapshot', () => {
    const props = {
      path: 'components/header/index.html',
      node: {
        source: {
          _properties: {
            branch: 'master',
            owner: 'bcgov',
            repo: 'devhub-app-web',
          },
        },
        html_url: 'https://github.com/bcgov/repo/blob/master/foo.md',
      },
    };
    const { container } = render(<ComponentPreview {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
