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
import { render, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect';

import ComponentPreview, { TEST_IDS } from '../../src/components/ComponentPreview/ComponentPreview';

jest.unmock('@octokit/rest');

describe('ComponentPreview Component - Integation Tests', () => {
  it.skip('sets the preview template from github', async () => {
    const props = {
      owner: 'bcgov',
      repo: 'devhub-app-web',
      path: 'app-web/__fixtures__/index.html',
      branch: 'master',
      node: {
        source: {
          _properties: {
            branch: 'master',
            owner: 'bcgov',
            repo: 'devhub-app-web',
          },
        },
      },
    };
    const { queryByTestId } = render(<ComponentPreview {...props} />);
    let preview = queryByTestId(TEST_IDS.preview);
    // initially the preview is just a small loader
    expect(preview).toBeInTheDocument();
    // then an iframe is loaded when data is fetched
    let iframe = await waitForElement(() => queryByTestId(TEST_IDS.iframe));
    expect(iframe).toBeInTheDocument();
  });
});
