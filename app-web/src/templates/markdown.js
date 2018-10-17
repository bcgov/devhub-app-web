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
import GatsbyLink from '../components/Common/Link';
import Layout from '../hoc/Layout';
import styles from './markdown.module.css';
// eslint-disable-next-line
const Generic = ({ data: { sourceDevhubGithub } }) => {
  // eslint-disable-next-line
  return (
    <Layout>
      <header className={styles.Header}>
        <h1>{sourceDevhubGithub.sourceName}</h1>
        <div>
          <ul className={styles.List}>
            <li>Original Source: {sourceDevhubGithub.path}</li>
          </ul>
        </div>
      </header>
      <ul className={styles.Nav}>
        <li>
          <GatsbyLink to="/">Home</GatsbyLink>
        </li>
      </ul>
      <section
        className={styles.MarkdownBody}
        dangerouslySetInnerHTML={{
          __html: sourceDevhubGithub.childMarkdownRemark.html,
        }}
      />
    </Layout>
  );
};

export const sourceDevhubGithub = graphql`
  query sourceDevhubGithub($id: String!) {
    sourceDevhubGithub(id: { eq: $id }) {
      name
      id
      childMarkdownRemark {
        frontmatter {
          title
        }
        html
      }
      source
      sourceName
      owner
      fileName
      fileType
      path
    }
  }
`;

export default Generic;
