import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { render } from 'react-testing-library';
import { addCurrentEventsToTopic, TopicsPage } from '../../src/pages/topics';
import { SIPHON_NODES, TOPICS, EVENTS, MEETUP_NODES } from '../../__fixtures__/nodes';
import theme from '../../theme';
import { getFirstNonExternalResource } from '../../src/utils/helpers';
jest.mock('react-spinners', () => null);

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
      allDevhubTopic: {
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

  test('Events concat with topics successfully', () => {
    const nodes = SIPHON_NODES.map(c => ({ node: c }));
    const topics = TOPICS.map(c => ({ node: c }));
    const events = EVENTS.map(c => ({ node: c }));

    const data = {
      allDevhubSiphon: {
        edges: nodes,
      },
      allDevhubTopic: {
        edges: topics,
      },
      allEventbriteEvents: {
        edges: events,
      },
    };
    // mocking redux actions
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

    //takes the initial length of the design system cards then calls our method to add events to the topic
    const initialLength = props.topics[0].childrenDevhubSiphon.length;
    const cardAndEvents = addCurrentEventsToTopic(TOPICS, EVENTS, 'Design System');
    const newLength = cardAndEvents[0].childrenDevhubSiphon.length;

    expect(newLength).toBeGreaterThan(initialLength);
  });
});
