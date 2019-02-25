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

import rehypeReact from 'rehype-react';
import ComponentPreview from '../components/ComponentPreview/ComponentPreview';
import { RESOURCE_TYPES } from '../constants/ui';
import Layout from '../hoc/Layout';
import SidePanel from '../components/GithubTemplate/SidePanel/SidePanel';
import Masthead from '../components/GithubTemplate/Masthead/Masthead';
import SourceNavigation from '../components/GithubTemplate/SourceNavigation/SourceNavigation';
import withNode from '../hoc/withNode';

// eslint-disable-next-line
const SourceGithubMarkdownDefault = ({ data: { devhubSiphon, nav, collection}, location: pathname }) => {
  // bind the devhub siphon data to the preview node
  console.log(nav, collection);
  const previewWithNode = withNode(devhubSiphon)(ComponentPreview);

  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: { 'component-preview': previewWithNode },
  }).Compiler;

  return (
    <Layout>
      <div>
        <Masthead type={RESOURCE_TYPES.COLLECTIONS} title={devhubSiphon.source.displayName} />
        <main className={styles.Content}>
          <div className={[styles.MarkdownBody, 'markdown-body'].join(' ')}>
            {/* 
              if there is a tag in the markdown <component-preview> 
              the renderAst will drop in the rehype component
              otherwise if not tag exists it is biz as usual
            */}
            {renderAst(devhubSiphon.childMarkdownRemark.htmlAst)}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export const devhubSiphonMarkdown = graphql`
  query devhubSiphonMarkdownDefault($id: String!, $collectionId: String!) {
    devhubSiphon(id: { eq: $id }) {
      name
      id
      childMarkdownRemark {
        frontmatter {
          title
        }
        htmlAst
      }
      source {
        name
        displayName
        sourcePath
        type
        _properties {
          repo
          branch
          owner
        }
      }
      resource {
        originalSource
      }
      owner
      fileName
      fileType
      path
    }
    collection: devhubSiphonCollection(id: { eq: $collectionId }) {
      name
      description
    }
    nav: devhubSiphonCollection(id: { eq: $collectionId }) {
      childrenDevhubSiphon {
        ...NavigationFragment
      }
    }
  }
`;

export default SourceGithubMarkdownDefault;
