//
// Dev Hub
//
// Copyright © 2019 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

import React from 'react';
import styled from '@emotion/styled';

import Layout from '../hoc/Layout';

const Article = styled.article`
  padding: 40px;
  max-width: 880px;
  code {
    font-size: inherit;
  }
  blockquote {
    padding: 8px;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 15px;
    text-style: oblique;
  }
`;

const TemplatePlaceholder = ({ location: { pathname } }) => (
  <Layout>
    <Article>
      <h1>This page has been replaced by a temporary placeholder.</h1>
      <p>
        For development purposes the page found at {pathname} was not loaded. This message, ofcourse
        should only be visible in development mode. If you are seeing this message under the URL
        <b> https://developer.gov.bc.ca</b> then{' '}
        <strong>there is a problem that needs attention!</strong>
      </p>
      <hr />
      <p>
        If you are in development mode and are expecting to see a page at {pathname} then this means
        something in the gatsby config is not set up correctly. Most likely you are missing or have
        an invalid api key to one of the many gatsby source plugins the Devhub utilizes
      </p>
      <h2>What's going on?</h2>
      <p>
        There are a couple of processes that have been kicked off to make this page visible. <br />
        There are two <code>event</code> templates that exist within the project. One of these is
        the actual events page and the other one ofcourse, is this page.
      </p>
      <p>
        On build time, we check to see if the appropriate credentials are avaialble for running the
        events page. When they are not available, the <code>createPages</code> function found at{' '}
        <code>/gatsby/createPages.js </code>
        redirects the page create function to point to this placeholder template.
      </p>
      <p>
        In addition, the <code>sourceNodes</code> api is also run on every build and adds filler{' '}
        <b>EventbriteEvent</b> and <b>MeetupEvent</b> graph ql nodes to prevent failure of the app
        if the relevant Eventbrite and Meetup credentials are not available. Although the{' '}
        <i>events</i> template is not used to build a page, it is still evaluated by gatsby as
        described by
        <a href="https://github.com/bcgov/devhub-app-web/issues/604"> this Github issue</a>.
      </p>
      <h2>Why all this trouble?</h2>
      <p>
        The Events feature has some quirks on how data is loaded, these quirks make it difficult to
        share this feature from workstation to workstation. To circumvent this, a 'placeholder' was
        introduced to allow the app to run without the feature.
      </p>
      <blockquote>
        If you have any questions please feel free to{' '}
        <a href="https://github.com/bcgov/devhub-app-web/issues/new/choose">
          {' '}
          raise a general issue.
        </a>
      </blockquote>
    </Article>
  </Layout>
);

export default TemplatePlaceholder;
