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
// import 'github-markdown-css';
import styled from '@emotion/styled';
import styles from './SourceMarkdown.module.css';
import { RESOURCE_TYPES, EMOTION_BOOTSTRAP_BREAKPOINTS } from '../constants/ui';

import { withPadding } from '../components/GithubTemplate/common';
import rehypeReact from 'rehype-react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ComponentPreview from '../components/ComponentPreview/ComponentPreview';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import Layout from '../hoc/Layout';
import Masthead from '../components/GithubTemplate/Masthead/Masthead';
import Navigation from '../components/GithubTemplate/Navigation/Navigation';
import withNode from '../hoc/withNode';

const Main = styled.main`
  background-color: #fff;
  display: flex;
  max-width: 1200px;
  flex-direction: column;
  ${withPadding}
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.md} {
    flex-direction: row;
  }
`;

const SidePanel = styled.nav`
  flex-flow: column nowrap;
  flex: 0 0 250px;
  margin-right: 25px;
  display: none;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.md} {
    display: flex;
  }
`;

const SideDrawerToggleButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 10px 0;
  color: ${props => props.theme.primary};
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  text-align: left;
  :focus {
    outline: none;
  }
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.md} {
    display: none;
  }
`;

class SourceGithubMarkdownOverview extends React.Component {
  state = {
    sideDrawerToggled: false,
  };

  toggleMenu = toggled => this.setState({ sideDrawerToggled: toggled });

  render() {
    const {
      data: { devhubSiphon, nav, collection },
    } = this.props;
    // bind the devhub siphon data to the preview node
    const previewWithNode = withNode(devhubSiphon)(ComponentPreview);

    const renderAst = new rehypeReact({
      createElement: React.createElement,
      components: { 'component-preview': previewWithNode },
    }).Compiler;

    const navigation = <Navigation items={nav.items} />;
    return (
      <Layout>
        <div>
          <Masthead
            type={RESOURCE_TYPES.COLLECTIONS}
            title={collection.name}
            description={collection.description}
          />
          <Main>
            <SidePanel>{navigation}</SidePanel>
            <SideDrawerToggleButton onClick={() => this.toggleMenu(true)}>
              <FontAwesomeIcon icon={faBars} style={{ color: '#026' }} />{' '}
              <span>{collection.name} Content</span>
            </SideDrawerToggleButton>
            <div className={styles.MarkdownBody}>
              {/* 
              if there is a tag in the markdown <component-preview> 
              the renderAst will drop in the rehype component
              otherwise if not tag exists it is biz as usual
            */}
              {renderAst(devhubSiphon.childMarkdownRemark.htmlAst)}
            </div>
          </Main>
        </div>
        <SideDrawer
          show={this.state.sideDrawerToggled}
          title={`${collection.name} Content`}
          closeDrawer={() => this.toggleMenu(false)}
        >
          {navigation}
        </SideDrawer>
      </Layout>
    );
  }
}

export const devhubSiphonMarkdown = graphql`
  query devhubSiphonMarkdownOverview($id: String!, $collectionId: String!) {
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
      items: childrenDevhubSiphon {
        ...NavigationFragment
      }
    }
  }
`;

export default SourceGithubMarkdownOverview;
