import React from 'react';
import { shallow } from 'enzyme';
import groupBy from 'lodash/groupBy';
import { CollectionsPage } from '../../src/pages/collections';
import { DEFAULT_FILTER_GROUPS } from '../../__fixtures__/redux-fixtures';
import { SIPHON_NODES, COLLECTIONS } from '../../__fixtures__/siphon-fixtures';
jest.mock('react-spinners', () => null);

describe('Index Container', () => {
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
      allDevhubSiphonCollection: {
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

    const location = {
      pathname: '/',
    };

    const wrapper = shallow(
      <CollectionsPage
        resourcesLoaded={false}
        searchResultsLength={0}
        totalResources={SIPHON_NODES.length}
        searchWordLength={0}
        data={data}
        filters={DEFAULT_FILTER_GROUPS}
        resourcesByType={groupBy(SIPHON_NODES, 'resource.type')}
        {...actions}
        location={location}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
