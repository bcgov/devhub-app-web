import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../hoc/Layout';
import Aux from '../hoc/auxillary';
import Title from '../components/Page/Title';
import Main from '../components/Page/Main';
import NoEvents from '../components/UI/NoEvents';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { RESOURCE_TYPES } from '../constants/ui';
import { EMOTION_BOOTSTRAP_BREAKPOINTS } from '../constants/designTokens';
import { TOPICS } from '../constants/topics';
import Card from '../components/Card/Card';
import { ChevronLink } from '../components/UI/Link';
export const TEST_IDS = {
  alert: 'events-container',
};

// const Header = styled.div`
//   margin-top: 30px;
// `;

const Description = styled.div`
  padding-left: 3px;
`;

export const CardContainer = styled.div`
  display: flex;
  max-width: 1000px;
  flex-flow: row wrap;
  justify-content: center;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.sm} {
    justify-content: flex-start;
  }
`;

//Formats eventbrite data into something usable by the card component
export const formatEvents = events => {
  return events.map(event => {
    return {
      ...event,
      unfurl: event.siphon.unfurl,
      resource: event.siphon.resource,
      id: event.siphon.id,
      start: event.start,
      venue: event.venue.name,
    };
  });
};

//Formats meetup data into the identical format as the formatEvents function
export const formatMeetUps = meetups => {
  return meetups.map(meetup => {
    return {
      ...meetup,
      unfurl: meetup.siphon.unfurl,
      resource: meetup.siphon.resource,
      id: meetup.siphon.id,
      venue: meetup.fields.location,
      start: {
        day: meetup.day,
        month: meetup.month,
        year: meetup.year,
        daysFromNow: meetup.daysFromNow,
      },
    };
  });
};

export const EventsPage = ({ data: { allEventbriteEvents, allTopicRegistryJson } }) => {
  const events = flattenGatsbyGraphQL(allEventbriteEvents.edges);
  /*const meetUps = formatMeetUps(
    flattenGatsbyGraphQL(allMeetupGroup.edges).flatMap(meetups => {
      return meetups.childrenMeetupEvent;
    }),
  );*/
  // filter out any events that are passed today
  const currentEvents = formatEvents(events.filter(e => e.start.daysFromNow <= 0));
  //const currentMeetups = meetUps.filter(e => e.start.daysFromNow <= 0);
  //Get all the cards on the site
  const cards = flattenGatsbyGraphQL(allTopicRegistryJson.edges);
  //filter to just get the cards for the Community and Events topic
  const communityCards = cards
    .filter(e => e.name === TOPICS.COMMUNITY_AND_EVENTS)
    .flatMap(e => e.connectsWith)
    .filter(e => e.fields.resourceType === RESOURCE_TYPES.EVENTS);
  //sort all the info so that event show up from soonest to farthest away
  const currentEventsMeetUpsAndCards = communityCards.concat(
    currentEvents.sort((a, b) => b.start.daysFromNow - a.start.daysFromNow),
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
          <p>
            Click here for
            <ChevronLink to="/past-events">past events</ChevronLink>
          </p>
        </Description>
        {currentEvents.length > 0 ? (
          <Aux>
            <CardContainer>
              {currentEventsMeetUpsAndCards.map(e => {
                return (
                  <Card
                    resourceType={e.fields.resourceType}
                    key={e.id}
                    title={e.fields.title}
                    description={e.fields.description}
                    image={e.fields.image}
                    link={e.fields.standAlonePath}
                    event={e}
                  />
                );
              })}
            </CardContainer>
          </Aux>
        ) : (
          <NoEvents />
        )}
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
          fields {
            resourceType
            title
            description
            pagePaths
            image
            standAlonePath
          }
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
    #Commented out since Meetup no longer has an API and has switched to OAUTH, but the plugin we use may be updated
    #more info at https://chat.pathfinder.gov.bc.ca/channel/general?msg=MdAyQzrPRPpQt382o
    #allMeetupGroup {
    #edges {
    #node {
    #childrenMeetupEvent {
    #siphon {
    #unfurl {
    #title
    #description
    #image
    #}
    #resource {
    #type
    #path
    #}
    #id
    #}
    # id
    #fields {
    #location
    #}
    # day: local_date(formatString: "DD")
    # month: local_date(formatString: "MMM")
    # year: local_date(formatString: "YYYY")
    # daysFromNow: local_date(difference: "days")
    # status
    # link
    # description
    # venue {
    # address_1
    # }
    # fields {
    #  location
    #  description
    #  link
    #  resourceType
    #  title
    #  pagePaths
    #  image
    #  standAlonePath
    # }
    # }
    # }
    # }
    # }
    allTopicRegistryJson {
      edges {
        node {
          id
          name
          description
          connectsWith {
            ...DevhubNodeConnection
          }
        }
      }
    }
  }
`;

export default EventsPage;
