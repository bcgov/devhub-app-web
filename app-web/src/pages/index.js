import React, { useEffect, useState, useContext } from 'react';
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

import { useSearch, useSearchGate } from '../utils/hooks';
import {
  selectTopicsWithResourcesGroupedByType,
  selectResourcesGroupedByType,
} from '../utils/selectors';

import { isQueryEmpty, githubSearchReducer, documizeSearchPurifier } from '../utils/search';
import {
  SEARCH_QUERY_PARAM,
  SEARCH_SOURCES,
  SEARCH_SOURCE_CONFIG,
  GITHUB_SEARCH_SOURCE_TYPENAMES,
} from '../constants/search';
import { SPACING } from '../constants/designTokens';
import { formatEvents } from '../templates/events';
import {
  DYNAMIC_TOPIC_PATHS,
  POPULAR_TOPIC_CONFIGURATION,
  FEATURE_TOPIC_CONFIGURATION,
  FEATURED_CONTENT,
  SEARCH_RESOURCE_TYPES,
} from '../constants/ui';
import { removeUnwantedResults, buildPopularTopic, buildFeaturedTopic } from '../utils/helpers';
import Loading from '../components/UI/Loading/Loading';
import { RocketChatItem } from '../components/RocketChatItem/RocketChatItem';
import { DynamicSearchResults } from '../components/DynamicSearchResults';
import { Card } from '../components/Card/Card';
import Row from '../components/Card/Row';
import Column from '../components/Card/Column';
import GithubIssueCardHeader from '../components/DynamicSearchResults/GithubIssueCardHeader';
import CardHeader from '../components/Card/CardHeader';
import AuthContext from '../AuthContext';

const Main = styled.main`
  margin-bottom: ${SPACING['1x']};
  margin-top: ${SPACING['2x']};
  padding: 0 ${SPACING['2x']};
`;

/**
 * returns topics container component so as long as a search is not being done
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
 * @param {Array} results the list of searched resources
 * @param {Srting} title the title of currtion card section
 */
