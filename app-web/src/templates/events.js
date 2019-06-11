import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../hoc/Layout';
import Aux from '../hoc/auxillary';
import Title from '../components/Page/Title';
import Main from '../components/Page/Main';
import NoEvents from '../components/UI/NoEvents';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { EVENTS, RESOURCE_TYPES } from '../constants/ui';
import { EMOTION_BOOTSTRAP_BREAKPOINTS } from '../constants/designTokens';
import { TOPICS } from '../constants/topics';
import Card from '../components/Cards/Card/Card';

export const TEST_IDS = {
  alert: 'events-container',
};

const Header = styled.div`
  margin-top: 30px;
`;

const Description = styled.div`
  padding-left: 3px;
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

//Formats eventbrite data into something usable along side collection resources by the card component
const formatEvents = events => {
  return events.map(event => {
    event = {
      unfurl: event.siphon.unfurl,
      resource: event.siphon.resource,
      id: event.siphon.id,
      start: event.start,
      venue: event.venue.name,
    };
    return event;
  });
};

export const EventsPage = ({ data: { allEventbriteEvents, allDevhubCollection } }) => {
  const events = flattenGatsbyGraphQL(allEventbriteEvents.edges);
  // filter out any events that are passed today
  const currentEvents = formatEvents(events.filter(e => e.start.daysFromNow <= 0));

  //Get all the cards on the site
  const cards = flattenGatsbyGraphQL(allDevhubCollection.edges);
  //filter to just get the cards for the Community and Events topic
  const communityCards = cards
    .filter(e => e.name === TOPICS.COMMUNITY_AND_EVENTS)
    .flatMap(e => e.childrenDevhubSiphon)
    .filter(e => e.resource.type === RESOURCE_TYPES.EVENTS);
  // previous events are sorted in descending order
  const previousEvents = formatEvents(
    events
      .filter(e => e.start.daysFromNow > 0)
      .sort((a, b) => a.start.daysFromNow / 1 - b.start.daysFromNow / 1)
      .splice(0, EVENTS.MAX_PAST_EVENTS),
  );

  return (
    <Layout>
      <Main>
        <Title title="Events" subtitle="Check out these upcoming events going on at the CSI Lab" />
        <Description>
          <p>
            Do you have BC Gov events that you would like to share on the <strong>Devhub</strong>?
            Please raise an issue{' '}
            <a href="https://github.com/bcgov/devhub-app-web/issues/new"> here</a> (requires a
            Github account).
          </p>
        </Description>
        {currentEvents.length > 0 ? (
          <Aux>
            <CardContainer>
              {communityCards.concat(currentEvents).map(e => (
                <Card
                  key={e.id}
                  type={e.resource.type}
                  title={e.unfurl.title}
                  description={e.unfurl.description}
                  image={e.unfurl.image}
                  link={e.resource.path}
                  event={e}
                />
              ))}
            </CardContainer>
          </Aux>
        ) : (
          <NoEvents />
        )}
        <Aux>
          <Header>
            <h2>Past Events</h2>
          </Header>
          <CardContainer pastEvents>
            {previousEvents.map(e => (
              <Card
                key={e.id}
                type={e.resource.type}
                title={e.unfurl.title}
                description={e.unfurl.description}
                image={e.unfurl.image}
                link={e.resource.path}
                event={e}
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
          siphon {
            unfurl {
              title
              image
              description
            }
            resource {
              type
              path
            }
            id
          }
          start {
            day: local(formatString: "DD")
            month: local(formatString: "MMM")
            year: local(formatString: "YYYY")
            daysFromNow: local(difference: "days")
          }
          venue {
            name
          }
        }
      }
    }
    allDevhubCollection {
      edges {
        node {
          id
          name
          description
          resources: childrenDevhubSiphon {
            id
          }
          childrenDevhubSiphon {
            id
            resource {
              type
              path
            }
            _metadata {
              position
            }
            unfurl {
              title
              description
              image
            }
          }
        }
      }
    }
  }
`;

export default EventsPage;
