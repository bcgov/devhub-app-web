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
import Octokit from '@octokit/rest';

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
    const githubClient = new Octokit();

    try {
      const result = await githubClient.repos.getContents({
        owner: 'bcgov',
        repo: 'design-system',
        path: 'components/primary_button/sample.html',
        ref: 'feature/57-interactive-code-examples',
      });

      this.setState({
        isLoaded: true,
        sampleContent: result.data.content,
      });
    } catch (error) {
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
      return <div>Error {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <iframe
          title="Component Preview"
          src={'data:text/html;base64,' + sampleContent}
          frameBorder={'0'}
        />
      );
    }
  }
}
