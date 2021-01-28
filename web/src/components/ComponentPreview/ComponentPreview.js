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

Created by Shea Phillips
*/
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getGithubFileContents } from '../../utils/helpers';

export const TEST_IDS = {
  preview: 'test-component-preview',
  iframe: 'test-component-iframe',
};
export const ComponentPreview = props => {
  let [error, setError] = useState(null);
  let [isLoaded, setIsLoaded] = useState(false);
  let [sampleContent, setSampleContent] = useState('');
  const {
    node: { html_url },
    auth,
    path,
  } = props;

  useEffect(() => {
    var controller = new AbortController();
    var signal = controller.signal;
    // html url comes in the format https://github.com/owner/repo/blob/branch/path
    // eslint-disable-next-line
    const [owner, repo, blob, branch] = html_url.replace('https://github.com/', '').split('/');

    getGithubFileContents({ repo, owner, path, branch }, signal)
      .then(contents => {
        setIsLoaded(true);
        setSampleContent(contents);
      })
      .catch(e => {
        setError(e.message);
        // eslint-disable-next-line no-console
        console.error('Error loading component preview: ' + error);
      });

    return () => {
      setError(null);
      setIsLoaded(false);
      controller.abort();
    };
  }, [auth, error, html_url, path]);

  if (error) {
    return <span data-testid={TEST_IDS.preview}>Error {error.message}</span>;
  } else if (!isLoaded) {
    return <span data-testid={TEST_IDS.preview}>Loading...</span>;
  } else {
    return (
      <iframe
        title="Component Preview"
        data-testid={TEST_IDS.iframe}
        src={'data:text/html;base64,' + sampleContent}
        frameBorder={'0'}
        {...props}
      />
    );
  }
};

ComponentPreview.propTypes = {
  owner: PropTypes.string,
  repo: PropTypes.string,
  path: PropTypes.string,
  auth: PropTypes.string,
};

ComponentPreview.defaultProps = {
  branch: 'master',
  auth: '',
};

export default ComponentPreview;
