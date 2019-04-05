import React from 'react';
import styled from '@emotion/styled';

import Layout from '../hoc/Layout';
import Title from '../components/Page/Title';

import CardsContainer from '../components/Page/CardsContainer';
import PageContainer from '../components/Page/PageContainer';
import Main from '../components/Page/Main';
import { Event } from '../components/Cards/Card/Event';

export const TEST_IDS = {
  alert: 'events-container',
};

export const EventsPage = () => {
  return (
    <Layout>
      <Main>
        <Title
          title="Events"
          subtitle="Check out all the neat things happening within the digital Gov community."
        />
        <PageContainer>
          <Event title="Openshift 101" description="learn openshift" />
        </PageContainer>
      </Main>
    </Layout>
  );
};

export default EventsPage;
