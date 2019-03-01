import React, { PureComponent } from 'react';
import { graphql } from 'gatsby';
import { createStructuredSelector } from 'reselect';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { RESOURCE_TYPES } from '../constants/ui';
import { flattenGatsbyGraphQL } from '../utils//dataHelpers';
import * as actions from '../store/actions';
import { COMPONENTS } from '../messages';
// components

import Loading from '../components/UI/Loading/Loading';
import Layout from '../hoc/Layout';
import Title from '../components/Page/Title';
import CardsContainer from '../components/Page/CardsContainer';
import PageContainer from '../components/Page/PageContainer';
import Main from '../components/Page/Main';
import FilterMenu from '../components/Page/FilterMenu';
import ResourcePreview from '../components/ResourcePreview/ResourcePreview';
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

export class Component extends PureComponent {
  state = {
    sideDrawerToggled: false,
  };

  toggleMenu = toggled => this.setState({ sideDrawerToggled: toggled });

  componentDidMount() {
    // flatted nodes from graphql
    if (!this.props.resourcesLoaded) {
      const resources = flattenGatsbyGraphQL(this.props.data.allDevhubSiphon.edges);
      this.props.loadResources(resources);
    }
    this.props.setResourceType(mapPagePathToResourceTypeConst(this.props.location.pathname));
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
    const { resourcesByType, searchResultsLength, setSearchBarTerms, filters, query } = this.props;

    const resources = resourcesByType[RESOURCE_TYPES.COMPONENTS].map(r => ({
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
            title={COMPONENTS.header.title.defaultMessage}
            subtitle={COMPONENTS.header.subtitle.defaultMessage}
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
          filters here
        </SideDrawer>
      </Layout>
    );
  }
}

export const resourceQuery2 = graphql`
  query resourceQuery2 {
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
    loadResources: resources => dispatch(actions.loadResources(resources)),
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
)(Component);
