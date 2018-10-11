import React from 'react';
import { shallow } from 'enzyme';
import Learn from './learn';

describe('Learn Container', () => {
  test('it renders without crashing', () => {
    const data = {
      allSitePage: {
        edges: [
          {
            node: {
              id: '123',
              path: '/learn/path',
              fields: {
                linkName: 'path',
                path: '/learn/path',
              },
            },
          },
        ],
      },
    };
    const location = {
      pathname: '/learn',
    };

    const wrapper = shallow(<Learn data={data} location={location} />);
  });
});
