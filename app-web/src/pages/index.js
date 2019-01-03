import React, { Component } from 'react';
import { graphql } from 'gatsby';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { Flag } from 'flag';

import * as actions from '../store/actions/actions';
import { groupBy } from '../utils/dataMassager';
import { REACT_SCROLL } from '../constants/ui';

import styles from './index.module.css';
// components
import { Element } from 'react-scroll';
import Layout from '../hoc/Layout';
import FilterMenu from '../components/FilterMenu/FilterMenu';
import Cards from '../components/Cards/Cards';
import WelcomePanel from '../components/WelcomePanel/WelcomePanel';
import Sidebar from '../components/Sidebar/Sidebar';

export class Index extends Component {
  componentDidMount() {
    // flatted nodes from graphql
    const nodes = this.props.data.allDevhubSiphon.edges.map(n => n.node);
    this.props.loadSiphonNodes(nodes);
  }

  componentWillUnmount() {
    this.props.hideWelcomeMessage();
  }

  render() {
    const { nodes, toggleMenu, filters } = this.props;
    let mappedSiphonNodes = [];
    if (nodes && nodes.length) {
      mappedSiphonNodes = nodes
        .filter(node => node.childMarkdownRemark && !node.childMarkdownRemark.frontmatter.pageOnly)
        .map(node => ({
          ...node.unfurl,
          resourcePath: node.resource.path,
          collectionName: node.collection.name,
          sourcePath: node.source.sourcePath,
          resourceType: node.resource.type,
          owner: node.owner,
          repository: node.source.name,
        }));
    }
    // group nodes into collections for display purposes
    const groupedSiphonData = groupBy(mappedSiphonNodes, 'collectionName');
    // convert grouped data into their 'collected' cards containers
    const SiphonResources = groupedSiphonData.map(ghData => (
      <Cards key={shortid.generate()} topic={ghData.collectionName} cards={ghData.data} />
    ));
    // group filter groups by there title
    let groupedFilters = groupBy(filters, 'title');
    // map the data property that is created from groupBy to filters which is needed
    // for the FilterGroup component within Secondary Filter
    groupedFilters = groupedFilters.map(fg => ({ ...fg, filters: fg.data }));

    return (
      <Layout showHamburger hamburgerClicked={toggleMenu}>
        <main role="main" className={[styles.Main, 'container'].join(' ')}>
          <WelcomePanel />
          <FilterMenu filterGroups={groupedFilters} />
          {/* Element used for react-scroll targeting */}
          <Element name={REACT_SCROLL.ELEMENTS.CARDS_CONTAINER}>
            <div className={styles.ListContainer}>
              <Sidebar filterGroups={groupedFilters} />
              <div className={styles.CardContainer}>
                <Flag name="features.githubResourceCards">{SiphonResources}</Flag>
              </div>
            </div>
          </Element>
        </main>
      </Layout>
    );
  }
}

export const resourceQuery = graphql`
  query resourceQuery {
    allDevhubSiphon(filter: { internal: { mediaType: { eq: "text/markdown" } } }) {
      edges {
        node {
          id
          attributes {
            persona
          }
          collection {
            name
            type
          }
          source {
            displayName
            sourcePath
            type
            name
          }
          owner
          resource {
            path
            type
          }
          unfurl {
            title
            description
            type
            image
            author
          }
          childMarkdownRemark {
            frontmatter {
              pageOnly
            }
          }
        }
      }
    }
  }
`;

const mapStateToProps = state => {
  return {
    nodes: state.siphon.secondaryFilteredNodes,
    filters: state.siphon.filters,
    displayWelcome: !state.ui.welcomePanelWasViewed,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadSiphonNodes: nodes => dispatch(actions.loadSiphonNodes(nodes)),
    toggleMenu: () => dispatch(actions.toggleMainNavigation()),
    hideWelcomeMessage: () => dispatch(actions.setWelcomePanelViewed(true)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
