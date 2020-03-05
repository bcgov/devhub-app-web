import React from 'react';
import { render, cleanup } from '@testing-library/react';
import queryString from 'query-string';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import { ResourceType } from '../../src/templates/resourceType';
import { SIPHON_NODES, TOPICS, GITHUB_RAW_NODES, EVENTS, JOURNEYS } from '../../__fixtures__/nodes';
import { SELECT_RESOURCES_GROUPED_BY_TYPE } from '../../__fixtures__/selector-fixtures';
import { useSearch } from '../../src/utils/hooks';

import { TEST_IDS as NO_RESOURCE_TEST_IDS } from '../../src/components/UI/NoResources/NoResources';
import { SEARCH as SEARCH_MESSAGES } from '../../src/messages';
import DEFAULT_FILTERS, { FILTER_QUERY_PARAM } from '../../src/constants/filterGroups';
import { TEST_IDS as FILTER_TEST_IDS } from '../../src/components/Filters/FilterGroup/FilterGroup';
import { RESOURCE_TYPES } from '../../src/constants/ui';
import { removeOtherResourceTypeResults } from '../../src/utils/helpers';
// this adds custom jest matchers from jest-dom
jest.mock('query-string');
// mock out layout
jest.mock('../../src/hoc/Layout.js', () => ({ children }) => children);
// mock out search hook
jest.mock('../../src/utils/hooks.js');

