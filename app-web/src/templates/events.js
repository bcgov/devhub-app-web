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
import { EMOTION_BOOTSTRAP_BREAKPOINTS } from '../constants/ui';
export const TEST_IDS = {
  alert: 'events-container',
};

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
  const previousEvents = events.filter(e => e.start.daysFromNow > 0);

  return (
    <Layout>
      <Main>
        <Title title="Current Events" subtitle="Click on a card to view it in Eventbrite" />
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
      sort: { fields: [start___local], order: DESC }
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
