import React from 'react';
import { shallow } from 'enzyme';
import { Index } from '../../src/pages/index';
import { loadSiphonNodes } from '../../src/store/actions/actions';

describe('Index Container', () => {
  test('it matches snapshot', () => {
    const data = {
      pathfinder: {
        data: {
          organization: {
            repository: {
              resources: {
                // eslint-disable-next-line
                yaml:
                  "entries:\n- {details: \"test1\" , originalSource: ../index.html, category: 'What''s Going On Now', link: 'https://github.com/BCDevOps/BCDevOps-Guide', description: 'DevOps PaaS'}\n- {details: \"test2\", originalSource: ../index.html, category: Community, link: 'https://www.yammer.com/gov.bc.ca/#/threads/inGroup?type=in_group&feedId=11241672&view=all', description: 'DevOps Commons'}\n- {details: \"test3\", originalSource: ../index.html, category: Community, link: 'https://www.meetup.com/DevOps-Commons', description: 'DevOps Commons Meetups'}\n",
              },
            },
          },
        },
      },
      allDevhubSiphon: {
        edges: [
          {
            node: {
              id: '1bc91db3-c484-58b5-9700-55c22406950a',
              title: 'test',
              sourceName: 'Design System',
              pagePath: '/design-system/test',
              childMarkdownRemark: {
                frontmatter: {
                  title: '',
                  description:
                    'This is a test description that will be used as the intro blurb to a card',
                },
              },
            },
          },
        ],
      },
    };
    const loadSiphonNodes = jest.fn();
    const wrapper = shallow(<Index data={data} loadSiphonNodes={loadSiphonNodes} />);
    expect(wrapper).toMatchSnapshot();
  });
});
