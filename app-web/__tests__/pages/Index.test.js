import React from 'react';
import { shallow } from 'enzyme';
import { Index } from '../../src/pages/index';
import { DEFAULT_FILTER_GROUPS, COLLECTIONS } from '../../__fixtures__/redux-fixtures';
describe('Index Container', () => {
  test('it matches snapshot', () => {
    const nodes = COLLECTIONS.map(c => ({ node: c }));
    const data = {
      allDevhubSiphonCollection: {
        edges: nodes,
      },
    };
    const loadSiphonCollections = jest.fn();
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
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
