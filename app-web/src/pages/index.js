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
  let events = resources.filter(resource => resource.resource.type === RESOURCE_TYPES.EVENTS);
  let allButEvents = resources.filter(resource => resource.resource.type !== RESOURCE_TYPES.EVENTS);
  allButEvents = uniqBy(allButEvents, 'unfurl.title');
  return allButEvents.slice(0, 15).concat(events);
};

/**
 * returns a resource preview components
 * @param {Array} resources the list of siphon resources
 * @param {Array} results the list of searched resources
 */
const getResourcePreviews = (resources, results = []) => {
  const resourcesSelector = selectResourcesGroupedByType();
  let resourcesToGroup = resources;
  if (!isNull(results) && results.length > 0) {
    // diff out resources by id
    resourcesToGroup = intersectionBy(resources, results, 'id');
  }

  resourcesToGroup = getUniqueResources(resourcesToGroup);
  // select resources grouped by type using relesect memoization https://github.com/reduxjs/reselect/issues/30
  const resourcesByType = resourcesSelector(resourcesToGroup);
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

export const TEST_IDS = {
  alert: 'home-test-alert',
};

export const Index = ({
  data: {
    allDevhubTopic,
    allDevhubSiphon,
    allEventbriteEvents,
    allMeetupGroup,
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
    flattenGatsbyGraphQL(allDevhubSiphon.edges).concat(eventsAndMeetups),
    results,
  );

  const resourcesNotFound = !queryIsEmpty && (!results || (results.length === 0 && windowHasQuery));

  const topics = flattenGatsbyGraphQL(allDevhubTopic.edges);
  if (queryIsEmpty) {
    content = (
      <Aux>
        {getTopicPreviews(
          topics,
          windowHasQuery && !queryIsEmpty,
        )}
      </Aux>
    );
  } else if (resourcesNotFound) {
    content = (
      <Alert style={{ margin: '10px auto' }} color="info" data-testid={TEST_IDS.alert}>
        {SEARCH.results.empty.defaultMessage}
      </Alert>
    );
  } else {
    content = (
      <Aux>
        {getTopicPreviews(
          topics,
          windowHasQuery && !queryIsEmpty,
        )}
        {siphonResources}
      </Aux>
    );
  }

  return (
    <Layout showHamburger>
      <Masthead query={query} />
      <Main>{content}</Main>
    </Layout>
  );
};

export default withResourceQuery(Index)();
