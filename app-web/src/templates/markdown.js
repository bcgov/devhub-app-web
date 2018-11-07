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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../hoc/Layout';
import styles from './markdown.module.css';
import { faGithub } from '@fortawesome/fontawesome-free-brands';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import Navigation from '../components/DesignSystem/Navigation';
// eslint-disable-next-line
const Generic = ({ data: { sourceDevhubGithub, nav }, location: pathname }) => {
  // eslint-disable-next-line
  return (
    <Layout>
      <div className={styles.DesignSystem}>
        <div className={styles.Panel}>
          <header className={styles.Header}>
            <h1>{sourceDevhubGithub.sourceName}</h1>
            <ul className={styles.SourceTags}>
              <li>
                <a href={sourceDevhubGithub.originalSource}>
                  <FontAwesomeIcon
                    icon={faGithub}
                    aria-label={`View the original source ${sourceDevhubGithub.fileName} on github`}
                  />
                </a>
              </li>
              <li>
                <a href={`${sourceDevhubGithub.sourcePath}fork`}>
                  <FontAwesomeIcon
                    icon={faCodeBranch}
                    aria-label={`Fork ${sourceDevhubGithub.sourceName} on github`}
                  />
                </a>
              </li>
            </ul>
          </header>
          <Navigation components={nav.edges} activeLink={pathname} />
        </div>
        <section className={styles.Content}>
          <div
            className={styles.MarkdownBody}
            dangerouslySetInnerHTML={{
              __html: sourceDevhubGithub.childMarkdownRemark.html,
            }}
          />
        </section>
      </div>
    </Layout>
  );
};
// eslint-disable-next-line
export const sourceDevhubGithub = graphql`
  query sourceDevhubGithub($id: String!, $source: String!) {
    sourceDevhubGithub(id: { eq: $id }) {
      name
      id
      childMarkdownRemark {
        frontmatter {
          title
        }
        html
      }
      originalSource
      source
      sourceName
      sourcePath
      owner
      fileName
      fileType
      path
    }
    nav: allSourceDevhubGithub(filter: { source: { eq: $source } }) {
      edges {
        node {
          ...NavigationFragment
        }
      }
    }
  }
`;

export default Generic;
