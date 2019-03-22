import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { Flag } from 'flag';

import { MAIN_NAV_ROUTES } from '../constants/routes';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { getSearchResults } from '../utils/search';
import * as actions from '../store/actions';
import { SEARCH } from '../messages';
// selectors from reselect
import {
  selectQuery,
  selectSearchResultsLength,
  selectTotalResources,
  selectResourcesLoaded,
  selectResourcesReducerLoading,
  selectGroupedFilteredAvailableResources,
  selectCollectionsWithAvailableResourcesGroupedByType,
  selectSearchResultsExist,
  selectTokenizedQuery,
} from '../store/selectors';

import Loading from '../components/UI/Loading/Loading';
import Layout from '../hoc/Layout';
import { ResourcePreview, Masthead, CollectionsContainer } from '../components/Home';
import withResourceQuery from '../hoc/withResourceQuery';
import Aux from '../hoc/auxillary';

import styles from './index.module.css';

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
      if (param !== this.props.query) {
        this.props.setSearchQuery(param);
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

  getResourcePreviews = () => {
    const { resourcesByType } = this.props;
    const siphonResources = Object.keys(resourcesByType).map(resourceType => {
      if (resourcesByType[resourceType].length > 0) {
        return (
          <ResourcePreview
            key={resourceType}
            title={resourceType}
            resources={resourcesByType[resourceType]}
            link={MAIN_NAV_ROUTES[resourceType]}
          />
        );
      }
      return null;
    });

    return siphonResources;
  };

  getCollectionPreviews = () => {
    const { collections, searchResultsExist } = this.props;
    // only show collections if there wasn't a search
    return (
      !searchResultsExist && (
        <CollectionsContainer collections={collections} link={MAIN_NAV_ROUTES.COLLECTIONS} />
      )
    );
  };

  render() {
    const { setSearchBarTerms, loading } = this.props;

    const siphonResources = this.getResourcePreviews();
    const resourcesNotFound = siphonResources.every(r => r === null);

    let content = null;

    if (loading) {
      content = <Loading message="Loading..." />;
    } else if (resourcesNotFound) {
      content = (
        <Alert style={{ margin: '10px auto' }} color="info">
          {SEARCH.results.empty.defaultMessage}
        </Alert>
      );
    } else {
      content = (
        <Aux>
          {this.getCollectionPreviews()}
          <Flag name="features.githubResourceCards">{siphonResources}</Flag>
        </Aux>
      );
    }

    return (
      <Layout showHamburger>
        <div>
          <Masthead setSearchBarTerms={setSearchBarTerms} query={query} />
          <main role="main" className={styles.Main}>
            {content}
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
    resetSearch: () => dispatch(actions.resetSearch()),
    setResourceType: type => dispatch(actions.setResourceType(type)),
  };
};

Index.propTypes = {
  loadResources: PropTypes.func.isRequired,
  setSearchResults: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  setResourceType: PropTypes.func.isRequired,
  resourcesLoaded: PropTypes.bool.isRequired,
  query: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  searchResultsLength: PropTypes.number.isRequired,
  totalResources: PropTypes.number.isRequired,
  resourcesByType: PropTypes.object.isRequired,
  collections: PropTypes.array.isRequired,
  searchResultsExist: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withResourceQuery(Index)());
