import React, { useState } from 'react';
import { navigate } from 'gatsby';
import queryString from 'query-string';
import rehypeReact from 'rehype-react';
import { isInteger } from 'lodash';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DYNAMIC_TOPIC_PATHS,
  POPULAR_TOPIC_CONFIGURATION,
  FEATURE_TOPIC_CONFIGURATION,
  FEATURED_CONTENT,
} from '../constants/ui';
import { buildPopularTopic, buildFeaturedTopic } from '../utils/helpers';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import Popular from '../components/TopicEntryPage/Popular';
import Featured from '../components/TopicEntryPage/Featured';
import ComponentPreview from '../components/ComponentPreview/ComponentPreview';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import withNode from '../hoc/withNode';
import Layout from '../hoc/Layout';
import Masthead from '../components/GithubTemplate/Masthead/Masthead';
import Navigation from '../components/GithubTemplate/Navigation/Navigation';
import Actions from '../components/GithubTemplate/Actions/Actions';
import {
  MarkdownBody,
  Main,
  SidePanel,
  SideDrawerToggleButton,
} from '../components/GithubTemplate/common';
import withResourceQuery from '../hoc/withResourceQuery';

export const TopicPage = ({ data, location, ...rest }) => {
  // props contains '*' as a property which matches our pageMatch property as assigned from
  // gatsby/onCreatePage.js
  // this would amount to /:topicType/:resource
  const [topicType, resource] = rest['*'].split('/');

  const [menuToggled, setMenuToggled] = useState(false);
  const entryPages = {
    [DYNAMIC_TOPIC_PATHS.featured]: <Featured />,
    [DYNAMIC_TOPIC_PATHS.popular]: <Popular />,
  };
  // navigate is not available at build timie, this page is a dynamic one so it willr esolve to navigate when a client
  // accesses this page
  const navigateFn = global.window ? navigate : () => null;
  const query = queryString.parse(location.search);
  const nodes = flattenGatsbyGraphQL(data.allGithubRaw.edges);
  // const [topic, topicType, resource] = location.pathname.replace(/^\/|\/$/, '').split('/');
  // // if ?viewResource=0 then auto navigate to the given resource with that index
  // // this is in place so that topic entry pages can provide a means to link to a given resource from within the topic
  const shouldAutoNavigate = query.viewResource && isInteger(query.viewResource / 1);
  //  removes the leading and trailing slash from the path name

  let navigationComponent = null;
  let resourceComponent = null;
  let topicMetadata = {};
  let topicObj = {};

  if (!DYNAMIC_TOPIC_PATHS[topicType]) {
    return navigateFn('404');
  }

  if (topicType === DYNAMIC_TOPIC_PATHS.popular) {
    topicObj = buildPopularTopic(
      nodes,
      POPULAR_TOPIC_CONFIGURATION.name,
      POPULAR_TOPIC_CONFIGURATION.description,
      DYNAMIC_TOPIC_PATHS.popular,
      POPULAR_TOPIC_CONFIGURATION.minPageViews,
      POPULAR_TOPIC_CONFIGURATION.maxNodes,
    );
  } else if (topicType === DYNAMIC_TOPIC_PATHS.featured) {
    topicObj = buildFeaturedTopic(
      nodes.concat(flattenGatsbyGraphQL(data.allDevhubSiphon.edges)),
      FEATURE_TOPIC_CONFIGURATION.name,
      FEATURE_TOPIC_CONFIGURATION.description,
      DYNAMIC_TOPIC_PATHS.featured,
      FEATURED_CONTENT,
    );
  } else {
    // there is no node for the resource path, redirect to 404
    navigateFn('404');
  }

  if (shouldAutoNavigate && topicObj.node.connectsWith[query.viewResource]) {
    const { viewResource, ...remainingParams } = query;
    navigateFn(
      `/topic/${topicType}/${
        topicObj.node.connectsWith[query.viewResource].fields.slug
      }?${queryString.stringify(remainingParams)}`,
    );
  }

  navigationComponent = <Navigation items={topicObj.node.connectsWith} />;

  topicMetadata = {
    name: topicObj.node.name,
    description: topicObj.node.description,
  };
  // if there is not resource path, then use the popular markdown file as the 'entry page'
  if (!resource) {
    resourceComponent = entryPages[topicType];
  } else {
    const node = topicObj.node.connectsWith.find(n => n.fields.slug === resource);

    if (node) {
      // bind the github raw data to the preview node
      const previewWithNode = withNode(node)(ComponentPreview);
      const renderAst = new rehypeReact({
        createElement: React.createElement,
        components: { 'component-preview': previewWithNode },
      }).Compiler;

      const [owner, repo] = node.html_url.replace('https://github.com/', '').split('/');

      resourceComponent = (
        <MarkdownBody>
          {' '}
          {/* 
            if there is a tag in the markdown <component-preview> 
            the renderAst will drop in the rehype component
            otherwise if not tag exists it is biz as usual
          */}
          {renderAst(node.childMarkdownRemark.htmlAst)}
          <Actions
            repo={repo}
            owner={owner}
            pageTitle={node.fields.title}
            originalSource={node.html_url}
            devhubPath={node.fields.slug}
          />
        </MarkdownBody>
      );
    } else {
      navigateFn('404');
    }
  }

  return (
    <Layout>
      <Masthead title={topicMetadata.name} description={topicMetadata.description} type="Topics" />
      <Main>
        <SidePanel>{navigationComponent}</SidePanel>
        <SideDrawerToggleButton onClick={() => setMenuToggled(true)}>
          <FontAwesomeIcon icon={faBars} style={{ color: '#026' }} />{' '}
          <span>{topicMetadata.name} Content</span>
        </SideDrawerToggleButton>
        {resourceComponent}
      </Main>
      <SideDrawer
        show={menuToggled}
        title={topicMetadata.name}
        addContent={true}
        closeDrawer={() => setMenuToggled(false)}
      >
        {navigationComponent}
      </SideDrawer>
    </Layout>
  );
};

export default withResourceQuery(TopicPage)();