describe('Resource Type Template Page', () => {
  // mock out non redux selectors
  jest.doMock('../../src/utils/selectors.js', () => ({
    selectResourcesGroupedByType: jest.fn(() => SELECT_RESOURCES_GROUPED_BY_TYPE),
  }));
  // when you use graphql to load data into the component
  // all edges are an object of { node: [graphql object]}
  // the topics fixture is the true data without this extra object field
  // so we map it to resemble what graphql would do when passing the data attribute into
  // this component
  const nodes = SIPHON_NODES.map(c => ({ node: c }));
  const topics = TOPICS.map(c => ({ node: c }));
  const journeys = JOURNEYS.map(c => ({ node: c }));
  const githubRaw = GITHUB_RAW_NODES.map(c => ({ node: c }));
  const props = {
    data: {
      allDevhubSiphon: {
        edges: nodes,
      },
      allDevhubTopic: {
        edges: topics,
      },
      allGithubRaw: {
        edges: githubRaw,
      },
      allTopicRegistryJson: {
        edges: topics,
      },
      allJourneyRegistryJson: {
        edges: journeys,
      },
    },
    location: {
      search: '',
    },
    pageContext: {
      resourceTypeConst: 'DOCUMENTATION',
      resourceType: 'Documentation',
    },
  };

  afterEach(() => {
    cleanup();
    useSearch.mockClear();
  });

  test('it matches snapshot, when there are no resources for the given reosource type the no resource component shows ', () => {
    queryString.parse.mockReturnValue({});
    const { container, rerender, queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <ResourceType {...props} />
      </ThemeProvider>,
    );
    expect(container.firstChild).toMatchSnapshot();

    expect(queryByTestId(NO_RESOURCE_TEST_IDS.container)).not.toBeInTheDocument();

    const newSiphonNodes = SIPHON_NODES.filter(
      node => node.fields.resourceType !== RESOURCE_TYPES.DOCUMENTATION,
    ).map(node => ({ node }));

    const newprops = {
      ...props,
      data: {
        ...props.data,
        allDevhubSiphon: {
          edges: newSiphonNodes,
        },
        allGithubRaw: {
          edges: [], // simulating zero github raw nodes
        },
      },
    };

    rerender(
      <ThemeProvider theme={theme}>
        <ResourceType {...newprops} />
      </ThemeProvider>,
    );

    expect(queryByTestId(NO_RESOURCE_TEST_IDS.container)).toBeInTheDocument();
  });

  test('when searching, if there are results the number of cards should reduce', () => {
    queryString.parse.mockReturnValue({});
    useSearch.mockReturnValue([]);
    const { rerender, queryAllByText } = render(
      <ThemeProvider theme={theme}>
        <ResourceType {...props} />
      </ThemeProvider>,
    );
    const startingNumCards = queryAllByText(RESOURCE_TYPES.DOCUMENTATION).length;

    queryString.parse.mockReturnValue({ q: 'foo' });

    useSearch.mockReturnValue([{ id: SIPHON_NODES[0].id }]);
    rerender(
      <ThemeProvider theme={theme}>
        <ResourceType {...props} />
      </ThemeProvider>,
    );

    const endingNumCards = queryAllByText(RESOURCE_TYPES.DOCUMENTATION).length;

    expect(startingNumCards).toBeGreaterThan(endingNumCards);
  });

  test('when searching, if there are zero results the alert box should show', () => {
    queryString.parse.mockReturnValue({ q: 'foo' });
    useSearch.mockReturnValue([]);
    const { queryByText } = render(
      <ThemeProvider theme={theme}>
        <ResourceType {...props} />
      </ThemeProvider>,
    );
    const Alert = queryByText(SEARCH_MESSAGES.results.empty.defaultMessage);

    expect(Alert).toBeInTheDocument();
  });

  test('Cards are not duplicating after multiple searches', () => {
    queryString.parse.mockReturnValue({ q: 'foo' });
    useSearch.mockReturnValue([{ id: SIPHON_NODES[0].id }]);
    const { rerender, queryAllByText } = render(
      <ThemeProvider theme={theme}>
        <ResourceType {...props} />
      </ThemeProvider>,
    );

    const startingNumCards = queryAllByText(RESOURCE_TYPES.DOCUMENTATION).length;

    queryString.parse.mockReturnValue({ q: 'foo' });
    useSearch.mockReturnValue([{ id: SIPHON_NODES[0].id }]);
    rerender(
      <ThemeProvider theme={theme}>
        <ResourceType {...props} />
      </ThemeProvider>,
    );

    const endingNumCards = queryAllByText(RESOURCE_TYPES.DOCUMENTATION).length;

    expect(startingNumCards).toEqual(endingNumCards);
  });

  test('when there are filters, the resource count should reduce', () => {
    const firstFilterKey = DEFAULT_FILTERS[0].key;
    // mock out query string returning a 'filter'
    queryString.parse.mockReturnValue({});

    useSearch.mockReturnValue([]);
    const { queryAllByText, rerender } = render(
      <ThemeProvider theme={theme}>
        <ResourceType {...props} />
      </ThemeProvider>,
    );

    const startingNumCards = queryAllByText(RESOURCE_TYPES.DOCUMENTATION).length;

    queryString.parse.mockReturnValue({ [FILTER_QUERY_PARAM]: firstFilterKey });

    rerender(
      <ThemeProvider theme={theme}>
        <ResourceType {...props} />
      </ThemeProvider>,
    );

    const endingNumCards = queryAllByText(RESOURCE_TYPES.DOCUMENTATION).length;

    expect(startingNumCards).toBeGreaterThan(endingNumCards);
  });

  test('when given the set of resource (by type) and a given filter is not applicable to the resources (not filterable), it should be disabled ', () => {
    queryString.parse.mockReturnValue({});
    useSearch.mockReturnValue([]);
    // modify the siphon nodes so that none of them reference the first filter, we should expect then that that filter
    // should be disabled, but the remaining filters should be enabled
    const firstFilter = DEFAULT_FILTERS[0];
    const secondFilter = DEFAULT_FILTERS[1];
    const thirdFilter = DEFAULT_FILTERS[2];

    // these filters filter by attributes.personas which is an array value inside of the nodes
    const siphonNodesNotFilterableByFirstFilter = SIPHON_NODES.map(node => ({
      ...node,
      fields: {
        ...node.fields,
        personas: node.attributes.personas
          .filter(p => p !== firstFilter.value)
          .concat(secondFilter.value),
      },
    }));

    const githubRawNodesNotFilterableByFirstFilter = GITHUB_RAW_NODES.map(node => ({
      ...node,
      fields: {
        ...nodes.fields,
        personas: node.fields.personas
          .filter(p => p !== firstFilter.value)
          .concat(thirdFilter.value),
      },
    }));

    const { queryAllByTestId } = render(
      <ThemeProvider theme={theme}>
        <ResourceType
          {...props}
          data={{
            ...props.data,
            allDevhubSiphon: {
              edges: siphonNodesNotFilterableByFirstFilter.map(node => ({ node })),
            },
            allGithubRaw: {
              edges: githubRawNodesNotFilterableByFirstFilter.map(node => ({ node })),
            },
          }}
        />
      </ThemeProvider>,
    );

    const FirstCheckBox = queryAllByTestId(`${FILTER_TEST_IDS.checkbox}-${firstFilter.key}`);
    const SecondCheckbox = queryAllByTestId(`${FILTER_TEST_IDS.checkbox}-${secondFilter.key}`);
    const ThirdCheckbox = queryAllByTestId(`${FILTER_TEST_IDS.checkbox}-${thirdFilter.key}`);

    expect(FirstCheckBox[0]).toHaveAttribute('disabled');
    expect(SecondCheckbox[0]).not.toHaveAttribute('disabled');
    expect(ThirdCheckbox[0]).not.toHaveAttribute('disabled');
  });

  test('when given the set of resource (by type) where only 1 filter is filterable, it should be disabled because it is redundant ', () => {
    queryString.parse.mockReturnValue({});
    // modify the siphon nodes so that none of them reference the first filter, we should expect then that that filter
    // should be disabled, but the remaining filters should be enabled
    const firstFilter = DEFAULT_FILTERS[0];
    const secondFilter = DEFAULT_FILTERS[1];
    const thirdFilter = DEFAULT_FILTERS[2];

    // these filters filter by attributes.personas which is an array value inside of the nodes
    const siphonNodesNotFilterableByFirstFilter = SIPHON_NODES.map(node => ({
      ...node,
      fields: {
        ...node.fields,
        personas: [firstFilter.value], // set in so all nodes have the same filter value
      },
      attributes: {
        ...node.attributes,
      },
    }));

    const { queryAllByTestId } = render(
      <ThemeProvider theme={theme}>
        <ResourceType
          {...props}
          data={{
            ...props.data,
            allDevhubSiphon: {
              edges: siphonNodesNotFilterableByFirstFilter.map(node => ({ node })),
            },
          }}
        />
      </ThemeProvider>,
    );
    // technically the first checkbox is filterable, but because it is the only filter available
    // it is disabled since it is redundant
    const FirstCheckBox = queryAllByTestId(`${FILTER_TEST_IDS.checkbox}-${firstFilter.key}`);
    const SecondCheckbox = queryAllByTestId(`${FILTER_TEST_IDS.checkbox}-${secondFilter.key}`);
    const ThirdCheckbox = queryAllByTestId(`${FILTER_TEST_IDS.checkbox}-${thirdFilter.key}`);

    expect(FirstCheckBox[0]).toHaveAttribute('disabled');
    expect(SecondCheckbox[0]).toHaveAttribute('disabled');
    expect(ThirdCheckbox[0]).toHaveAttribute('disabled');
  });

  test('Search results from other resource types are removed from the results', () => {
    //Initial results contain various different resource types
    const initialResults = SIPHON_NODES.concat(EVENTS);
    //since we say the given resource type for this page is Components, events should be filtered out of the results
    const filteredResults = removeOtherResourceTypeResults(
      initialResults,
      'Components',
      SIPHON_NODES.concat(EVENTS),
    );
    expect(initialResults.length).toBeGreaterThan(filteredResults.length);
  });
});
