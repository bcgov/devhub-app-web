import React, { useMemo } from 'react';
import { Redirect } from '@reach/router';
import Layout from '../hoc/Layout';
import { useKeycloak } from '@react-keycloak/web';

// components
import { SEO } from '../components/SEO/SEO';
import { Title } from '../components/Page';
import Main from '../components/Page/Main';
import TopicForm from '../components/Form/TopicForm';
import { useStaticQuery, graphql } from 'gatsby';
import { DEVHUB_PALETTE } from '../constants/designTokens';
import { flattenGatsbyGraphQL } from '../utils/dataHelpers';

export const editTopic = props => {
  const [topicName] = props['*'].split('/');
  // eslint-disable-next-line
  const [keycloak] = useKeycloak();
  const isAuthenticated = keycloak && keycloak.authenticated;

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
          <Title
            title="Content Contribution"
            subtitle={!isAuthenticated ? 'Login via IDIR or Github to continue' : 'Edit a topic'}
          />
          {isAuthenticated ? (
            <TopicForm
              operation="edit"
              initialValues={{
                topicName: topic.name,
                topicDescription: topic.description,
                sources: topic.sourceProperties.sources,
              }}
            />
          ) : (
            <h4 css={{ color: DEVHUB_PALETTE.lightred }}>Please Login to edit this topic :) </h4>
          )}
        </Main>
        <SEO title="Edit topic" />
      </Layout>
    );
  }
};

export default editTopic;
