import React, { PureComponent } from 'react';
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { REACT_SCROLL } from '../constants/ui';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { getSearchResults } from '../utils/helpers';
import * as actions from '../store/actions';

import styles from './index.module.css';
// components
import { Flag } from 'flag';
import { Element } from 'react-scroll';
import Loading from '../components/UI/Loading/Loading';
import Layout from '../hoc/Layout';
import Cards from '../components/Cards/Cards';
import Masthead from '../components/Home/Masthead';

// selectors from reselect
import {
  selectQuery,
  selectSearchResultsLength,
  selectTotalResources,
  selectSearchWordLength,
  selectResourcesLoaded,
  selectResourcesReducerLoading,
  selectGroupedFilteredAvailableResources,
} from '../store/selectors';

import { SEARCH } from '../messages';
import withResourceQuery from '../hoc/withResourceQuery';

export class Index extends PureComponent {
  componentDidMount() {
    // flatted nodes from graphql
    if (!this.props.resourcesLoaded) {
      const collections = flattenGatsbyGraphQL(this.props.data.allDevhubSiphonCollection.edges);
      // note this.props.data is received from the withResourceQuery Component
      const resources = flattenGatsbyGraphQL(this.props.data.allDevhubSiphon.edges);
      this.props.loadResources(resources, collections);
    }
    // reset resource type to null since index page views all index pages
    this.props.setResourceType(null);
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
    return getSearchResults(query, lunr);
  }

  render() {
    const {
      resourcesByType,
      searchResultsLength,
      setSearchBarTerms,
      searchWordLength,
    } = this.props;

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
          <Masthead setSearchBarTerms={setSearchBarTerms} />
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
        </div>
      </Layout>
    );
  }
}

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
    loadResources: (resources, collections) =>
      dispatch(actions.loadResources(resources, collections)),
    setSearchResults: results => dispatch(actions.setSearchResults(results)),
    setSearchQuery: query => dispatch(actions.setSearchQuery(query)),
    setSearchBarTerms: resourceType => dispatch(actions.setSearchBarTerms(resourceType)),
    resetSearch: () => dispatch(actions.resetSearch()),
    setResourceType: type => dispatch(actions.setResourceType(type)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withResourceQuery(Index)());
