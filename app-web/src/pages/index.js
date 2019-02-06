import React, { Component } from 'react';
import { graphql } from 'gatsby';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { Flag } from 'flag';
import queryString from 'query-string';
import * as actions from '../store/actions/actions';
import { REACT_SCROLL, SIPHON_RESOURCE_TYPE_PROP } from '../constants/ui';
import FLAGS from '../constants/featureflags';

import styles from './index.module.css';
// components
import { Element } from 'react-scroll';
import Loading from '../components/UI/Loading/Loading';
import Layout from '../hoc/Layout';
import Cards from '../components/Cards/Cards';
import Sidebar from '../components/Sidebar/Sidebar';
import WelcomePanel from '../components/WelcomePanel/WelcomePanel';
import PrimaryFilter from '../components/Navigation/PrimaryFilter';
import Dropmenu from '../components/Dropmenu/Dropmenu';
import ToolsMenu from '../components/ToolsMenu/ToolsMenu';

export class Index extends Component {
  componentDidMount() {
    // flatted nodes from graphql
    if (!this.props.collectionsLoaded) {
      const collections = this.props.data.allDevhubSiphonCollection.edges.map(c => c.node);
      this.props.loadCollections(collections);
    }
  }

  componentDidUpdate() {
    const query = queryString.parse(this.props.location.search);
    if (Object.prototype.hasOwnProperty.call(query, 'q')) {
      const param = decodeURIComponent(query.q);

      if (param !== this.props.query) {
        this.props.setSearchQuery(param);
        this.getSearchResults(param).then(results => {
          this.props.setSearchResults(results, param);
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.hideWelcomeMessage();
  }

  /**
   * gets search results from lunr
   * @param {String} query the search string
   */
  async getSearchResults(query) {
    const lunr = await window.__LUNR__.__loaded;
    const lunrIndex = lunr.en;
    let results = [];
    // attempt to search by parsing query into fields
    try {
      results = lunrIndex.index.search(query);
    } catch (e) {
      // if that fails treat query as plain text and attempt search again
      results = lunrIndex.index.query(function() {
        this.term(query);
      });
    }
    // search results is an array of reference keys
    // we need to map those to the index store to get the actual
    // node ids
    const searchResultsMap = results
      .map(({ ref }) => lunrIndex.store[ref])
      .reduce((obj, result) => {
        obj[result.id] = { ...result };
        return obj;
      }, {});

    return searchResultsMap;
  }

  render() {
    const {
      collections,
      toggleMenu,
      filters,
      searchResultsLength,
      totalResources,
      setSearchBarTerms,
      searchWordLength,
    } = this.props;

    const SiphonResources = collections.map(collection => (
      <Cards
        key={shortid.generate()}
        topic={collection.name}
        description={collection.description}
        cards={collection.nodes}
      />
    ));

    return (
      <Layout showHamburger hamburgerClicked={toggleMenu}>
        <Flag name={`features.${FLAGS.SOURCE_FILTERING}`}>
          <PrimaryFilter />
        </Flag>
        {/* hamburger icon controlled menu */}
        <Dropmenu menuToggled />
        <div className={[styles.MainContainer, 'container'].join(' ')}>
          <Sidebar filters={filters} />
          <div className={styles.Right}>
            <WelcomePanel />
            <ToolsMenu
              filters={filters}
              searchCount={searchResultsLength}
              totalNodeCount={totalResources}
              setSearchBarTerms={setSearchBarTerms}
              searchWordLength={searchWordLength}
            />
            <main role="main" className={styles.Main}>
              {/* Element used for react-scroll targeting */}
              {this.props.loading ? (
                <Loading message="Loading..." />
              ) : (
                <Element name={REACT_SCROLL.ELEMENTS.CARDS_CONTAINER}>
                  <div className={styles.CardContainer}>
                    <Flag name="features.githubResourceCards">{SiphonResources}</Flag>
                  </div>
                </Element>
              )}
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
    query: state.siphon.query,
    filters: state.siphon.filters,
    loading: state.siphon.loading,
    searchResultsLength: state.siphon.searchResultsLength,
    totalResources: state.siphon.totalResources,
    searchWordLength: state.siphon.searchBarTerms.length,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCollections: collections => dispatch(actions.loadSiphonCollections(collections)),
    setSearchResults: results => dispatch(actions.setSearchResults(results)),
    hideWelcomeMessage: () => dispatch(actions.setWelcomePanelViewed(true)),
    setSearchQuery: query => dispatch(actions.setSearchQuery(query)),
    setSearchBarTerms: resourceType => dispatch(actions.setSearchBarTerms(resourceType)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
