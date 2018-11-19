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
import TemplateLayout from '../hoc/TemplateLayout';
import styles from './SourceHTML.module.css';
// eslint-disable-next-line
const SourceHTML = ({ data: { devhubSiphon, nav }, location: pathname }) => (
  <TemplateLayout siphonData={devhubSiphon} nav={nav} pathname={pathname}>
    <div
      className={styles.HTMLBody}
      dangerouslySetInnerHTML={{
        __html: devhubSiphon.internal.content,
      }}
    />
  </TemplateLayout>
);

export const devhubSiphonHTML = graphql`
  query devhubSiphonHTML($id: String!, $source: String!) {
    devhubSiphon(id: { eq: $id }) {
      name
      id
      internal {
        content
      }
      originalSource
      source {
        name
        displayName
        sourcePath
      }
      owner
      fileName
      fileType
      path
    }
    nav: allDevhubSiphon(
      filter: { source: { name: { eq: $source } }, internal: { mediaType: { eq: "text/html" } } }
    ) {
      edges {
        node {
          ...NavigationFragment
        }
      }
    }
  }
`;

export default SourceHTML;
