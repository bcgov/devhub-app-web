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
import GatsbyLink from '../components/Common/Link';
import { HOME_ROUTE } from '../constants/routes';
import Layout from '../hoc/Layout';
import styles from './markdown.module.css';
import { faGithub } from '@fortawesome/fontawesome-free-brands';
// eslint-disable-next-line
const Generic = ({ data: { sourceDevhubGithub } }) => {
  // eslint-disable-next-line
  return (
    <Layout>
      <header className={styles.Header}>
        <h1>{sourceDevhubGithub.sourceName}</h1>
        <div>
          <ul className={styles.List}>
            <li>
              <a href={sourceDevhubGithub.originalSource}>
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
          </ul>
        </div>
      </header>
      <ul className={styles.Nav}>
        <li>
          <GatsbyLink to={HOME_ROUTE}>Home</GatsbyLink>
        </li>
      </ul>

      <section className={styles.Content}>
        <div className={styles.MarkdownBody}
        dangerouslySetInnerHTML={{
          __html: sourceDevhubGithub.childMarkdownRemark.html,
        }}/>
      </section>
    </Layout>
  );
};
// eslint-disable-next-line
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
      originalSource
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
