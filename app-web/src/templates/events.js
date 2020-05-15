/*
Copyright 2019 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/
import React from 'react';
import { graphql } from 'gatsby';
import uniqBy from 'lodash/uniqBy';
import styled from '@emotion/styled';
import Layout from '../hoc/Layout';
import Title from '../components/Page/Title';
import Main from '../components/Page/Main';
import NoEvents from '../components/UI/NoEvents';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { EMOTION_BOOTSTRAP_BREAKPOINTS } from '../constants/designTokens';
import { ChevronLink } from '../components/UI/Link';
import Row from '../components/Card/Row';
import CardsInColumns from '../components/Card/CardsInColumns';
export const TEST_IDS = {
  alert: 'events-container',
};

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

// Formats eventbrite data into something usable by the card component
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

export const EventsPage = ({ data: { allEventbriteEvents, allDevhubSiphon, allGithubRaw } }) => {
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
  const staticEvents = flattenGatsbyGraphQL(allDevhubSiphon.edges).concat(
    flattenGatsbyGraphQL(allGithubRaw.edges),
  );

  //sort all the info so that event show up from soonest to farthest away
  let currentEventsMeetUpsAndCards = currentEvents
    .sort((a, b) => b.start.daysFromNow - a.start.daysFromNow)
    .concat(staticEvents);

  // community and event cards to carry a light reference to eventbrite cards, essentially titles and node fields
  // these need to be removed

  currentEventsMeetUpsAndCards = uniqBy(currentEventsMeetUpsAndCards, 'id');

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
          <CardContainer>
            <Row>
              <CardsInColumns cards={currentEventsMeetUpsAndCards} />
            </Row>
          </CardContainer>
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
      sort: { fields: [start___local], order: DESC }
      filter: { shareable: { eq: true } }
      limit: 50
    ) {
      edges {
        node {
          id
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
    allDevhubSiphon(
      filter: { source: { type: { eq: "web" } }, fields: { resourceType: { eq: "Events" } } }
    ) {
      edges {
        node {
          fields {
            resourceType
            title
            description
            standAlonePath
            path
          }
          id
        }
      }
    }
    allGithubRaw(filter: { fields: { resourceType: { eq: "Events" } } }) {
      edges {
        node {
          fields {
            resourceType
            title
            description
            standAlonePath
          }
          id
        }
      }
    }
  }
`;

export default EventsPage;
