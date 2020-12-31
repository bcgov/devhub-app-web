import React, { useState } from 'react';
import Layout from '../hoc/Layout';
import { useKeycloak } from '@react-keycloak/web';

// components
import { SEO } from '../components/SEO/SEO';
import { Title } from '../components/Page';
import Main from '../components/Page/Main';
import TopicForm from '../components/Form/TopicForm';
import { convertToRegistryFormat } from '../utils/contentContribution';
import axios from 'axios';
import { API_ROUTES } from '../constants/api';
import { StylesWrapper, StyledErrorMessage, StyledSuccessMessage } from '../components/Form/form';
import Loading from '../components/UI/Loading/Loading';

const contentContribution = () => {
  // eslint-disable-next-line
  const [keycloak] = useKeycloak();
  const isAuthenticated = keycloak && keycloak.authenticated;

  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  // eslint-disable-next-line
  const [pr, setPr] = useState(null);

  const onSubmit = async values => {
    setLoading(true);
    setError(null);
    setPr(null);
    const topicRegistry = convertToRegistryFormat(values);

    try {
      const res = await axios.post(API_ROUTES.createTopic, topicRegistry, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });

      if (res.status === 200) {
        setPr(res.data.prUrl);
      } else {
        setError('There was an error processing this request!');
      }
    } catch (err) {
      setError('An unexpected error occured.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO title="Content Contribution" />
      <Main>
        <Title
          title="Content Contribution"
          subtitle={
            !isAuthenticated ? 'Login via IDIR or Github to continue' : 'Add a topic to the Devhub'
          }
        />
        {isAuthenticated ? (
          <StylesWrapper>
            {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
            {pr && (
              <StyledSuccessMessage>
                Pull Request created! <a href={pr}>Check it out on Github.</a>
              </StyledSuccessMessage>
            )}
            <TopicForm onSubmit={onSubmit} initialValues={{}} />
            {loading && <Loading message="Loading ..." />}
          </StylesWrapper>
        ) : (
          <h4 css={{ color: 'red' }}>Not Authorized</h4>
        )}
      </Main>
    </Layout>
  );
};

export default contentContribution;
