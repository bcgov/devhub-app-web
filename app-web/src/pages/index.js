import React, { useMemo, useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import queryString from 'query-string';
import { graphql } from 'gatsby';
// components
import { withApollo } from 'react-apollo';
import { Alert } from 'reactstrap';
import { SearchResults } from '../components/Search/SearchResults';
import { Masthead, TopicsPreview } from '../components/Home';
import Layout from '../hoc/Layout';
import { SEO } from '../components/SEO/SEO';

import Loading from '../components/UI/Loading/Loading';
// hooks
import { useSearch, useSearchGate } from '../utils/hooks';
// config
import { SEARCH_QUERY_PARAM } from '../constants/search';
// helpers
import { isQueryEmpty } from '../utils/search';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { formatEvents } from '../templates/events';
import { SearchGateResults } from '../components/Search/SearchGateResults';
import { getFirstNonExternalResource } from '../utils/helpers';
import groupBy from 'lodash/groupBy';

export const TEST_IDS = {
  alert: 'home-test-alert',
};

export const Index = ({
  location,
  client,
  data: {
    allGithubRaw,
    allDevhubSiphon,
    allEventbriteEvents,
    allJourneyRegistryJson,
    allTopicRegistryJson,
  },
}) => {
  // this forces the component to re render on the client as there will be a mistmatch between
  // html properties on reloads of this page when a search comes in. This is a known effect
  // of reacts hydration process https://reactjs.org/docs/react-dom.html#hydrate
  // eslint-disable-next-line
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);
  const queryParam = queryString.parse(location.search);
  const windowHasQuery = Object.prototype.hasOwnProperty.call(queryParam, SEARCH_QUERY_PARAM);
  // const { isAuthenticated } = useContext(AuthContext);
  const [keycloak] = useKeycloak();
  const isAuthenticated = keycloak && keycloak.authenticated;

  const query = windowHasQuery ? decodeURIComponent(queryParam[SEARCH_QUERY_PARAM]) : '';
  const queryIsEmpty = isQueryEmpty(query);
  const thereIsASearch = !queryIsEmpty && windowHasQuery;
  // search our local graphql federated search for (documize, github and rocketchat)
  const searchGate = useSearchGate(isAuthenticated, query, client);
  // search algolia
  const results = useSearch(query);

  const noAlgoliaResults = results && results.length === 0;
  const noSearchgateResults = !searchGate.loading && searchGate.results.length === 0;
  const resourcesNotFound = thereIsASearch && noAlgoliaResults && noSearchgateResults;

  const events = useMemo(() => flattenGatsbyGraphQL(allEventbriteEvents.edges), [
    allEventbriteEvents.edges,
  ]);

  const journeyData = useMemo(() => flattenGatsbyGraphQL(allJourneyRegistryJson.edges), [
    allJourneyRegistryJson.edges,
  ]);

  const topicData = useMemo(() => flattenGatsbyGraphQL(allTopicRegistryJson.edges), [
    allTopicRegistryJson.edges,
  ]);

  // Method to get standAlonePath for Topics as their slugs are formed differently than journeys and other nodes.
  const getTopicStandAlonePath = useMemo(
    () =>
      topicData.map(topic => {
        return {
          ...topic,
          fields: {
            ...topic.fields,
            standAlonePath: getFirstNonExternalResource(topic.connectsWith),
          },
        };
      }),
    [topicData],
  );

  const searchSources = useMemo(() => groupBy(searchGate.results, 'type'), [searchGate.results]);

  // github raw and siphon can be joined because they already have like metadata for their node fields
  const githubRawAndSiphon = allGithubRaw.edges.concat(allDevhubSiphon.edges);
  // adds properties needed for rendering the 'event metadata' in the event card component
  const currentEvents = formatEvents(events.filter(e => e.start.daysFromNow <= 0));

  const resourcesToSearchAgainst = useMemo(() => flattenGatsbyGraphQL(githubRawAndSiphon), [
    githubRawAndSiphon,
  ])
    .concat(currentEvents)
    .concat(journeyData)
    .concat(getTopicStandAlonePath);

  let content;
  if (!isClient) {
    content = <Loading message="Just a moment" />;
  } else if (resourcesNotFound) {
    content = (
      <div style={{ padding: '10px' }}>
        <Alert
          style={{ margin: '0 auto', maxWidth: '400px' }}
          color="info"
          data-testid={TEST_IDS.alert}
        >
          No resources found :(
        </Alert>
      </div>
    );
  } else if (thereIsASearch) {
    // if there is no query render the topics
    content = (
      <React.Fragment>
        <SearchResults
          title="Devhub resources"
          resources={resourcesToSearchAgainst}
          results={results}
        />
        {searchGate.error && (
          <Alert color="error">There was an error fetching external results :(</Alert>
        )}
        {searchGate.authenticated && searchGate.loading ? (
          <Loading message="loading" />
        ) : (
          <SearchGateResults searchSources={searchSources} />
        )}
      </React.Fragment>
    );
  } else {
    content = <TopicsPreview />;
  }

  return (
    <Layout>
      <SEO title="DevHub" />
      <Masthead
        query={query}
        searchSourcesLoading={searchGate.loading}
        location={location}
        resultCount={results && results.length}
      />
      {content}
    </Layout>
  );
};

export const homeQuery = graphql`
  query home {
    allEventbriteEvents(
      sort: { fields: [start___local], order: ASC }
      filter: { shareable: { eq: true } }
    ) {
      edges {
        node {
          internal {
            type
          }
          fields {
            resourceType
            title
            description
            pagePaths
            image
            standAlonePath
          }
          siphon {
            unfurl {
              title
              description
              image
            }
            resource {
              type
              path
            }
            id
          }
          id
          start {
            day: local(formatString: "DD")
            month: local(formatString: "MMM")
            year: local(formatString: "YYYY")
            daysFromNow: local(difference: "days")
          }
          venue {
            name
          }
        }
      }
    }
    allGithubRaw(filter: { fields: { pageOnly: { eq: false } } }) {
      edges {
        node {
          id
          pageViews
          html_url
          fields {
            resourceType
            title
            description
            image {
              ...cardFixedImage
            }
            pagePaths
            standAlonePath
            slug
          }
        }
      }
    }
    allDevhubSiphon(filter: { source: { type: { eq: "web" } } }) {
      edges {
        node {
          id
          fields {
            resourceType
            personas
            title
            description
            image {
              ...cardFixedImage
            }
            pagePaths
            standAlonePath
          }
        }
      }
    }
    allJourneyRegistryJson {
      edges {
        node {
          id
          fields {
            title
            description
            standAlonePath
            resourceType
            slug
          }
        }
      }
    }
    allTopicRegistryJson {
      edges {
        node {
          id
          fields {
            title
            description
            standAlonePath
            resourceType
            slug
          }
          connectsWith {
            ...DevhubNodeConnection
          }
        }
      }
    }
  }
`;

export default withApollo(Index);
