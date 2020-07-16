import React, { useMemo, useState } from 'react';
import { Redirect } from '@reach/router';
import Layout from '../hoc/Layout';
import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';
// components
import { SEO } from '../components/SEO/SEO';
import { Title } from '../components/Page';
import Main from '../components/Page/Main';
import TopicForm from '../components/Form/TopicForm';
import { useStaticQuery, graphql } from 'gatsby';
import { DS_PALETTE } from '../constants/designTokens';
import { API_ROUTES } from '../constants/api';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';
import { convertToRegistryFormat } from '../utils/contentContribution';
import { StyledSuccessMessage, StyledErrorMessage, StylesWrapper } from '../components/Form/form';
import Loading from '../components/UI/Loading/Loading';

export const editTopic = props => {
  const [topicName] = props['*'].split('/');
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
      const res = await axios.put(API_ROUTES.editTopic, topicRegistry, {
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

  // eslint-disable-next-line
  const { topics } = useStaticQuery(graphql`
    query {
      topics: allTopicRegistryJson {
        edges {
          node {
            name
            description
            fields {
              slug
            }
            sourceProperties {
              sources {
                sourceType
                sourceProperties {
                  url
                  title
                  description
                  files
                  owner
                  repo
                }
              }
            }
            resourceType
          }
        }
      }
    }
  `);

  // eslint-disable-next-line
  const topicNodes = useMemo(() => flattenGatsbyGraphQL(topics.edges), [topics.edges]);
  const topic = topicNodes.find(topic => topic.fields.slug === topicName);
  const topicNotFound = topic === undefined;

  if (topicNotFound) {
    return <Redirect to="404" noThrow />;
  } else {
    return (
      <Layout>
        <Main>
          <Title title="Content Contribution" subtitle={'Edit a topic'} />
          {isAuthenticated ? (
            <StylesWrapper>
              {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
              {pr && (
                <StyledSuccessMessage>
                  Pull Request created! <a href={pr}>Check it out on Github.</a>
                </StyledSuccessMessage>
              )}
              <TopicForm
                onSubmit={onSubmit}
                initialValues={{
                  topicName: topic.name,
                  topicDescription: topic.description,
                  sources: topic.sourceProperties.sources,
                }}
              />

              {loading && <Loading message="Loading ..." />}
            </StylesWrapper>
          ) : (
            <h4 css={{ color: DS_PALETTE.red, fontsize: '18px' }}>
              Login via IDIR or Github to continue{' '}
            </h4>
          )}
        </Main>
        <SEO title="Edit topic" />
      </Layout>
    );
  }
};

export default editTopic;
