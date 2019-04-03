import React, { useState } from 'react';
import isNull from 'lodash/isNull';
import intersectionBy from 'lodash/intersectionBy';
import queryString from 'query-string';

import { RESOURCE_TYPES } from '../constants/ui';
import filters from '../constants/filterGroups';

import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
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
import NoResources from '../components/UI/NoResources/NoResources';
import Aux from '../hoc/auxillary';

// selectors from reselect
import { selectResourcesGroupedByType } from '../utils/selectors';
import { useSearch } from '../utils/hooks';
import { isQueryEmpty } from '../utils/search';

const resourcesSelector = selectResourcesGroupedByType();
const ResourceType = ({
  data: {
    allDevhubSiphon,
    siteSearchIndex: { index },
  },
  pageContext, // received from gatsby create pages api, view gatsby/createPages.js for more info
  location,
}) => {
  const [sideDrawerToggled, setSideDrawerToggled] = useState(false);
  const queryParam = queryString.parse(location.search);
  let query = [];
  let results = [];
  let windowHasQuery = Object.prototype.hasOwnProperty.call(queryParam, 'q');
  // if window has ?q= value
  if (windowHasQuery) {
    query = decodeURIComponent(queryParam.q);
    results = useSearch(query, index);
  }
  // this is defined by ?q='' or ?q=''&q=''..etc
  // if query is empty we prevent the search results empty from being rendered
  // in addition the collections container is prevented from not rendering because
  // the query is present
  const queryIsEmpty = isQueryEmpty(query);

  const resourceTypeConst = RESOURCE_TYPES[pageContext.resourceTypeConst];

  const resourcesByType = resourcesSelector(flattenGatsbyGraphQL(allDevhubSiphon.edges));
  // grab the specific resources by the resource type associated with this pages context
  let resources = resourcesByType[resourceTypeConst].map(r => ({
    type: r.resource.type,
    title: r.unfurl.title,
    description: r.unfurl.description,
    image: r.unfurl.image,
    path: r.resource.path,
    id: r.id,
  }));

  const resourcesExist = resourcesByType[resourceTypeConst].length > 0;

  // interesect search results with resources
  if (!isNull(results) && results.length > 0) {
    // diff out resources by id
    resources = intersectionBy(resources, results, 'id');
  }

  const resourcesNotFound = !queryIsEmpty && (!results || (results.length === 0 && windowHasQuery));
  return (
    <Layout showHamburger>
      <Main role="main">
        <Title
          title={RESOURCE_TYPE_PAGES[pageContext.resourceType].header.title.defaultMessage}
          subtitle={RESOURCE_TYPE_PAGES[pageContext.resourceType].header.subtitle.defaultMessage}
        />
        <PageContainer>
          {resourcesExist ? (
            <Aux>
              <FilterMenu filters={filters} />
              <CardsContainer
                searchResultsEmpty={resourcesNotFound}
                pagePath={location.pathname}
                resources={resources}
                query={query}
                openSideDrawer={() => setSideDrawerToggled(true)}
              />
            </Aux>
          ) : (
            <NoResources />
          )}
        </PageContainer>
      </Main>
      <SideDrawer
        show={sideDrawerToggled}
        closeDrawer={() => setSideDrawerToggled(false)}
        title="Filters"
      >
        <Filters filters={filters} />
      </SideDrawer>
    </Layout>
  );
};

export default withResourceQuery(ResourceType)();
