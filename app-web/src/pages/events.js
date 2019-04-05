import React from 'react';

import Layout from '../hoc/Layout';
import Title from '../components/Page/Title';
import PageContainer from '../components/Page/PageContainer';
import Main from '../components/Page/Main';
import { Event } from '../components/Event';
import { graphql } from 'gatsby';

export const TEST_IDS = {
  alert: 'events-container',
};

export const EventsPage = ({ data: { eventbriteEvents } }) => {
  const { name, description, organization, logo } = eventbriteEvents;
  return (
    <Layout>
      <Main>
        <Title
          title="Events"
          subtitle="Check out all the neat things happening within the digital Gov community."
        />
        <PageContainer>
          <Event
            title={name.text}
            description={description.html}
            organizer={organization}
            image={logo.original.url}
          />
        </PageContainer>
      </Main>
    </Layout>
  );
};

export const EventData = graphql`
  query EventsQuery {
    eventbriteEvents {
      id
      name {
        text
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
    }
  }
`;

export default EventsPage;
