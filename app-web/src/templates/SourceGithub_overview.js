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
import styles from './SourceMarkdown.module.css';
import rehypeReact from 'rehype-react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ComponentPreview from '../components/ComponentPreview/ComponentPreview';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import Layout from '../hoc/Layout';
import Masthead from '../components/GithubTemplate/Masthead/Masthead';
import Navigation from '../components/GithubTemplate/Navigation/Navigation';
import withNode from '../hoc/withNode';
import Actions from '../components/GithubTemplate/Actions/Actions';
import { Main, SideDrawerToggleButton, SidePanel } from '../components/GithubTemplate/common';

class SourceGithubMarkdownOverview extends React.Component {
  state = {
    sideDrawerToggled: false,
  };

  toggleMenu = toggled => this.setState({ sideDrawerToggled: toggled });

  render() {
    const {
      data: { devhubSiphon, nav, topic },
      location,
    } = this.props;
    // bind the devhub siphon data to the preview node
    const previewWithNode = withNode(devhubSiphon)(ComponentPreview);

    const renderAst = new rehypeReact({
      createElement: React.createElement,
      components: { 'component-preview': previewWithNode },
    }).Compiler;

    const navigation = <Navigation items={nav.items} />;
    const { repo, owner } = devhubSiphon.source._properties;
    const { title } = devhubSiphon.childMarkdownRemark.frontmatter;
    const { originalSource } = devhubSiphon.resource;
    const { href } = location;

    return (
      <Layout>
        <div>
          <Masthead type="Topics" title={topic.name} description={topic.description} />
          <Main>
            <SidePanel>{navigation}</SidePanel>
            <SideDrawerToggleButton onClick={() => this.toggleMenu(true)}>
              <FontAwesomeIcon icon={faBars} style={{ color: '#026' }} />{' '}
              <span>{topic.name} Content</span>
            </SideDrawerToggleButton>
            <div className={styles.MarkdownBody}>
              {/* 
              if there is a tag in the markdown <component-preview> 
              the renderAst will drop in the rehype component
              otherwise if not tag exists it is biz as usual
            */}
              {renderAst(devhubSiphon.childMarkdownRemark.htmlAst)}
              <Actions
                repo={repo}
                owner={owner}
                pageTitle={title}
                originalSource={originalSource}
                devhubPath={href}
              />
            </div>
          </Main>
        </div>
        <SideDrawer
          show={this.state.sideDrawerToggled}
          title={`${topic.name} Content`}
          closeDrawer={() => this.toggleMenu(false)}
        >
          {navigation}
        </SideDrawer>
      </Layout>
    );
  }
}

export const devhubSiphonMarkdown = graphql`
  query devhubSiphonMarkdownOverview($id: String!, $topicId: String!) {
    githubRaw(id: { eq: $id }) {
      name
      id
      html_url
      childMarkdownRemark {
        frontmatter {
          title
        }
        htmlAst
      }
      fields {
        title
        description
        pagePaths
      }
    }
    topic: devhubTopic(id: { eq: $topicId }) {
      name
      description
    }
    nav: devhubTopic(id: { eq: $topicId }) {
      items: connectsWith {
        ...DevhubNodeConnection
      }
    }
  }
`;

export default SourceGithubMarkdownOverview;
