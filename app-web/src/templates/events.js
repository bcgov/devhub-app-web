import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../hoc/Layout';
import Aux from '../hoc/auxillary';
import Title from '../components/Page/Title';
import Main from '../components/Page/Main';
import NoEvents from '../components/UI/NoEvents';
import { Event } from '../components/Event';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { EMOTION_BOOTSTRAP_BREAKPOINTS, EVENTS } from '../constants/ui';

export const TEST_IDS = {
  alert: 'events-container',
};

const Blockqoute = styled.blockquote`
  padding: 10px;
  background-color: #f0f0f0;
  font-size: 14px;
  font-style: oblique;
  border-left: 2px solid #38588a;
  margin: 5px;
`;

const CardContainer = styled.div`
  display: flex;
  max-width: 1000px;
  flex-flow: row wrap;
  justify-content: center;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.sm} {
    justify-content: flex-start;
  }
  article {
    opacity: ${({ pastEvents }) => (pastEvents ? '.65' : '1')};
  }
`;

export const EventsPage = ({ data: { allEventbriteEvents } }) => {
  const events = flattenGatsbyGraphQL(allEventbriteEvents.edges);
  // filter out any events that are passed today
  const currentEvents = events.filter(e => e.start.daysFromNow <= 0);
  // previous events are sorted in descending order
  const previousEvents = events
    .filter(e => e.start.daysFromNow > 0)
    .sort((a, b) => a.start.daysFromNow / 1 - b.start.daysFromNow / 1)
    .splice(0, EVENTS.MAX_PAST_EVENTS);

  return (
    <Layout>
      <Main>
        <Title title="Events" subtitle="Check out these upcoming events going on at the CSI Lab" />
        <Blockqoute>
          <p>
            Do you have BC Gov events that you would like to share on the <strong>Devhub</strong>?
            Please raise an issue{' '}
            <a href="https://github.com/bcgov/devhub-app-web/issues/new"> here</a> (requires a
            Github account).
          </p>
        </Blockqoute>
        {currentEvents.length > 0 ? (
          <Aux>
            <CardContainer>
              {currentEvents.map(e => (
                <Event
                  key={e.id}
                  title={e.name.text}
                  startDay={e.start.day}
                  startMonth={e.start.month}
                  where={e.venue.name}
                  image={e.logo !== null && e.logo.original.url}
                  url={e.url}
                />
              ))}
            </CardContainer>
          </Aux>
        ) : (
          <NoEvents />
        )}
        <Aux>
          <h2>Past Events</h2>
          <CardContainer pastEvents>
            {previousEvents.map(e => (
              <Event
                key={e.id}
                title={e.name.text}
                startDay={e.start.day}
                startMonth={e.start.month}
                startYear={e.start.year}
                where={e.venue.name}
                image={e.logo !== null && e.logo.original.url}
                url={e.url}
              />
            ))}
          </CardContainer>
        </Aux>
      </Main>
    </Layout>
  );
};

export const EventData = graphql`
  query EventsQuery {
    allEventbriteEvents(
      sort: { fields: [start___local], order: ASC }
      filter: { shareable: { eq: true } }
    ) {
      edges {
        node {
          id
          name {
            text
          }
          url
          start {
            day: local(formatString: "DD")
            month: local(formatString: "MMM")
            year: local(formatString: "YYYY")
            daysFromNow: local(difference: "days")
          }
          description {
            html
          }
          organization
          logo {
            original {
              url
            }
          }
          venue {
            name
          }
        }
      }
    }
  }
`;

export default EventsPage;
