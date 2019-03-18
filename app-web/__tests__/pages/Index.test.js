import React from 'react';
import { shallow } from 'enzyme';
import groupBy from 'lodash/groupBy';
import { getSearchResults } from '../../src/utils/helpers';
import { Index } from '../../src/pages/index';
import { SIPHON_NODES, COLLECTIONS } from '../../__fixtures__/siphon-fixtures';

jest.mock('react-spinners', () => null);
jest.mock('../../src/utils/helpers', () => ({
  getSearchResults: jest.fn(() => Promise.resolve({ '1': { id: '1' } })),
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
    setSearchResults: jest.fn(() => {
      return 'fofofo';
    }),
    setSearchQuery: jest.fn(() => {
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
    // stub in siphon nodes where none exist
    const resourcesByType = Object.keys(props.resourcesByType).reduce((resourcesByType, key) => {
      resourcesByType[key] = [];
      return resourcesByType;
    }, {});

    const wrapper = shallow(
      <Index
        {...props}
        loading={false}
        searchResultsExist={false}
        resourcesByType={resourcesByType}
      />,
    );
    expect(wrapper.find('Alert').exists()).toBeTruthy();
  });

  test('calls load resources', () => {
    shallow(<Index {...props} />);
    expect(actions.loadResources).toHaveBeenCalled();
  });

  test('when search props updates, it calls search function', async () => {
    const wrapper = shallow(<Index {...props} />);
    wrapper.setProps({ location: { ...location, search: '?q=foo' } });
    await wrapper.instance().componentDidMount();
    expect(getSearchResults).toHaveBeenCalled();
    expect(props.setSearchQuery).toHaveBeenCalled();
    expect(props.setSearchResults).toHaveBeenCalled();
  });
});
