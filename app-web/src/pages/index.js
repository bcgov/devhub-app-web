import React, { useState } from 'react';
import queryString from 'query-string';
import isNull from 'lodash/isNull';
import groupBy from 'lodash/groupBy';
import styled from '@emotion/styled';
import { Alert } from 'reactstrap';
import { withApollo } from 'react-apollo';
import { MAIN_NAV_ROUTES } from '../constants/routes';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { SEARCH } from '../messages';
import isEmpty from 'lodash/isEmpty';

import Layout from '../hoc/Layout';
import { ResourcePreview, Masthead, TopicsContainer } from '../components/Home';
import withResourceQuery from '../hoc/withResourceQuery';
import Aux from '../hoc/auxillary';

import { useSearch, useAuthenticated, useSearchGate } from '../utils/hooks';
import {
  selectTopicsWithResourcesGroupedByType,
  selectResourcesGroupedByType,
} from '../utils/selectors';

import { isQueryEmpty } from '../utils/search';
import { SEARCH_QUERY_PARAM, SEARCH_SOURCES } from '../constants/search';
import { SPACING } from '../constants/designTokens';
import uniqBy from 'lodash/uniqBy';
import { formatEvents } from '../templates/events';
import {
  RESOURCE_TYPES,
  DYNAMIC_TOPIC_PATHS,
  POPULAR_TOPIC_CONFIGURATION,
  FEATURE_TOPIC_CONFIGURATION,
  FEATURED_CONTENT,
} from '../constants/ui';
import { SEARCH_SOURCE_INITIAL_STATE } from '../constants/search';
import { removeUnwantedResults, buildPopularTopic, buildFeaturedTopic } from '../utils/helpers';
import Loading from '../components/UI/Loading/Loading';
import { RocketChatItem } from '../components/RocketChatItem/RocketChatItem';
import { DynamicSearchResults } from '../components/DynamicSearchResults';

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
 * takes in search results
 * returns the total amount of results
 * @param {Array} resources the search results
 */
const getSearchResultTotal = results => {
  return results.props.resources.length;
};

/**
 * returns a resource preview components
 * @param {Array} resources the list of siphon resources
 * @param {string} queryExists the search query
 * @param {Array} results the list of searched resources
 */
const getResourcePreviews = (resources, queryExists, results = [], title) => {
  const resourcesSelector = selectResourcesGroupedByType();
  let resourcesToShow = [];
  if (!isNull(results) && results.length > 0) {
    //map the search index results to the resources. Its important to do it in this order,
    //since the index results are return in order based on relevance
    resourcesToShow = results.flatMap(result => {
      return resources.filter(resource => result.id === resource.id);
    });
    //remove any duplicates
    resourcesToShow = getUniqueResources(resourcesToShow);
  }

  // select resources grouped by type using relesect memoization https://github.com/reduxjs/reselect/issues/30
  let resourcesByType = resourcesSelector(resourcesToShow);
  //get totals for each resource type
  let resourceIconsWithCounter = Object.keys(resourcesByType).map(resourceType => {
    return {
      name: resourceType,
      counter: resourcesByType[resourceType].length,
    };
  });
  //sort by highest counter
  resourceIconsWithCounter = resourceIconsWithCounter.sort((a, b) => {
    return b.counter - a.counter;
  });

  return (
    <ResourcePreview
      key={'Internal Results'}
      title={title}
      resources={resourcesToShow}
      filters={resourceIconsWithCounter}
      amountToShow={18}
      seeMore={true}
    />
  );
};

export const TEST_IDS = {
  alert: 'home-test-alert',
};

