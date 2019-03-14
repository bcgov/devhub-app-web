import React from 'react';
import { shallow } from 'enzyme';
import groupBy from 'lodash/groupBy';
import { Index } from '../../src/pages/index';
import { SIPHON_NODES, COLLECTIONS } from '../../__fixtures__/siphon-fixtures';

jest.mock('react-spinners', () => null);
jest.mock('../../src/utils/helpers', () => ({
  getSearchResults: jest.fn(() => ({ '1': { id: '1' } })),
}));
jest.mock('query-string', () => ({
  parse: jest.fn(() => ({ q: 'foo' })),
}));

describe('Index Container', () => {
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
    setSearchQuery: jest.fn(() => {
      console.log('called search query');
      return true;
    }),
    setSearchBarTerms: jest.fn(),
    resetSearch: jest.fn(),
    setResourceType: jest.fn(),
  };

  const location = {
    pathname: '/',
  };

  const props = {
    loading: false,
    resourcesLoaded: false,
    searchResultsLength: 0,
    totalResources: SIPHON_NODES.length,
    searchWordLength: 0,
    data: data,
    query: '',
    collections: [],
    resourcesByType: groupBy(SIPHON_NODES, 'resource.type'),
    location,
    ...actions,
  };

  test('it matches snapshot', () => {
    const wrapper = shallow(<Index {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('when loading, loading indicator is visible', () => {
    const wrapper = shallow(<Index {...props} loading={true} />);
    expect(wrapper.find('Loading').exists()).toBeTruthy();
  });

  test('when no search results the no search results message is visible', () => {
    const wrapper = shallow(
      <Index {...props} loading={false} searchResultsLength={0} searchWordLength={5} />,
    );
    expect(wrapper.find('Alert').exists()).toBeTruthy();
  });

  test('calls load resources', () => {
    shallow(<Index {...props} />);
    expect(actions.loadResources).toHaveBeenCalled();
  });

  test('when search props updates, it calls search functions', () => {
    const wrapper = shallow(<Index {...props} />);
    // mock out lunrs global object
    window.__LUNR__ = { __loaded: Promise.resolve(null) };
    try {
      wrapper.setProps({ resourcesLoaded: true });
    } catch (e) {
      console.error(e);
    }
    expect(actions.setSearchQuery).toHaveBeenCalled();
    expect(actions.setSearchResults).toHaveBeenCalledWith({ '1': { id: '1' } });
  });
});
