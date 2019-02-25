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
import 'github-markdown-css';
import styles from './SourceMarkdown.module.css';

import Layout from '../hoc/Layout';
import Overview from '../components/Collection/Overview';
import SidePanel from '../components/GithubTemplate/SidePanel/SidePanel';
import SourceNavigation from '../components/GithubTemplate/SourceNavigation/SourceNavigation';

const SourceGithubMarkdownOverview = ({
  data: { devhubSiphon, devhubSiphonCollection, nav },
  location: pathname,
}) => {
  const { description, name } = devhubSiphonCollection;

  return (
    <Layout siphonData={devhubSiphon} nav={nav} pathname={pathname}>
      <div className={styles.TemplateContainer}>
        <SidePanel links={nav.edges} pathname={pathname} siphonData={devhubSiphon}>
          <Overview title={name} description={description} />
          {nav.edges.length > 1 ? (
            <SourceNavigation components={nav.edges} activeLink={pathname} />
          ) : null}
        </SidePanel>
        <main className={styles.Content}>
          <div
            className={[styles.MarkdownBody, 'markdown-body'].join(' ')}
            dangerouslySetInnerHTML={{
              __html: devhubSiphon.childMarkdownRemark.html,
            }}
          />
        </main>
      </div>
    </Layout>
  );
};

export const devhubSiphonMarkdown = graphql`
  query devhubSiphonMarkdownOverview($id: String!, $collection: String!, $collectionId: String!) {
    devhubSiphonCollection(id: { eq: $collectionId }) {
      description
      name
    }
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
      filter: { collection: { name: { eq: $collection } } }
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

export default SourceGithubMarkdownOverview;
