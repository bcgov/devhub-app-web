import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { render } from '@testing-library/react';
import { TopicsPage } from '../../src/pages/topics';
import { SIPHON_NODES, TOPICS, EVENTS, MEETUP_NODES } from '../../__fixtures__/nodes';
import theme from '../../theme';
import { getFirstNonExternalResource } from '../../src/utils/helpers';

jest.mock('../../src/utils/helpers.js');

getFirstNonExternalResource.mockReturnValue('foo');

describe('Topics Container', () => {
  test('it matches snapshot', () => {
    // when you use graphql to load data into the component
    // all edges are an object of { node: [graphql object]}
    // the topics fixture is the true data without this extra object field
    // so we map it to resemble what graphql would do when passing the data attribute into
    // this component
    const nodes = SIPHON_NODES.map(c => ({ node: c }));
    const topics = TOPICS.map(c => ({ node: c }));
    const events = EVENTS.map(c => ({ node: c }));
    const meetups = MEETUP_NODES.map(c => ({ node: c }));
    const data = {
      allDevhubSiphon: {
        edges: nodes,
      },
      allTopicRegistryJson: {
        edges: topics,
      },
      allEventbriteEvents: {
        edges: events,
      },
      allMeetupGroup: {
        edges: meetups,
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
      topics: TOPICS.map(c => ({
        ...c,
        resources: c.resources.map(r => ({ ...r, resource: { path: '/' } })),
      })),
      location: {
        pathname: '/topics',
      },
      resourcesLoaded: false,
    };

    const { container } = render(
      <ThemeProvider theme={theme}>
        <TopicsPage {...props} {...actions} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
