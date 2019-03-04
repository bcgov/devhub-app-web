import React, { PureComponent } from 'react';
import { graphql } from 'gatsby';
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { RESOURCE_TYPES } from '../constants/ui';
import { flattenGatsbyGraphQL } from '../utils//dataHelpers';
import { getSearchResults } from '../utils/helpers';
import * as actions from '../store/actions';
import { RESOURCE_TYPE_PAGES } from '../messages';
// components
import Filters from '../components/Filters/Filters';
import Layout from '../hoc/Layout';
import withResourceQuery from '../hoc/withResourceQuery';
import Title from '../components/Page/Title';
import CardsContainer from '../components/Page/CardsContainer';
import PageContainer from '../components/Page/PageContainer';
import Main from '../components/Page/Main';
import FilterMenu from '../components/Page/FilterMenu';
import SideDrawer from '../components/SideDrawer/SideDrawer';
// selectors from reselect
import {
  selectQuery,
  selectSearchResultsLength,
  selectTotalResources,
  selectSearchWordLength,
  selectResourcesLoaded,
  selectResourcesReducerLoading,
  selectGroupedFilteredAvailableResources,
  selectFilters,
} from '../store/selectors';

import { mapPagePathToResourceTypeConst } from '../utils/helpers';

export class ResourceType extends PureComponent {
  state = {
    sideDrawerToggled: false,
  };

  toggleMenu = toggled => this.setState({ sideDrawerToggled: toggled });

  componentDidMount() {
    // flatted nodes from graphql
    if (!this.props.resourcesLoaded) {
      const collections = flattenGatsbyGraphQL(this.props.data.allDevhubSiphonCollection.edges);
      // note this.props.data is received from the withResourceQuery Component
      const resources = flattenGatsbyGraphQL(this.props.data.allDevhubSiphon.edges);
      this.props.loadResources(resources, collections);
    }
    // page context comes from the dynamic create page routine. see gatsby/createPages.js
    // and https://www.gatsbyjs.org/docs/programmatically-create-pages-from-data/#programmatically-create-pages-from-data
    this.props.setResourceType(this.props.pageContext.resourceType);
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
      filters,
      query,
      pageContext, // received from gatsby create pages api, view gatsby/createPages.js for more info
    } = this.props;

    const resources = resourcesByType[RESOURCE_TYPES[pageContext.resourceTypeConst]].map(r => ({
      type: r.resource.type,
      title: r.unfurl.title,
      description: r.unfurl.description,
      image: r.unfurl.image,
      path: r.resource.path,
    }));

    return (
      <Layout showHamburger>
        <Main role="main">
          <Title
            title={RESOURCE_TYPE_PAGES[pageContext.resourceType].header.title.defaultMessage}
            subtitle={RESOURCE_TYPE_PAGES[pageContext.resourceType].header.subtitle.defaultMessage}
          />
          <PageContainer>
            <FilterMenu filters={filters} />
            <CardsContainer
              searchResultsEmpty={query !== null && searchResultsLength === 0}
              pagePath={this.props.location.pathname}
              resources={resources}
              setSearchBarTerms={setSearchBarTerms}
              openSideDrawer={() => this.toggleMenu(true)}
            />
          </PageContainer>
        </Main>
        <SideDrawer
          show={this.state.sideDrawerToggled}
          closeDrawer={() => this.toggleMenu(false)}
          title="Filters"
        >
          <Filters filters={filters} />
        </SideDrawer>
      </Layout>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  filters: selectFilters,
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
)(withResourceQuery(ResourceType)());
