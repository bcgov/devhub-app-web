// notes to self, maybe i should create a resolver to resolve things like navigation
// for a topic this would combine all nodes for siphon (web types) and github raw



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
import Actions from '../components/GithubTemplate/Actions/Actions';
import withNode from '../hoc/withNode';
import { Main, SideDrawerToggleButton, SidePanel } from '../components/GithubTemplate/common';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { RESOURCE_TYPES } from '../constants/ui';
import { TOPICS } from '../constants/topics';

class SourceGithubMarkdownDefault extends React.Component {
  state = {
    sideDrawerToggled: false,
  };

  toggleMenu = toggled => this.setState({ sideDrawerToggled: toggled });

  render() {
    const {
      data: { githubRaw, nav, topic, communityEvents },
      location,
    } = this.props;
    // bind the devhub siphon data to the preview node
    const previewWithNode = withNode(githubRaw)(ComponentPreview);

    const renderAst = new rehypeReact({
      createElement: React.createElement,
      components: { 'component-preview': previewWithNode },
    }).Compiler;
    let navigationItems = nav.items;

    if (topic.name === TOPICS.COMMUNITY_AND_EVENTS) {
      const eventbriteNavItems = flattenGatsbyGraphQL(communityEvents.edges);
      const currentEvents = eventbriteNavItems
        .filter(e => e.start.daysFromNow <= 0)
        .map(event => ({
          unfurl: {
            title: event.name.text,
          },
          resource: {
            path: event.url,
            type: RESOURCE_TYPES.EVENTS,
          },
        }));
      navigationItems = navigationItems.concat(currentEvents);
    }

    const navigation = <Navigation items={navigationItems} />;

    const [ owner, repo ] = githubRaw.html_url.replace('https://github.com/', '').split('/');
    const { title } = githubRaw.fields;
    const  originalSource  = githubRaw.html_url;
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
              {renderAst(githubRaw.childMarkdownRemark.htmlAst)}
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
  query devhubSiphonMarkdownDefault($id: String!, $topicId: String!) {
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
    communityEvents: allEventbriteEvents(
      sort: { fields: [start___local], order: ASC }
      filter: { shareable: { eq: true } }
    ) {
      edges {
        node {
          id
          name {
            text
          }
          url
          start {
            day: local(formatString: "DD")
            month: local(formatString: "MMM")
            year: local(formatString: "YYYY")
            daysFromNow: local(difference: "days")
          }
        }
      }
    }
  }
`;

export default SourceGithubMarkdownDefault;