const getResourcePreviews = (resources, results = [], title) => {
  const resourcesSelector = selectResourcesGroupedByType();
  let resourcesToShow = [];

  if (!isNull(results) && results.length > 0) {
    //map the search index results to the resources. Its important to do it in this order,
    //since the index results are return in order based on relevance
    resourcesToShow = results.flatMap(result => {
      return resources.filter(resource => result.id === resource.id);
    });
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
    allTopicRegistryJson,
    allDevhubSiphon,
    allEventbriteEvents,
    allMarkdownRemark,
    allJourneyRegistryJson,
    //allMeetupGroup, commented out as meetup source plugin no longer works. meetup removed support for api keys, we are waiting for the source-meetup plugin to address this
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
  const { isAuthenticated } = useContext(AuthContext);
  // get rocket chat search results if authenticated
  // TODO will activate once ui component is available

  const searchGate = useSearchGate(isAuthenticated, query, client);

  let searchSourceResults = {};
  if (searchGate.results) {
    searchSourceResults = groupBy(searchGate.results, 'type');
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

  const markdownRemark = flattenGatsbyGraphQL(allMarkdownRemark.edges);

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
    results,
    'DevHub Resources',
  );

  let totalSearchResults = 0;
  const noSearchResults = results && results.length === 0;
  const resourcesNotFound = !queryIsEmpty && noSearchResults && isEmpty(searchSourceResults);

  const topics = flattenGatsbyGraphQL(allTopicRegistryJson.edges);
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
  // dynamic sources all load at different times, this function returns false when all have completed loading
  let [searchSourcesLoading, setLoading] = useState(searchGate.loading);

  if (!!searchSourceResults.rocketchat) {
    totalSearchResults += searchSourceResults.rocketchat.length;
  }

  const dynamicTopics = flattenGatsbyGraphQL([popularTopic, featuredTopic]);

  if (queryIsEmpty) {
    content = (
      <React.Fragment>
        {getTopicPreviews(dynamicTopics.concat(topics), windowHasQuery && !queryIsEmpty)}
      </React.Fragment>
    );
  } else if (resourcesNotFound) {
    content = (
      <Alert style={{ margin: '10px auto' }} color="info" data-testid={TEST_IDS.alert}>
        {SEARCH.results.empty.defaultMessage}
      </Alert>
    );
  } else {
    totalSearchResults = getSearchResultTotal(siphonResources);
    const { rocketchat, github, documize } = searchSourceResults;

    const settings = SEARCH_SOURCE_CONFIG[SEARCH_SOURCES.rocketchat];
    let githubCards = [];
    let documizeCards = [];
    if (github) {
      const parsedPayloads = github.map(gh => JSON.parse(gh.typePayload));
      // github results come in different flavors: issues, prs, repos
      // they also belong to the same list and require separating out in order
      // to ensure both 'types' display
      const githubGroupedByType = {
        [GITHUB_SEARCH_SOURCE_TYPENAMES.Repository]: [], // provide default values incase no results resolve
        [GITHUB_SEARCH_SOURCE_TYPENAMES.Issue]: [],
        ...groupBy(parsedPayloads, '__typename'),
      };

      const issues = githubGroupedByType[GITHUB_SEARCH_SOURCE_TYPENAMES.Issue]
        .slice(0, SEARCH_SOURCE_CONFIG[SEARCH_SOURCES.github].maxResults)
        .map(githubSearchReducer);

      const repositories = githubGroupedByType[GITHUB_SEARCH_SOURCE_TYPENAMES.Repository]
        .slice(0, SEARCH_SOURCE_CONFIG[SEARCH_SOURCES.github].maxResults)
        .map(githubSearchReducer);

      githubCards = issues.concat(repositories);
    }
    if (documize) {
      const parsedPayloads = documize.map(dc => JSON.parse(dc.typePayload));
      documizeCards = parsedPayloads
        .slice(0, SEARCH_SOURCE_CONFIG[SEARCH_SOURCES.documize].maxResults)
        .map(documizeSearchPurifier);
    }

    content = (
      <Aux>
        {getTopicPreviews(dynamicTopics.concat(topics), windowHasQuery && !queryIsEmpty)}
        {!isEmpty(rocketchat) && rocketchat.length > 0 && (
          <DynamicSearchResults
            numResults={rocketchat.length}
            sourceType={SEARCH_SOURCES.rocketchat}
            link={{
              to: 'https://chat.pathfinder.gov.bc.ca',
              text: 'Go To Rocket.Chat',
            }}
          >
            {rocketchat.slice(0, settings.maxResults).map(r => {
              const chatItem = JSON.parse(r.typePayload);

              return <RocketChatItem key={r.id} {...chatItem} data-testid={chatItem.id} />;
            })}
          </DynamicSearchResults>
        )}
        {!isEmpty(github) && github.length > 0 && (
          <DynamicSearchResults
            numResults={githubCards.length}
            sourceType={SEARCH_SOURCES.github}
            link={{
              to: 'https://github.com/bcgov',
              text: 'Go To Github',
            }}
          >
            <Row>
              {githubCards.map(gh => (
                <Column
                  key={gh.id}
                  style={{
                    justifyContent: 'center',
                    display: 'flex',
                  }}
                >
                  <Card
                    {...gh.fields}
                    type={gh.fields.resourceType}
                    data-testid={gh.id}
                    renderHeader={() => {
                      return gh.fields.resourceType === SEARCH_RESOURCE_TYPES.GITHUB_ISSUE ? (
                        <GithubIssueCardHeader
                          resourceType={gh.fields.resourceType}
                          repository={gh.repository.name}
                        />
                      ) : (
                        <CardHeader resourceType={gh.fields.resourceType} />
                      );
                    }}
                  />
                </Column>
              ))}
            </Row>
          </DynamicSearchResults>
        )}
        {!isEmpty(documizeCards) && documizeCards.length > 0 && (
          <DynamicSearchResults
            numResults={documizeCards.length}
            sourceType={SEARCH_SOURCES.documize}
            link={{
              to: 'https://docs.pathfinder.gov.bc.ca/',
              text: 'Go To documize',
            }}
          >
            <Row>
              {documizeCards.map(dc => (
                <Column
                  key={dc.id}
                  style={{
                    justifyContent: 'center',
                    display: 'flex',
                  }}
                >
                  <Card
                    {...dc.fields}
                    type={SEARCH_SOURCES.documize}
                    data-testid={dc.id}
                    renderHeader={() => {
                      return <CardHeader resourceType={dc.fields.resourceType} />;
                    }}
                  />
                </Column>
              ))}
            </Row>
          </DynamicSearchResults>
        )}
      </Aux>
    );
  }

  useEffect(() => {
    setLoading(searchGate.loading);

    return () => {
      setLoading();
    };
  }, [searchGate.loading, searchSourcesLoading]);

  return (
    <Layout showHamburger>
      <Masthead
        query={query}
        searchSourcesLoading={searchSourcesLoading}
        resultCount={totalSearchResults}
      />
      <Main>
        {windowHasQuery && !queryIsEmpty && siphonResources}
        {windowHasQuery && searchSourcesLoading && searchGate.authenticated ? (
          <Loading message="loading" />
        ) : (
          content
        )}
      </Main>
    </Layout>
  );
};

export default withResourceQuery(withApollo(Index))();
