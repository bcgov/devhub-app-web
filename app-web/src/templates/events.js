import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../hoc/Layout';
import Aux from '../hoc/auxillary';
import { Title } from '../components/Page';
import Main from '../components/Page/Main';
import NoEvents from '../components/UI/NoEvents';
import { Event } from '../components/Event';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { EVENTS } from '../constants/ui';
import { EMOTION_BOOTSTRAP_BREAKPOINTS } from '../constants/designTokens';
import CardCarousel from '../components/CardCarousel/CardCarousel';
//import cloneDeep from 'lodash/cloneDeep';
import { Container, LinkContainer } from '../components/home/index';
import { ChevronLink } from '../components/UI/Link';
//import ResourcePreview from '../components/home/ResourcePreview';
//import CollectionsContainer from '../components/Home/CollectionsContainer';
//import merge from 'lodash/merge';

export const TEST_IDS = {
  alert: 'events-container',
};
const ContainerBoarder = styled(Container)`
  max-width: 862px;
  margin: 20px 0;
`;

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

export const EventsPage = ({ data: { allEventbriteEvents, allDevhubSiphon } }) => {
  const events = flattenGatsbyGraphQL(allEventbriteEvents.edges);
  // filter out any events that are passed today
  const currentEvents = events.filter(e => e.start.daysFromNow <= 0);

  //Get all the cards on the site
  const cards = flattenGatsbyGraphQL(allDevhubSiphon.edges);
  //filter to just get the cards for the Community Enablers and Events topic
  const communityCards = cards.filter(
    e => e.source.displayName === 'Community and Events' || e.name === 'Community and Events',
  );

  //Take the eventbrite events and format their data to be able to be used as a card
  //let currentCards = cloneDeep(currentEvents);
  /*currentCards = currentCards.filter(e => delete e.venue).filter(e => delete e.organization);
  currentCards.forEach(element => {
    element.unfurl = {
      title: element.name.text,
      image: element.logo.original.url,
      description:
        element.start.month +
        ' ' +
        element.start.day +
        ': ' +
        element.description.html.replace(/<[^>]+>/g, ''), //this regular expression removes any sort of HTML related tag
    };
    element.resource = { type: 'Self-Service Tools', path: element.url };
  });*/

  //make this into a function in UTILS
  const currentCards = currentEvents.map(element => {
    const EventCards = {
      unfurl: {
        title: element.name.text,
        image: element.logo.original.url,
        description:
          element.start.month +
          ' ' +
          element.start.day +
          ': ' +
          element.description.html.replace(/<[^>]+>/g, ''), //this regular expression removes any sort of HTML related tag
      },
      resource: {
        type: 'Events',
        path: element.url,
      },
    };
    return EventCards;
  });

  //add Community and Events cards with the event cards so that they can be used in the same carousel
  //let i = 0;
  const finalCards = communityCards.concat(currentCards);
  /*currentCards.forEach(element => {
    communityCards.push(currentCards[i]);
    i++;
  });*/

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
        <ContainerBoarder>
          <CardCarousel resources={finalCards} />
          <LinkContainer>
            <ChevronLink to={'/Community-Enablers-and-Events/BC-Gov-Development-Community-Events'}>
              View
            </ChevronLink>
          </LinkContainer>
        </ContainerBoarder>
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
    allDevhubSiphon {
      edges {
        node {
          id
          name
          owner
          parent {
            id
          }
          _metadata {
            position
          }
          attributes {
            personas
          }
          source {
            displayName
            sourcePath
            type
            name
          }
          resource {
            path
            type
          }
          unfurl {
            title
            description
            type
            image
            author
          }
        }
      }
    }
  }
`;

export default EventsPage;
