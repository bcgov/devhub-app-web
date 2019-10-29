import React from 'react';
import { render, cleanup } from '@testing-library/react';
import queryString from 'query-string';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import { Index, TEST_IDS } from '../../src/pages/index';
import {
  SIPHON_NODES,
  TOPICS,
  EVENTS,
  MEETUP_NODES,
  FEATURED_TOPIC,
  JOURNEYS,
  POPULAR_TOPIC,
} from '../../__fixtures__/nodes';
import {
  SELECT_TOPICS_WITH_RESOURCES_GROUPED_BY_TYPE,
  SELECT_RESOURCES_GROUPED_BY_TYPE,
} from '../../__fixtures__/selector-fixtures';
import { useSearch, useAuthenticated, useSearchGate } from '../../src/utils/hooks';
import { TEST_IDS as TOPIC_TEST_IDS } from '../../src/components/Home/TopicsContainer';
import { TEST_IDS as RESOURCE_PREVIEW_TEST_IDS } from '../../src/components/Home/ResourcePreview';
import {
  getFirstNonExternalResource,
  getTextAndLink,
  removeUnwantedResults,
  buildFeaturedTopic,
  buildPopularTopic,
  reduceJourneyToSubwayLine,
} from '../../src/utils/helpers';
import { GITHUB_RAW_NODES } from '../../__fixtures__/nodes';
import { client } from '../../wrapWithProvider';
import { ApolloProvider } from 'react-apollo';
import { ROCKET_CHAT, GITHUB } from '../../__fixtures__/searchsources';
// this adds custom jest matchers from jest-dom
jest.mock('query-string');
// mock out layout
jest.mock('../../src/hoc/Layout.js', () => ({ children }) => children);
// mock out search hook
jest.mock('../../src/utils/hooks.js');

jest.mock('../../src/utils/helpers.js');

getFirstNonExternalResource.mockReturnValue('foo');
getTextAndLink.mockReturnValue({ to: '/documentation?q=mobile', text: 'two results found' });
useSearchGate.mockReturnValue({ results: [], loading: false });
useAuthenticated.mockReturnValue(false);
buildFeaturedTopic.mockReturnValue({ node: FEATURED_TOPIC });
buildPopularTopic.mockReturnValue({ node: POPULAR_TOPIC });
reduceJourneyToSubwayLine.mockReturnValue([{ name: 'foo' }]);

