//
// Dev Hub
//
// Copyright © 2018 Province of British Columbia
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
// Created by Patrick Simonian on 2018-10-12.
//
import React from 'react';
import { graphql } from 'gatsby';
import GithubTemplateLayout from '../hoc/GithubTemplateLayout';
import 'github-markdown-css';
import styles from './SourceMarkdown.module.css';
// eslint-disable-next-line
const SourceGithubMarkdownDefault = ({ data: { devhubSiphon, nav }, location: pathname }) => (
  <GithubTemplateLayout siphonData={devhubSiphon} nav={nav} pathname={pathname}>
    <div
      className={[styles.MarkdownBody, 'markdown-body'].join(' ')}
      dangerouslySetInnerHTML={{
        __html: devhubSiphon.childMarkdownRemark.html,
      }}
    />
  </GithubTemplateLayout>
);

export const devhubSiphonMarkdown = graphql`
  query devhubSiphonMarkdownDefault($id: String!, $collection: String!) {
    devhubSiphon(id: { eq: $id }) {
      name
      id
      childMarkdownRemark {
        frontmatter {
          title
        }
        html
      }
      source {
        name
        displayName
        sourcePath
        type
      }
      resource {
        originalSource
      }
      owner
      fileName
      fileType
      path
    }
    nav: allDevhubSiphon(
      filter: {
        collection: { name: { eq: $collection } }
        internal: { mediaType: { eq: "text/markdown" } }
      }
      sort: { fields: [_metadata___position] }
    ) {
      edges {
        node {
          ...NavigationFragment
        }
      }
    }
  }
`;

export default SourceGithubMarkdownDefault;
