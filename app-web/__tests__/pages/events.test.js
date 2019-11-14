import React from 'react';
import EventsPage from '../../src/templates/events';
import { render } from '@testing-library/react';
import { TOPICS, EVENTS } from '../../__fixtures__/nodes';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';

describe('Events Page', () => {
  it('renders without crashing', () => {
    const topics = TOPICS.map(c => ({ node: c }));
    const events = EVENTS.map(c => ({ node: c }));

    render(
      <ThemeProvider theme={theme}>
        <EventsPage
          data={{
            allEventbriteEvents: { edges: events },
            allTopicRegistryJson: { edges: topics },
          }}
        />
      </ThemeProvider>,
    );
  });
});
