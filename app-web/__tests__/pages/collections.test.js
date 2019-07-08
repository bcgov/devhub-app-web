import React from 'react';
import { ThemeProvider } from 'emotion-theming';
<<<<<<< HEAD
import { render } from 'react-testing-library';
import { addCurrentEventsToCollection, CollectionsPage } from '../../src/pages/collections';
=======
import { render } from '@testing-library/react';
import { addCurrentEventsToCollection, CollectionsPage } from '../../src/pages/topics';
>>>>>>> Changing the page route from /collections to /topics
import {
  SIPHON_NODES,
  COLLECTIONS,
  EVENTS,
  MEETUP_NODES,
} from '../../__fixtures__/siphon-fixtures';
import theme from '../../theme';
import { getFirstNonExternalResource } from '../../src/utils/helpers';
jest.mock('react-spinners', () => null);

jest.mock('../../src/utils/helpers.js');

getFirstNonExternalResource.mockReturnValue('foo');

describe('Collections Container', () => {
  test('it matches snapshot', () => {
    // when you use graphql to load data into the component
    // all edges are an object of { node: [graphql object]}
    // the collections fixture is the true data without this extra object field
    // so we map it to resemble what graphql would do when passing the data attribute into
    // this component
    const nodes = SIPHON_NODES.map(c => ({ node: c }));
    const collections = COLLECTIONS.map(c => ({ node: c }));
    const events = EVENTS.map(c => ({ node: c }));
    const meetups = MEETUP_NODES.map(c => ({ node: c }));
    const data = {
      allDevhubSiphon: {
        edges: nodes,
      },
      allDevhubCollection: {
        edges: collections,
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
      collections: COLLECTIONS.map(c => ({
        ...c,
        resources: c.resources.map(r => ({ ...r, resource: { path: '/' } })),
      })),
      location: {
        pathname: '/collections',
      },
      resourcesLoaded: false,
    };

    const { container } = render(
      <ThemeProvider theme={theme}>
        <CollectionsPage {...props} {...actions} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('Events concat with collections successfully', () => {
    const nodes = SIPHON_NODES.map(c => ({ node: c }));
    const collections = COLLECTIONS.map(c => ({ node: c }));
    const events = EVENTS.map(c => ({ node: c }));

    const data = {
      allDevhubSiphon: {
        edges: nodes,
      },
      allDevhubCollection: {
        edges: collections,
      },
      allEventbriteEvents: {
        edges: events,
      },
    };
    // mocking redux actions
    const props = {
      data,
      collections: COLLECTIONS.map(c => ({
        ...c,
        resources: c.resources.map(r => ({ ...r, resource: { path: '/' } })),
      })),
      location: {
        pathname: '/collections',
      },
      resourcesLoaded: false,
    };

    //takes the initial length of the design system cards then calls our method to add events to the topic
    const initialLength = props.collections[0].childrenDevhubSiphon.length;
    const cardAndEvents = addCurrentEventsToCollection(COLLECTIONS, EVENTS, 'Design System');
    const newLength = cardAndEvents[0].childrenDevhubSiphon.length;

    expect(newLength).toBeGreaterThan(initialLength);
  });
});
