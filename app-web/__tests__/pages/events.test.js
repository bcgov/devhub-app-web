import React from 'react';
import EventsPage from '../../src/templates/events';
import { render } from '@testing-library/react';
import { EVENTS, SIPHON_NODES, GITHUB_RAW_NODES } from '../../__fixtures__/nodes';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';

describe('Events Page', () => {
  it('renders without crashing', () => {
    const siphon = SIPHON_NODES.map(c => ({ node: c }));
    const githubraw = GITHUB_RAW_NODES.map(c => ({ node: c }));
    const events = EVENTS.map(c => ({ node: c }));

    render(
      <ThemeProvider theme={theme}>
        <EventsPage
          data={{
            allEventbriteEvents: { edges: events },
            allGithubRaw: { edges: githubraw },
            allDevhubSiphon: { edges: siphon },
          }}
        />
      </ThemeProvider>,
    );
  });
});
