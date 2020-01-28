import React, { useMemo } from 'react';

import queryString from 'query-string';
import { graphql } from 'gatsby';
// components
import { Alert } from 'reactstrap';
import { SearchResults } from '../components/Search/SearchResults';
import { Masthead, TopicsPreview } from '../components/Home';
import { useSearch } from '../utils/hooks';
import { SEARCH_QUERY_PARAM } from '../constants/search';
import Layout from '../hoc/Layout';

import { isQueryEmpty } from '../utils/search';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { formatEvents } from '../templates/events';

export const TEST_IDS = {
  alert: 'home-test-alert',
};

export const Home = ({
  location,
  data: { allGithubRaw, allDevhubSiphon, allEventbriteEvents },
}) => {
  const queryParam = queryString.parse(location.search);
  let query = [];
  let windowHasQuery = Object.prototype.hasOwnProperty.call(queryParam, SEARCH_QUERY_PARAM);

  if (windowHasQuery) {
    query = decodeURIComponent(queryParam[SEARCH_QUERY_PARAM]);
  } else {
    query = '';
  }

  const queryIsEmpty = isQueryEmpty(query);
  // const searchGate = useSearchGate(isAuthenticated, query, client);
  const results = useSearch(query);
  const noSearchResults = results && results.length === 0;
  const resourcesNotFound = windowHasQuery && !queryIsEmpty && noSearchResults;
  const currentEvents = formatEvents(
    flattenGatsbyGraphQL(allEventbriteEvents.edges).filter(e => e.start.daysFromNow <= 0),
  );

  const resourcesToSearchAgainst = useMemo(
    () => flattenGatsbyGraphQL(allGithubRaw.edges.concat(allDevhubSiphon.edges)),
    [allDevhubSiphon.edges, allGithubRaw.edges],
  ).concat(currentEvents);

  let content = null;

  if (resourcesNotFound) {
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
  } else if (windowHasQuery) {
    content = (
      <SearchResults
        title="Devhub resources"
        resources={resourcesToSearchAgainst}
        results={results}
      />
    );
  } else {
    // if there is no query render the topics
    content = <TopicsPreview />;
  }
  return (
    <Layout>
      <Masthead
        query={query}
        searchSourcesLoading={false}
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
            image
            pagePaths
            standAlonePath
            slug
            personas
          }
          internal {
            type
          }
          childMarkdownRemark {
            htmlAst
            html
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
            image
            pagePaths
            standAlonePath
          }
        }
      }
    }
  }
`;

export default React.memo(Home);
