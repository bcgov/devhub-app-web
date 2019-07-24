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
import React from 'react';
import PropTypes from 'prop-types';
import Octokit from '@octokit/rest';

export const TEST_IDS = {
  preview: 'test-component-preview',
  iframe: 'test-component-iframe',
};

export default class ComponentPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      sampleContent: '',
    };
  }

  async componentDidMount() {
    //pull in the values to retrieve to preview content from GitHub from props, if provided
    let {
      node: { html_url },
      auth,
      path,
    } = this.props;

    // html url comes in the format https://github.com/owner/repo/blob/branch/path
    // eslint-disable-next-line
    const [owner, repo, blob, branch] = html_url.replace('https://github.com/', '').split('/');

    const githubClient = Octokit({ auth });

    try {
      const result = await githubClient.repos.getContents({
        owner: owner,
        repo: repo,
        path: path,
        ref: branch,
      });

      this.setState({
        isLoaded: true,
        sampleContent: result.data.content,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error: ' + error);
      this.setState({
        isLoaded: true,
        error,
      });
    }
  }

  render() {
    const { error, isLoaded, sampleContent } = this.state;

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
          {...this.props}
        />
      );
    }
  }
}

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
