import React, { useState } from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Layout from '../hoc/Layout';
import { LinkContainer } from '../components/Home/index';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { EVENTS } from '../constants/ui';
import Card from '../components/Card/Card';
import Row from '../components/Card/Row';
import Col from '../components/Card/Column';
import { formatEvents, CardContainer } from './events';
import { SeeMoreP } from '../components/Home/ResourcePreview';

const Header = styled.div`
  margin-top: 30px;
  margin-left: 30px;
`;

//this is a new page for past event, instead of putting all events in previous page and slow loading,
//we now put them together and allows current upcoming page load faster while still let user to review
// those pasted events
export const PastEventsPage = ({ data: { allEventbriteEvents } }) => {
  const events = flattenGatsbyGraphQL(allEventbriteEvents.edges);
  let [showCount, setCount] = useState(EVENTS.MAX_PAST_EVENTS);
  let [seeMoreResults, setSeeMore] = useState(true);
  const extraItemsToShow = 12; //two more row of card in the page after click 'see more'
  const updateCount = () => {
    //show 6 more results
    setCount(showCount + extraItemsToShow);
    setSeeMore(true);
    if (showCount >= events.length) {
      //hide the 'see more results' when there isn't more to show
      setSeeMore(false);
    }
  };
  //   previous events are sorted in descending order

  const previousEvents = formatEvents(events)
    .filter(e => e.start.daysFromNow > 0)
    .sort((a, b) => a.start.daysFromNow / 1 - b.start.daysFromNow / 1);
  return (
    <Layout>
      <Header>
        <h2>Past Events</h2>
      </Header>
      <CardContainer>
        <Row>
          {previousEvents.slice(0, showCount).map(e => (
            <Col
              key={e.id}
              style={{
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              <Card
                resourceType={e.fields.resourceType}
                key={e.id}
                title={e.fields.title}
                description={e.fields.description}
                image={e.fields.image}
                link={e.fields.standAlonePath}
                event={e}
              />
            </Col>
          ))}
        </Row>
      </CardContainer>
      <LinkContainer>
        {seeMoreResults && <SeeMoreP onClick={() => updateCount()}>See More Results</SeeMoreP>}
      </LinkContainer>
    </Layout>
  );
};
export const EventData = graphql`
  query PastEventsQuery {
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
  }
`;
export default PastEventsPage;
