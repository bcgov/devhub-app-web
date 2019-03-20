import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { REACT_SCROLL } from '../constants/ui';
import { MAIN_NAV_ROUTES } from '../constants/routes';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { getSearchResults, tokenizer } from '../utils/search';
import * as actions from '../store/actions';

import styles from './index.module.css';
// components
import { Flag } from 'flag';
import { Element } from 'react-scroll';
import Loading from '../components/UI/Loading/Loading';
import Layout from '../hoc/Layout';
import { ResourcePreview, Masthead, CollectionsContainer } from '../components/Home';
import withResourceQuery from '../hoc/withResourceQuery';
import Aux from '../hoc/auxillary';

// selectors from reselect
import {
  selectQuery,
  selectSearchResultsLength,
  selectTotalResources,
  selectSearchWordLength,
  selectResourcesLoaded,
  selectResourcesReducerLoading,
  selectGroupedFilteredAvailableResources,
  selectCollectionsWithAvailableResourcesGroupedByType,
  selectSearchResultsExist,
  selectTokenizedQuery,
} from '../store/selectors';

import { SEARCH } from '../messages';

export class Index extends Component {
  componentDidMount() {
    // flatted nodes from graphql
    if (!this.props.resourcesLoaded) {
      const collections = flattenGatsbyGraphQL(this.props.data.allDevhubCollection.edges);
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
      const newTokens = tokenizer(param);
      const oldTokens = this.props.tokenizedQuery;
      // compare new tokens with old tokens
      if (!oldTokens || newTokens.join() !== oldTokens.join()) {
        this.props.setSearchQuery(param, newTokens);
        // returning so that we can test this function
        return getSearchResults(param).then(results => {
          this.props.setSearchResults(results);
        });
      }
    }
    return null;
  }

  componentWillUnmount() {
    // unset set all search properties so that when this page is navigated back to, it looks like a fresh
    // page
    this.props.resetSearch();
  }

  render() {
    const {
      resourcesByType,
      setSearchBarTerms,
      collections,
      loading,
      searchResultsExist,
      tokenizedQuery,
    } = this.props;

    const siphonResources = Object.keys(resourcesByType).map(resourceType => {
      if (resourcesByType[resourceType].length > 0) {
        return (
          <ResourcePreview
            key={shortid.generate()}
            title={resourceType}
            resources={resourcesByType[resourceType]}
            link={MAIN_NAV_ROUTES[resourceType]}
          />
        );
      }
      return null;
    });

    const resourcesNotFound = siphonResources.every(r => r === null);

    return (
      <Layout showHamburger>
        <div>
          <Masthead setSearchBarTerms={setSearchBarTerms} query={tokenizedQuery} />
          <main role="main" className={styles.Main}>
            {loading ? (
              <Loading message="Loading..." />
            ) : !searchResultsExist && resourcesNotFound ? (
              <Alert style={{ margin: '10px auto' }} color="info">
                {SEARCH.results.empty.defaultMessage}
              </Alert>
            ) : (
              <Aux>
                <CollectionsContainer
                  collections={collections}
                  link={MAIN_NAV_ROUTES.COLLECTIONS}
                />
                <Element name={REACT_SCROLL.ELEMENTS.CARDS_CONTAINER}>
                  {/* Element used for react-scroll targeting */}
                  <Flag name="features.githubResourceCards">{siphonResources}</Flag>
                </Element>
              </Aux>
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
  tokenizedQuery: selectTokenizedQuery,
  loading: selectResourcesReducerLoading,
  searchResultsLength: selectSearchResultsLength,
  totalResources: selectTotalResources,
  searchWordLength: selectSearchWordLength,
  resourcesByType: selectGroupedFilteredAvailableResources,
  collections: selectCollectionsWithAvailableResourcesGroupedByType,
  searchResultsExist: selectSearchResultsExist,
});

const mapDispatchToProps = dispatch => {
  return {
    loadResources: (resources, collections) =>
      dispatch(actions.loadResources(resources, collections)),
    setSearchResults: results => dispatch(actions.setSearchResults(results)),
    setSearchQuery: (query, tokenizedQuery) =>
      dispatch(actions.setSearchQuery(query, tokenizedQuery)),
    setSearchBarTerms: resourceType => dispatch(actions.setSearchBarTerms(resourceType)),
    resetSearch: () => dispatch(actions.resetSearch()),
    setResourceType: type => dispatch(actions.setResourceType(type)),
  };
};

Index.propTypes = {
  loadResources: PropTypes.func.isRequired,
  setSearchResults: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  setSearchBarTerms: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  setResourceType: PropTypes.func.isRequired,
  resourcesLoaded: PropTypes.bool.isRequired,
  query: PropTypes.string,
  tokenizedQuery: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool.isRequired,
  searchResultsLength: PropTypes.number.isRequired,
  totalResources: PropTypes.number.isRequired,
  searchWordLength: PropTypes.number.isRequired,
  resourcesByType: PropTypes.object.isRequired,
  collections: PropTypes.array.isRequired,
  searchResultsExist: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withResourceQuery(Index)());
