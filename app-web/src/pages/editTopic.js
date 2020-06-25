import React from 'react';
import Layout from '../hoc/Layout';
import { useKeycloak } from '@react-keycloak/web';

// components
import { SEO } from '../components/SEO/SEO';
import { Title } from '../components/Page';
import Main from '../components/Page/Main';
import TopicForm from '../components/Form/TopicForm';

export const editTopic = () => {
  // eslint-disable-next-line
  const [keycloak] = useKeycloak();
  const isAuthenticated = keycloak && keycloak.authenticated;
  return (
    <Layout>
      <Main>
        <Title
          title="Content Contribution"
          subtitle={!isAuthenticated ? 'Login via IDIR or Github to continue' : 'Edit a topic'}
        />
        {isAuthenticated ? (
          <TopicForm operation="edit"></TopicForm>
        ) : (
          <h4 css={{ color: 'red' }}>Not Authorized</h4>
        )}
      </Main>
      <SEO title="Edit topic" />
    </Layout>
  );
};

export default editTopic;