export const Index = ({
  client,
  data: {
    allDevhubTopic,
    allDevhubSiphon,
    allEventbriteEvents,
    allMarkdownRemark,
    //allMeetupGroup, commented out as meetup source plugin no longer works. meetup removed support for api keys, we are waiting for the source-meetup plugin to address this
    allGithubRaw,
    siteSearchIndex: { index },
  },
  location,
}) => {
  const queryParam = queryString.parse(location.search);
  const [searchSourceFilters] = useState(SEARCH_SOURCE_INITIAL_STATE);
  let query = [];
  let results = [];
  let windowHasQuery = Object.prototype.hasOwnProperty.call(queryParam, SEARCH_QUERY_PARAM);

  if (windowHasQuery) {
    query = decodeURIComponent(queryParam[SEARCH_QUERY_PARAM]);
  } else {
    query = '';
  }
  const { authenticated } = useAuthenticated();
  // get rocket chat search results if authenticated
  // TODO will activate once ui component is available

  const searchGate = useSearchGate(authenticated, query, client);

  let searchSourceResults = {};
  if (searchGate.results) {
    searchSourceResults = groupBy(searchGate.results, 'type');
  }

  //set search filter to false if the user isnt authenticated, so RC icon will show appropriately
  if (!authenticated) {
    searchSourceFilters.rocketchat = false;
  }

  results = useSearch(query, index);

  const allEvents = flattenGatsbyGraphQL(allEventbriteEvents.edges);
  const currentEvents = formatEvents(allEvents.filter(e => e.start.daysFromNow <= 0));
  /*const allMeetups = formatMeetUps(
    flattenGatsbyGraphQL(allMeetupGroup.edges).flatMap(meetups => {
      return meetups.childrenMeetupEvent;
    }),
  );
  const currentMeetups = allMeetups.filter(e => e.start.daysFromNow <= 0);*/
  const eventsAndMeetups = currentEvents;
  if (results) {
    results = removeUnwantedResults(results, allEvents, eventsAndMeetups);
  }
  const markdownRemark = flattenGatsbyGraphQL(allMarkdownRemark.edges).filter(
    node => node.fields.resourceType && node.fields.topicName,
  );

  // this is defined by ?q='' or ?q=''&q=''..etc
  // if query is empty we prevent the search results empty from being rendered
  // in addition the topics container is prevented from not rendering because
  // the query is present
  const queryIsEmpty = isQueryEmpty(query);

  let content = null;

  const siphonResources = getResourcePreviews(
    flattenGatsbyGraphQL(allDevhubSiphon.edges)
      .concat(eventsAndMeetups)
      .concat(flattenGatsbyGraphQL(allGithubRaw.edges))
      .concat(markdownRemark),
    windowHasQuery && !queryIsEmpty,
    results,
    'DevHub Resources',
  );

  let totalSearchResults = 0;

  const resourcesNotFound = !queryIsEmpty && (!results || (results.length === 0 && windowHasQuery));

  const topics = flattenGatsbyGraphQL(allDevhubTopic.edges);

  const githubRaw = flattenGatsbyGraphQL(allGithubRaw.edges);
  const devhubSiphon = flattenGatsbyGraphQL(allDevhubSiphon.edges);

  const popularTopic = buildPopularTopic(
    githubRaw,
    POPULAR_TOPIC_CONFIGURATION.name,
    POPULAR_TOPIC_CONFIGURATION.description,
    DYNAMIC_TOPIC_PATHS.popular,
    POPULAR_TOPIC_CONFIGURATION.minPageViews,
    POPULAR_TOPIC_CONFIGURATION.maxNodes,
  );

  const featuredTopic = buildFeaturedTopic(
    githubRaw.concat(devhubSiphon),
    FEATURE_TOPIC_CONFIGURATION.name,
    FEATURE_TOPIC_CONFIGURATION.description,
    DYNAMIC_TOPIC_PATHS.featured,
    FEATURED_CONTENT,
  );

  const dynamicTopics = flattenGatsbyGraphQL([popularTopic, featuredTopic]);
  if (queryIsEmpty) {
    content = (
      <Aux>{getTopicPreviews(dynamicTopics.concat(topics), windowHasQuery && !queryIsEmpty)}</Aux>
    );
  } else if (resourcesNotFound) {
    content = (
      <Alert style={{ margin: '10px auto' }} color="info" data-testid={TEST_IDS.alert}>
        {SEARCH.results.empty.defaultMessage}
      </Alert>
    );
  } else {
    totalSearchResults = getSearchResultTotal(siphonResources);
    const { rocketchat } = searchSourceResults;

    content = (
      <Aux>
        {getTopicPreviews(dynamicTopics.concat(topics), windowHasQuery && !queryIsEmpty)}
        {siphonResources}
        {!isEmpty(rocketchat) && rocketchat.length > 0 && (
          <DynamicSearchResults
            results={rocketchat}
            sourceType={SEARCH_SOURCES.rocketchat}
            renderItem={r => {
              const chatItem = JSON.parse(r.typePayload);

              return <RocketChatItem {...chatItem} data-testid={chatItem.id} />;
            }}
            link={{
              to: 'https://chat.pathfinder.gov.bc.ca',
              text: 'Go To Rocket.Chat',
            }}
          />
        )}
      </Aux>
    );
  }

  // dynamic sources all load at different times, this function returns false when all have completed loading
  const searchSourcesLoading = searchGate.loading;
  if (!!searchSourceResults.rocketchat) {
    totalSearchResults += searchSourceResults.rocketchat.length;
  }

  return (
    <Layout showHamburger>
      <Masthead
        query={query}
        searchSourcesLoading={searchSourcesLoading}
        resultCount={totalSearchResults}
        searchSources={searchSourceFilters}
        searchResultsEmpty={resourcesNotFound}
      />
      <Main>
        {windowHasQuery && searchSourcesLoading ? <Loading message="loading" /> : content}
      </Main>
    </Layout>
  );
};

export default withResourceQuery(withApollo(Index))();
