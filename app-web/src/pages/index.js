import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { createStructuredSelector } from 'reselect';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { Flag } from 'flag';
import queryString from 'query-string';
import * as actions from '../store/actions/actions';
import { REACT_SCROLL } from '../constants/ui';
import FLAGS from '../constants/featureflags';

import styles from './index.module.css';
// components
import { Element } from 'react-scroll';
import Title from '../components/Page/Title';
import Loading from '../components/UI/Loading/Loading';
import Layout from '../hoc/Layout';
import Cards from '../components/Cards/Cards';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import Dropmenu from '../components/Dropmenu/Dropmenu';
import ToolsMenu from '../components/ToolsMenu/ToolsMenu';

// localizations
import { HOME } from '../messages';
// selectors from reselect
import {
  selectFilteredCollections,
  selectFilters,
  selectCollectionsLoaded,
  selectQuery,
  selectSiphonReducerLoading,
  selectSearchResultsLength,
  selectTotalResources,
  selectSearchWordLength,
} from '../store/selectors';

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
          this.props.setSearchResults(results);
        });
      }
    }
  }

  componentWillUnmount() {
    // unset set all search properties so that when this page is navigated back to, it looks like a fresh
    // page
    this.props.resetSearch();
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
      query,
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
          <Navbar />
        </Flag>
        {/* hamburger icon controlled menu */}
        <Dropmenu menuToggled />
        <div className={[styles.MainContainer, 'container'].join(' ')}>
          <Title
            title={HOME.header.title.defaultMessage}
            subtitle={HOME.header.subtitle.defaultMessage}
          />
          <Sidebar filters={filters} />
          <div className={styles.Right}>
            <ToolsMenu
              filters={filters}
              searchCount={searchResultsLength}
              totalNodeCount={totalResources}
              setSearchBarTerms={setSearchBarTerms} // keywords i search bar
              searchWordLength={searchWordLength}
              query={query} // value from query string
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

const mapStateToProps = createStructuredSelector({
  collections: selectFilteredCollections,
  collectionsLoaded: selectCollectionsLoaded,
  query: selectQuery,
  filters: selectFilters,
  loading: selectSiphonReducerLoading,
  searchResultsLength: selectSearchResultsLength,
  totalResources: selectTotalResources,
  searchWordLength: selectSearchWordLength,
});

const mapDispatchToProps = dispatch => {
  return {
    loadCollections: collections => dispatch(actions.loadSiphonCollections(collections)),
    setSearchResults: results => dispatch(actions.setSearchResults(results)),
    setSearchQuery: query => dispatch(actions.setSearchQuery(query)),
    setSearchBarTerms: resourceType => dispatch(actions.setSearchBarTerms(resourceType)),
    resetSearch: () => dispatch(actions.resetSearch()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
