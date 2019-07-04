import React from 'react';
import { render, cleanup } from '@testing-library/react';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import queryString from 'query-string';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';
import { Index, TEST_IDS } from '../../src/pages/index';
import { SIPHON_NODES, COLLECTIONS } from '../../__fixtures__/siphon-fixtures';
import {
  SELECT_COLLECTIONS_WITH_RESOURCES_GROUPED_BY_TYPE,
  SELECT_RESOURCES_GROUPED_BY_TYPE,
} from '../../__fixtures__/selector-fixtures';
import { useSearch } from '../../src/utils/hooks';
import { TEST_IDS as COLLECTION_TEST_IDS } from '../../src/components/Home/CollectionsContainer';
import { TEST_IDS as RESOURCE_PREVIEW_TEST_IDS } from '../../src/components/Home/ResourcePreview';
import { getFirstNonExternalResource } from '../../src/utils/helpers';
jest.mock('query-string');
// mock out layout
jest.mock('../../src/hoc/Layout.js', () => ({ children }) => children);
// mock out search hook
jest.mock('../../src/utils/hooks.js');

jest.mock('../../src/utils/helpers.js');

getFirstNonExternalResource.mockReturnValue('foo');

describe('Home Page', () => {
  // mock out non redux selectors
  jest.doMock('../../src/utils/selectors.js', () => ({
    selectResourcesGroupedByType: jest.fn(() => SELECT_RESOURCES_GROUPED_BY_TYPE),
    selectCollectionsWithResourcesGroupedByType: jest.fn(
      () => SELECT_COLLECTIONS_WITH_RESOURCES_GROUPED_BY_TYPE,
    ),
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
  };

  afterEach(() => {
    cleanup();
  });

  test('it matches snapshot, when there is a search and no results an alert box shows up', () => {
    queryString.parse.mockReturnValue({});
    const { container, rerender, queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <Index {...props} />
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
        <Index {...props} />
      </ThemeProvider>,
    );
    expect(useSearch).toHaveBeenCalled();
    Alert = queryByTestId(TEST_IDS.alert);

    expect(Alert).toBeInTheDocument();
  });

  test('When a blank search is entered, cards and alerts dont show but topics/collections do', () => {
    queryString.parse.mockReturnValue({});
    const { container, rerender, queryByTestId, queryAllByTestId } = render(
      <ThemeProvider theme={theme}>
        <Index {...props} />
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
        <Index {...props} />
      </ThemeProvider>,
    );
    expect(useSearch).toHaveBeenCalled();
    Alert = queryByTestId(TEST_IDS.alert);

    expect(Alert).not.toBeInTheDocument();

    expect(queryByTestId(COLLECTION_TEST_IDS.container)).toBeInTheDocument();
    expect(queryAllByTestId(RESOURCE_PREVIEW_TEST_IDS.container).length).toBe(0);
    //The above changed to "toBe(0)" from "toBeGreaterThan(0)" as previews are no longer shown on the home page (unless a valid search has been made)
  });

  test('when searching, collections disappear if there are results', () => {
    queryString.parse.mockReturnValue({ q: 'foo' });
    useSearch.mockReturnValue([{ id: SIPHON_NODES[0].id }]);
    const { queryByTestId, queryAllByTestId } = render(
      <ThemeProvider theme={theme}>
        <Index {...props} />
      </ThemeProvider>,
    );

    expect(queryByTestId(COLLECTION_TEST_IDS.container)).not.toBeInTheDocument();
    expect(queryAllByTestId(RESOURCE_PREVIEW_TEST_IDS.container).length).toBeGreaterThan(0);
  });

  test('when there is no search, collections are visible', () => {
    queryString.parse.mockReturnValue({});
    useSearch.mockReturnValue([]);

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Index {...props} />
      </ThemeProvider>,
    );

    expect(getByTestId(COLLECTION_TEST_IDS.container)).toBeInTheDocument();
  });
});
