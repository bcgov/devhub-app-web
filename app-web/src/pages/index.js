import React, { Component } from 'react';
import { graphql } from 'gatsby';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { Flag } from 'flag';

import * as actions from '../store/actions/actions';
import { groupBy } from '../utils/dataMassager';
import { REACT_SCROLL, SIPHON_RESOURCE_TYPE_PROP } from '../constants/ui';
import FLAGS from '../constants/featureflags';

import styles from './index.module.css';
// components
import { Element } from 'react-scroll';
import Layout from '../hoc/Layout';
import Cards from '../components/Cards/Cards';
import Sidebar from '../components/Sidebar/Sidebar';
import FilterMenu from '../components/FilterMenu/FilterMenu';
import WelcomePanel from '../components/WelcomePanel/WelcomePanel';
import PrimaryFilter from '../components/Navigation/PrimaryFilter';
import Dropmenu from '../components/Dropmenu/Dropmenu';

export class Index extends Component {
  componentDidMount() {
    // flatted nodes from graphql
    if (!this.props.collectionsLoaded) {
      const collections = this.props.data.allDevhubSiphonCollection.edges.map(c => c.node);
      this.props.loadCollections(collections);
    }
    this.props.filterCollectionsByResourceType();
  }

  componentWillUnmount() {
    this.props.hideWelcomeMessage();
  }

  render() {
    const { collections, toggleMenu, filters } = this.props;

    const SiphonResources = collections.map(collection => (
      <Cards
        key={shortid.generate()}
        topic={collection.name}
        description={collection.description}
        cards={collection.nodes}
      />
    ));

    // group filter groups by there title
    let groupedFilters = groupBy(filters, 'title');
    // map the data property that is created from groupBy to filters which is needed
    // for the FilterGroup component within Secondary Filter
    groupedFilters = groupedFilters.map(fg => ({ ...fg, filters: fg.data }));

    return (
      <Layout showHamburger hamburgerClicked={toggleMenu}>
        <Flag name={`features.${FLAGS.SOURCE_FILTERING}`}>
          <PrimaryFilter />
        </Flag>
        {/* hamburger icon controlled menu */}
        <Dropmenu menuToggled />
        <div className={[styles.MainContainer, 'container'].join(' ')}>
          <Sidebar filterGroups={groupedFilters} />
          <div>
            <WelcomePanel />
            <FilterMenu filterGroups={groupedFilters} />
            <main role="main" className={styles.Main}>
              {/* Element used for react-scroll targeting */}
              <Element name={REACT_SCROLL.ELEMENTS.CARDS_CONTAINER}>
                <div className={styles.CardContainer}>
                  <Flag name="features.githubResourceCards">{SiphonResources}</Flag>
                </div>
              </Element>
            </main>
          </div>
        </div>
      </Layout>
    );
  }
}

export const resourceQuery = graphql`
  query resourceQuery {
    allDevhubSiphonCollection(sort: { fields: [_metadata___position] }) {
      edges {
        node {
          id
          name
          description
          nodes: childrenDevhubSiphon {
            id
            name
            owner
            parent {
              id
            }
            _metadata {
              position
            }
            attributes {
              personas
            }
            source {
              displayName
              sourcePath
              type
              name
            }
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
  }
`;

const mapStateToProps = state => {
  return {
    collections: state.siphon.filteredCollections,
    collectionsLoaded: state.siphon.collectionsLoaded,
    displayWelcome: !state.ui.welcomePanelWasViewed,
    filters: state.siphon.filters,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCollections: collections => dispatch(actions.loadSiphonCollections(collections)),
    filterCollectionsByResourceType: () =>
      dispatch(actions.filterSiphonNodes(SIPHON_RESOURCE_TYPE_PROP, 'All')),
    hideWelcomeMessage: () => dispatch(actions.setWelcomePanelViewed(true)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
