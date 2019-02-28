import React from 'react';
import { shallow } from 'enzyme';
import groupBy from 'lodash/groupBy';
import { Index } from '../../src/pages/index';
import { DEFAULT_FILTER_GROUPS } from '../../__fixtures__/redux-fixtures';
import { SIPHON_NODES } from '../../__fixtures__/siphon-fixtures';
jest.mock('react-spinners', () => null);

describe('Index Container', () => {
  test('it matches snapshot', () => {
    // when you use graphql to load data into the component
    // all edges are an object of { node: [graphql object]}
    // the collections fixture is the true data without this extra object field
    // so we map it to resemble what graphql would do when passing the data attribute into
    // this component
    const nodes = SIPHON_NODES.map(c => ({ node: c }));
    const data = {
      allDevhubSiphon: {
        edges: nodes,
      },
    };
    // mocking redux actions
    const actions = {
      loadResources: jest.fn(),
      setSearchResults: jest.fn(),
      setSearchQuery: jest.fn(),
      setSearchBarTerms: jest.fn(),
      resetSearch: jest.fn(),
    };

    const location = {
      pathname: '/',
    };

    const wrapper = shallow(
      <Index
        resourcesLoaded={false}
        searchResultsLength={0}
        totalResources={SIPHON_NODES.length}
        searchWordLength={0}
        data={data}
        resourcesByType={groupBy(SIPHON_NODES, 'resource.type')}
        {...actions}
        location={location}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
