import React from 'react';
import { shallow } from 'enzyme';
import { Index } from '../../src/pages/index';
import { DEFAULT_FILTER_GROUPS, COLLECTIONS } from '../../__fixtures__/redux-fixtures';
describe('Index Container', () => {
  test('it matches snapshot', () => {
    // when you use graphql to load data into the component
    // all edges are an object of { node: [graphql object]}
    // the collections fixture is the true data without this extra object field
    // so we map it to resemble what graphql would do when passing the data attribute into
    // this component
    const nodes = COLLECTIONS.map(c => ({ node: c }));
    const data = {
      allDevhubSiphonCollection: {
        edges: nodes,
      },
    };
    const loadSiphonCollections = jest.fn();
    const filterCollectionsByResourceType = jest.fn();
    const location = {
      pathname: '/',
    };

    const wrapper = shallow(
      <Index
        data={data}
        collections={COLLECTIONS}
        loadCollections={loadSiphonCollections}
        location={location}
        filters={DEFAULT_FILTER_GROUPS}
        filterCollectionsByResourceType={filterCollectionsByResourceType}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
