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
  if (isAuthenticated === false){
    return(
      <Layout>
        <SEO title="Content Contribution"></SEO>
        <Main>
          <Title title="Content Contribution" subtitle="Login via IDIR or Github to continue"/>
        </Main>
      </Layout>
    )
  }
  else{
    return (
      <Layout>
        <SEO title="Content Contribution" />
        <Main>
          <Title
            title="Content Contribution"
            subtitle="Add a topic to the Devhub"
          />
          <TopicForm></TopicForm>
        </Main>
      </Layout>
    );
   }
};

export default contentContribution;
