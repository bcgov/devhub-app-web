import React from 'react';
import { render, cleanup } from 'react-testing-library';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import queryString from 'query-string';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import { ResourceType } from '../../src/templates/resourceType';
import { SIPHON_NODES, COLLECTIONS } from '../../__fixtures__/siphon-fixtures';
import { SELECT_RESOURCES_GROUPED_BY_TYPE } from '../../__fixtures__/selector-fixtures';
import { useSearch } from '../../src/utils/hooks';

import { TEST_IDS as NO_RESOURCE_TEST_IDS } from '../../src/components/UI/NoResources/NoResources';
import { SEARCH as SEARCH_MESSAGES } from '../../src/messages';
import DEFAULT_FILTERS, { FILTER_QUERY_PARAM } from '../../src/constants/filterGroups';
import { TEST_IDS as FILTER_TEST_IDS } from '../../src/components/Filters/FilterGroup/FilterGroup';

jest.mock('react-spinners', () => () => <div>loading</div>);

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
  // the collections fixture is the true data without this extra object field
  // so we map it to resemble what graphql would do when passing the data attribute into
  // this component
  const nodes = SIPHON_NODES.map(c => ({ node: c }));
  const collections = COLLECTIONS.map(c => ({ node: c }));
  const props = {
    data: {
      allDevhubSiphon: {
        edges: nodes,
      },
      allDevhubCollection: {
        edges: collections,
      },
      siteSearchIndex: {
        index: {},
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

    const newSiphonNodes = SIPHON_NODES.filter(node => node.resource.type !== 'Documentation').map(
      node => ({ node }),
    );

    const newprops = {
      ...props,
      data: {
        ...props.data,
        allDevhubSiphon: {
          edges: newSiphonNodes,
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
        <ResourceType {...props} location={{ search: '?q=foo' }} />
      </ThemeProvider>,
    );
    const startingNumCards = queryAllByText('Documentation').length;

    queryString.parse.mockReturnValue({ q: 'foo' });

    useSearch.mockReturnValue([{ id: SIPHON_NODES[0].id }]);
    rerender(
      <ThemeProvider theme={theme}>
        <ResourceType {...props} />
      </ThemeProvider>,
    );

    const endingNumCards = queryAllByText('Documentation').length;

    expect(startingNumCards).toBeGreaterThan(endingNumCards);
  });

  test('when searching, if there are zero results the alert box should show', () => {
    queryString.parse.mockReturnValue({ q: 'foo' });
    useSearch.mockReturnValue([]);
    const { queryByText } = render(
      <ThemeProvider theme={theme}>
        <ResourceType {...props} location={{ search: '?q=foo' }} />
      </ThemeProvider>,
    );
    const Alert = queryByText(SEARCH_MESSAGES.results.empty.defaultMessage);

    expect(Alert).toBeInTheDocument();
  });

  test('when there are filters, the resource count should reduce', () => {
    const firstFilterKey = DEFAULT_FILTERS[0].key;
    // mock out query string returning a 'filter'
    queryString.parse.mockReturnValue({});

    const { queryAllByText, rerender } = render(
      <ThemeProvider theme={theme}>
        <ResourceType {...props} />
      </ThemeProvider>,
    );

    const startingNumCards = queryAllByText('Documentation').length;

    queryString.parse.mockReturnValue({ [FILTER_QUERY_PARAM]: firstFilterKey });

    rerender(
      <ThemeProvider theme={theme}>
        <ResourceType
          {...props}
          location={{ search: `?${FILTER_QUERY_PARAM}}=${firstFilterKey}` }}
        />
      </ThemeProvider>,
    );

    const endingNumCards = queryAllByText('Documentation').length;

    expect(startingNumCards).toBeGreaterThan(endingNumCards);
  });

  test('when given the set of resource (by type) and a given filter is not applicable to the resources (not filterable), it should be disabled ', () => {
    queryString.parse.mockReturnValue({});
    // modify the siphon nodes so that none of them reference the first filter, we should expect then that that filter
    // should be disabled, but the remaining filters should be enabled
    const firstFilter = DEFAULT_FILTERS[0];
    const secondFilter = DEFAULT_FILTERS[1];
    const thirdFilter = DEFAULT_FILTERS[2];

    // these filters filter by attributes.personas which is an array value inside of the nodes
    const siphonNodesNotFilterableByFirstFilter = SIPHON_NODES.map(node => ({
      ...node,
      attributes: {
        ...node.attributes,
        personas: node.attributes.personas.filter(p => p !== firstFilter.value),
      },
    }));

    const { queryByTestId } = render(
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

    const FirstCheckBox = queryByTestId(`${FILTER_TEST_IDS.checkbox}-${firstFilter.key}`);
    const SecondCheckbox = queryByTestId(`${FILTER_TEST_IDS.checkbox}-${secondFilter.key}`);
    const ThirdCheckbox = queryByTestId(`${FILTER_TEST_IDS.checkbox}-${thirdFilter.key}`);

    expect(FirstCheckBox).toHaveAttribute('disabled');
    expect(SecondCheckbox).not.toHaveAttribute('disabled');
    expect(ThirdCheckbox).not.toHaveAttribute('disabled');
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
      attributes: {
        ...node.attributes,
        personas: [firstFilter.value], // set in so all nodes have the same filter value
      },
    }));

    const { queryByTestId } = render(
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
    const FirstCheckBox = queryByTestId(`${FILTER_TEST_IDS.checkbox}-${firstFilter.key}`);
    const SecondCheckbox = queryByTestId(`${FILTER_TEST_IDS.checkbox}-${secondFilter.key}`);
    const ThirdCheckbox = queryByTestId(`${FILTER_TEST_IDS.checkbox}-${thirdFilter.key}`);

    expect(FirstCheckBox).toHaveAttribute('disabled');
    expect(SecondCheckbox).toHaveAttribute('disabled');
    expect(ThirdCheckbox).toHaveAttribute('disabled');
  });
});
