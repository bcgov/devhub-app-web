import React, { useState } from 'react';
import Layout from '../hoc/Layout';
import { useKeycloak } from '@react-keycloak/web';

// components
import { SEO } from '../components/SEO/SEO';
import { Title } from '../components/Page';
import Main from '../components/Page/Main';
import TopicForm from '../components/Form/TopicForm';

const contentContribution = () => {
  const [keycloak] = useKeycloak();
  const isAuthenticated = keycloak && keycloak.authenticated;
    return (
      <Layout>
        <SEO title="Content Contribution" />
        <Main>
          <Title
            title="Content Contribution"
            subtitle= {!isAuthenticated ? 'Login via IDIR or Github to continue' : 'Add a topic to the Devhub'}
          />
          {isAuthenticated ? <TopicForm></TopicForm> : ''}
        </Main>
      </Layout>
    );
};

export default contentContribution;
