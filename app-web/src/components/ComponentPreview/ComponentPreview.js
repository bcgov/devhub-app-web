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

    //pull in the values to retrieve to preview content from GitHub from props, if provided
    let { owner, repo, path, branch } = this.props;

    //allow for default values - relative to file that has embedded the component -  if values for props not provided
    owner =  owner || this.props.node.source._properties.owner;
    repo = repo || this.props.node.source._properties.repo;
    branch = branch || this.props.node.source._properties.branch || 'master';

    const githubClient = new Octokit();

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