describe('Home Page', () => {
  // mock out non redux selectors
  jest.doMock('../../src/utils/selectors.js', () => ({
    selectResourcesGroupedByType: jest.fn(() => SELECT_RESOURCES_GROUPED_BY_TYPE),
    selectTopicsWithResourcesGroupedByType: jest.fn(
      () => SELECT_TOPICS_WITH_RESOURCES_GROUPED_BY_TYPE,
    ),
  }));
  // when you use graphql to load data into the component
  // all edges are an object of { node: [graphql object]}
  // the topics fixture is the true data without this extra object field
  // so we map it to resemble what graphql would do when passing the data attribute into
  // this component
  const nodes = SIPHON_NODES.map(c => ({ node: c }));
  const topics = TOPICS.map(c => ({ node: c }));
  const events = EVENTS.map(c => ({ node: c }));
  const meetups = MEETUP_NODES.map(c => ({ node: c }));
  const githubRaw = GITHUB_RAW_NODES.map(c => ({ node: c }));
  const journeys = JOURNEYS.map(c => ({ node: c }));
  const props = {
    client: {},
    data: {
      allJourneyRegistryJson: {
        edges: journeys,
      },
      allDevhubSiphon: {
        edges: nodes,
      },
      allGithubRaw: {
        edges: githubRaw,
      },
      allDevhubTopic: {
        edges: topics,
      },
      allEventbriteEvents: {
        edges: events,
      },
      allMeetupGroup: {
        edges: meetups,
      },
      siteSearchIndex: {
        index: {},
      },
      allMarkdownRemark: {
        edges: githubRaw,
      },
    },
    location: {
      search: '',
    },
  };

  afterEach(() => {
    cleanup();
  });

  test('it matches snapshot, when there is a search and no results an alert box shows up', () => {
    queryString.parse.mockReturnValue({});
    const { container, rerender, queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Index {...props} />
        </ApolloProvider>
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
    let Alert;
    Alert = queryByTestId(TEST_IDS.alert);
    // initially there are valid results and so there should no be no alert
    expect(Alert).not.toBeInTheDocument();
    // mock that query string actually finds search values in the url
    queryString.parse.mockReturnValue({ q: 'foo' });
    // rerender stubbing no results for resources
    useSearch.mockReturnValue([]);
    rerender(
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Index {...props} />
        </ApolloProvider>
      </ThemeProvider>,
    );
    expect(useSearch).toHaveBeenCalled();
    Alert = queryByTestId(TEST_IDS.alert);

    expect(Alert).toBeInTheDocument();
  });

  test('when there is a search and no local results, but external results, no alert box shows up', () => {
    queryString.parse.mockReturnValue({});
    useSearchGate.mockReturnValue({ results: ROCKET_CHAT, loading: false });
    useSearch.mockReturnValue([]);

    const { rerender, queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Index {...props} />
        </ApolloProvider>
      </ThemeProvider>,
    );

    let Alert;
    Alert = queryByTestId(TEST_IDS.alert);
    // initially there are valid results and so there should no be no alert
    expect(Alert).not.toBeInTheDocument();
    // mock that query string actually finds search values in the url
    queryString.parse.mockReturnValue({ q: 'foo' });
    // rerender stubbing no results for resources
    rerender(
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Index {...props} />
        </ApolloProvider>
      </ThemeProvider>,
    );

    Alert = queryByTestId(TEST_IDS.alert);

    expect(Alert).not.toBeInTheDocument();
  });

  test('When a blank search is entered, cards and alerts dont show but topics do', () => {
    queryString.parse.mockReturnValue({});
    const { container, rerender, queryByTestId, queryAllByTestId } = render(
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Index {...props} />
        </ApolloProvider>
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();
    let Alert;
    Alert = queryByTestId(TEST_IDS.alert);
    // initially there are valid results and so there should no be no alert
    expect(Alert).not.toBeInTheDocument();
    // mock that query string actually finds search values in the url
    queryString.parse.mockReturnValue({ q: '' });
    // rerender stubbing no results for resources
    useSearch.mockReturnValue([]);
    rerender(
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Index {...props} />
        </ApolloProvider>
      </ThemeProvider>,
    );
    expect(useSearch).toHaveBeenCalled();
    Alert = queryByTestId(TEST_IDS.alert);

    expect(Alert).not.toBeInTheDocument();

    expect(queryByTestId(TOPIC_TEST_IDS.container)).toBeInTheDocument();
    expect(queryAllByTestId(RESOURCE_PREVIEW_TEST_IDS.container).length).toBe(0);
    //The above changed to "toBe(0)" from "toBeGreaterThan(0)" as previews are no longer shown on the home page (unless a valid search has been made)
  });

  test('when searching, topics disappear if there are results', () => {
    queryString.parse.mockReturnValue({ q: 'foo' });
    useSearch.mockReturnValue([{ id: SIPHON_NODES[0].id }]);
    removeUnwantedResults.mockReturnValue([SIPHON_NODES[0]]);
    const { queryByTestId, queryAllByTestId } = render(
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Index {...props} />
        </ApolloProvider>
      </ThemeProvider>,
    );

    expect(queryByTestId(TOPIC_TEST_IDS.container)).not.toBeInTheDocument();
    expect(queryAllByTestId(RESOURCE_PREVIEW_TEST_IDS.container).length).toBeGreaterThan(0);
  });

  test('when there is no search, topics are visible', () => {
    queryString.parse.mockReturnValue({});
    useSearch.mockReturnValue([]);
    useAuthenticated.mockReturnValue(false);
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Index {...props} />
        </ApolloProvider>
      </ThemeProvider>,
    );

    expect(getByTestId(TOPIC_TEST_IDS.container)).toBeInTheDocument();
  });

  test('Unwanted results are correctly removed from search results', () => {
    //Our results have siphons node and meetups
    const initialResults = SIPHON_NODES.concat(MEETUP_NODES);
    //in our call to removeUnwantedResults, we say that only events are current (not meetups)
    //thus it should remove the meetups from the initial results
    const filteredResults = removeUnwantedResults(
      initialResults,
      EVENTS.concat(MEETUP_NODES),
      EVENTS,
    );
    expect(filteredResults.length).toBeLessThan(initialResults.length);
  });

  test('shows rocket chat results when authenticated', () => {
    queryString.parse.mockReturnValue({ q: 'foo' });
    useSearch.mockReturnValue([]);
    useSearchGate.mockReturnValue({ results: ROCKET_CHAT, loading: false });
    useAuthenticated.mockReturnValue(true);

    const { queryByTestId, rerender } = render(
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Index {...props} location={{ search: '?q=foo' }} />
        </ApolloProvider>
      </ThemeProvider>,
    );

    expect(queryByTestId(ROCKET_CHAT[0].id)).toBeInTheDocument();

    useAuthenticated.mockReturnValue(false);

    rerender();

    expect(queryByTestId(ROCKET_CHAT[0].id)).not.toBeInTheDocument();
  });

  test('shows github results when authenticated', () => {
    queryString.parse.mockReturnValue({ q: 'foo' });
    useSearch.mockReturnValue([]);
    useSearchGate.mockReturnValue({ results: GITHUB, loading: false });
    useAuthenticated.mockReturnValue(true);

    const { queryByTestId, rerender } = render(
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Index {...props} location={{ search: '?q=foo' }} />
        </ApolloProvider>
      </ThemeProvider>,
    );

    expect(queryByTestId(GITHUB[0].id)).toBeInTheDocument();

    useAuthenticated.mockReturnValue(false);

    rerender();

    expect(queryByTestId(ROCKET_CHAT[0].id)).not.toBeInTheDocument();
  });
});
