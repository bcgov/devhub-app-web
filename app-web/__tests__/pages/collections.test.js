import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { render } from 'react-testing-library';
import { CollectionsPage } from '../../src/pages/collections';
import { SIPHON_NODES, COLLECTIONS } from '../../__fixtures__/siphon-fixtures';
import theme from '../../theme';
import { getFirstNonExternalResource } from '../../src/utils/helpers';
jest.mock('react-spinners', () => null);

jest.mock('../../src/utils/helpers.js');

getFirstNonExternalResource.mockReturnValue('foo');

describe('Collections Container', () => {
  test('it matches snapshot', () => {
    // when you use graphql to load data into the component
    // all edges are an object of { node: [graphql object]}
    // the collections fixture is the true data without this extra object field
    // so we map it to resemble what graphql would do when passing the data attribute into
    // this component
    const nodes = SIPHON_NODES.map(c => ({ node: c }));
    const collections = COLLECTIONS.map(c => ({ node: c }));

    const data = {
      allDevhubSiphon: {
        edges: nodes,
      },
      allDevhubCollection: {
        edges: collections,
      },
    };
    // mocking redux actions
    const actions = {
      loadResources: jest.fn(),
      setSearchResults: jest.fn(),
      setSearchQuery: jest.fn(),
      setSearchBarTerms: jest.fn(),
      resetSearch: jest.fn(),
      setResourceType: jest.fn(),
    };
    const props = {
      data,
      collections: COLLECTIONS.map(c => ({
        ...c,
        resources: c.resources.map(r => ({ ...r, resource: { path: '/' } })),
      })),
      location: {
        pathname: '/collections',
      },
      resourcesLoaded: false,
    };

    const { container } = render(
      <ThemeProvider theme={theme}>
        <CollectionsPage {...props} {...actions} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
