import React from 'react';
import queryString from 'query-string';
import intersectionBy from 'lodash/intersectionBy';
import isNull from 'lodash/isNull';
import styled from '@emotion/styled';

import { Alert } from 'reactstrap';

import { MAIN_NAV_ROUTES } from '../constants/routes';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { SEARCH } from '../messages';

import Layout from '../hoc/Layout';
import { ResourcePreview, Masthead, TopicsContainer } from '../components/Home';
import withResourceQuery from '../hoc/withResourceQuery';
import Aux from '../hoc/auxillary';

import { useSearch } from '../utils/hooks';
import {
  selectTopicsWithResourcesGroupedByType,
  selectResourcesGroupedByType,
} from '../utils/selectors';
import { isQueryEmpty } from '../utils/search';
import { SEARCH_QUERY_PARAM } from '../constants/search';
import { SPACING } from '../constants/designTokens';
import uniqBy from 'lodash/uniqBy';
import { formatEvents, formatMeetUps } from '../templates/events';
import { RESOURCE_TYPES } from '../constants/ui';
import { getTextAndLink } from '../utils/helpers';
import Popular from '../components/TopicEntryPage/Popular';

const Main = styled.main`
  margin-bottom: ${SPACING['1x']};
  margin-top: ${SPACING['2x']};
  padding: 0 ${SPACING['2x']};
`;

/**
 * returns topics container component so aslong as a search is not being done
 * @param {Array} topics list of topics also known as topics
 * @param {Boolean} searchResultsExist
 */
const getTopicPreviews = (topics, searchResultsExist) => {
  const topicsSelector = selectTopicsWithResourcesGroupedByType();
  return (
    !searchResultsExist && (
      <TopicsContainer topics={topicsSelector(topics)} link={MAIN_NAV_ROUTES.TOPICS} />
    )
  );
};

/**
 * returns the resources but without duplicates, based on title as the same resource in different topics will have different id's
 * there is one exception to when we do want resources with the same title though, that being events - thus events are return unchanged
 */
const getUniqueResources = resources => {
  let events = resources.filter(resource => resource.fields.resourceType === RESOURCE_TYPES.EVENTS);
  let allButEvents = resources.filter(
    resource => resource.fields.resourceType !== RESOURCE_TYPES.EVENTS,
  );
  allButEvents = uniqBy(allButEvents, 'fields.title');
  return allButEvents.concat(events);
};

/**
 * takes in search results sorted by resource type
 * returns the total number of search results formated as '_____ Result(s) Found'
 * If total is zero, returns back No Results Found
 * @param {Array} resourcesByType resources sorted by type
 */
const getSearchResultTotal = resourcesByType => {
  let total = 0;

  Object.keys(resourcesByType).map(resourceType => {
    if (resourcesByType[resourceType] !== null) {
      total = total + resourcesByType[resourceType].props.resources.length;
    }
  });
  if (total == 1) {
    return `${total} Result Found`;
  } else if (total > 1) {
    return `${total} Results Found`;
  }
  return `No Results Found`;
};

/**
 * returns a resource preview components
 * @param {Array} resources the list of siphon resources
 * @param {string} queryExists the search query
 * @param {Array} results the list of searched resources
 */
const getResourcePreviews = (resources, queryExists, results = []) => {
  const resourcesSelector = selectResourcesGroupedByType();
  let resourcesToGroup = resources;
  if (!isNull(results) && results.length > 0) {
    // diff out resources by id
    resourcesToGroup = intersectionBy(resources, results, 'id');
  }
  resourcesToGroup = getUniqueResources(resourcesToGroup);
  // select resources grouped by type using relesect memoization https://github.com/reduxjs/reselect/issues/30
  let resourcesByType = resourcesSelector(resourcesToGroup);
  const siphonResources = Object.keys(resourcesByType).map(resourceType => {
    if (resourcesByType[resourceType].length > 0) {
      let linkWithCounter = MAIN_NAV_ROUTES[resourceType];
      if (queryExists) {
        linkWithCounter = getTextAndLink(resourceType, resourcesByType);
      }
      return (
        <ResourcePreview
          key={resourceType}
          title={resourceType}
          resources={resourcesByType[resourceType]}
          link={linkWithCounter}
        />
      );
    }
    return null;
  });

  return siphonResources;
};

export const TEST_IDS = {
  alert: 'home-test-alert',
};

export const Index = ({
  data: {
    allDevhubTopic,
    allDevhubSiphon,
    allEventbriteEvents,
    allMeetupGroup,
    allGithubRaw,
    siteSearchIndex: { index },
  },
  location,
}) => {
  const queryParam = queryString.parse(location.search);
  let query = [];
  let results = [];
  let windowHasQuery = Object.prototype.hasOwnProperty.call(queryParam, SEARCH_QUERY_PARAM);

  if (windowHasQuery) {
    query = decodeURIComponent(queryParam[SEARCH_QUERY_PARAM]);
  } else {
    query = '';
  }

  results = useSearch(query, index);

  const allEvents = flattenGatsbyGraphQL(allEventbriteEvents.edges);
  const currentEvents = formatEvents(allEvents.filter(e => e.start.daysFromNow <= 0));
  const allMeetups = formatMeetUps(
    flattenGatsbyGraphQL(allMeetupGroup.edges).flatMap(meetups => {
      return meetups.childrenMeetupEvent;
    }),
  );
  const currentMeetups = allMeetups.filter(e => e.start.daysFromNow <= 0);
  const eventsAndMeetups = currentEvents.concat(currentMeetups);

  // this is defined by ?q='' or ?q=''&q=''..etc
  // if query is empty we prevent the search results empty from being rendered
  // in addition the topics container is prevented from not rendering because
  // the query is present
  const queryIsEmpty = isQueryEmpty(query);

  let content = null;

  const siphonResources = getResourcePreviews(
    flattenGatsbyGraphQL(allDevhubSiphon.edges)
      .concat(eventsAndMeetups)
      .concat(flattenGatsbyGraphQL(allGithubRaw.edges)),
    windowHasQuery && !queryIsEmpty,
    results,
  );

  let totalSearchResults;

  const resourcesNotFound = !queryIsEmpty && (!results || (results.length === 0 && windowHasQuery));

  const topics = flattenGatsbyGraphQL(allDevhubTopic.edges);
  if (queryIsEmpty) {
    content = <Aux>{getTopicPreviews(topics, windowHasQuery && !queryIsEmpty)}</Aux>;
  } else if (resourcesNotFound) {
    totalSearchResults = 'No Results';
    content = (
      <Alert style={{ margin: '10px auto' }} color="info" data-testid={TEST_IDS.alert}>
        {SEARCH.results.empty.defaultMessage}
      </Alert>
    );
  } else {
    totalSearchResults = getSearchResultTotal(siphonResources);
    content = (
      <Aux>
        {getTopicPreviews(topics, windowHasQuery && !queryIsEmpty)}
        {siphonResources}
      </Aux>
    );
  }

  return (
    <Layout showHamburger>
      <Masthead query={query} resultCount={totalSearchResults} />
      <Main>{content}</Main>
    </Layout>
  );
};

export default withResourceQuery(Index)();
