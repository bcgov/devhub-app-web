import React, { PureComponent } from 'react';
import { graphql } from 'gatsby';
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { REACT_SCROLL } from '../constants/ui';

import * as actions from '../store/actions';

import styles from './index.module.css';
// components
import { Container } from 'reactstrap';
import { Flag } from 'flag';
import { Element } from 'react-scroll';
import Loading from '../components/UI/Loading/Loading';
import Layout from '../hoc/Layout';
import Cards from '../components/Cards/Cards';
import Masthead from '../components/Home/Masthead';

// selectors from reselect
import {
  selectFilters,
  selectQuery,
  selectSearchResultsLength,
  selectTotalResources,
  selectSearchWordLength,
  selectResourcesLoaded,
  selectResourcesReducerLoading,
  selectAvailableResources,
  selectGroupedFilteredAvailableResources,
} from '../store/selectors';

import { SEARCH } from '../messages';
import ResourcePreview from '../components/ResourcePreview/ResourcePreview';

export class Index extends PureComponent {
  componentDidMount() {
    // flatted nodes from graphql
    if (!this.props.resourcesLoaded) {
      const resources = this.props.data.allDevhubSiphon.edges.map(node => node.node);
      this.props.loadResources(resources);
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
      resourcesByType,
      searchResultsLength,
      totalResources,
      setSearchBarTerms,
      searchWordLength,
      query,
    } = this.props;
    // const groupedByResourceTypee =
    const SiphonResources = Object.keys(resourcesByType).map(resourceType => {
      const resources = resourcesByType[resourceType].map(r => ({
        type: r.resource.type,
        title: r.unfurl.title,
        description: r.unfurl.description,
        image: r.unfurl.image,
        path: r.resource.path,
      }));
      return <Cards key={shortid.generate()} topic={resourceType} cards={resources} />;
    });
    return (
      <Layout showHamburger>
        <div>
          <Masthead
            searchCount={searchResultsLength}
            totalNodeCount={totalResources}
            setSearchBarTerms={setSearchBarTerms} // keywords i search bar
            searchWordLength={searchWordLength}
            query={query} // value from query string
          />
          <Container fluid>
            <main role="main" className={styles.Main}>
              {this.props.loading ? (
                <Loading message="Loading..." />
              ) : searchResultsLength === 0 && searchWordLength > 0 ? (
                <p>{SEARCH.results.empty.defaultMessage}</p>
              ) : (
                <Element name={REACT_SCROLL.ELEMENTS.CARDS_CONTAINER}>
                  {/* Element used for react-scroll targeting */}
                  <Flag name="features.githubResourceCards">{SiphonResources}</Flag>
                </Element>
              )}
            </main>
          </Container>
        </div>
      </Layout>
    );
  }
}

export const resourceQuery = graphql`
  query resourceQuery {
    allDevhubSiphon {
      edges {
        node {
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
`;

const mapStateToProps = createStructuredSelector({
  resourcesLoaded: selectResourcesLoaded,
  query: selectQuery,
  loading: selectResourcesReducerLoading,
  searchResultsLength: selectSearchResultsLength,
  totalResources: selectTotalResources,
  searchWordLength: selectSearchWordLength,
  resourcesByType: selectGroupedFilteredAvailableResources,
});

const mapDispatchToProps = dispatch => {
  return {
    loadResources: resources => dispatch(actions.loadResources(resources)),
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
