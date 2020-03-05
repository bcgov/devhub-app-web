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
/**
 * contains the filter menu, and searchbar/cards container
 */
import React, { useMemo } from 'react';

import {
  getFirstNonExternalResource,
  buildFeaturedTopic,
  buildPopularTopic,
} from '../../utils/helpers';
import Topic from '../Topic';

import { ChevronLink } from '../UI/Link';
import { Container as PreviewContainer, Title, StyledLink, LinkContainer } from './index';
import { graphql, useStaticQuery } from 'gatsby';
import { flattenGatsbyGraphQL } from '../../utils/dataHelpers';
import {
  FEATURE_TOPIC_CONFIGURATION,
  DYNAMIC_TOPIC_PATHS,
  FEATURED_CONTENT,
  POPULAR_TOPIC_CONFIGURATION,
} from '../../constants/ui';
import { useDevhubSiphonAndGithubRawNodes } from '../../utils/hooks';

// used for @testing-library/react dom querying
export const TEST_IDS = {
  container: 'topics-container',
};

const TopicContent = topics =>
  topics
    .filter(topic => topic.connectsWith.length > 0)
    .slice(0, 4)
    .map(topic => {
      // resources are grouped by type, 'ungroup' them so we can find the first available
      // non external link to use as the entry page for the topic card
      const allResources = topic.connectsWith;

      return (
        <Topic
          key={topic.id}
          title={topic.name}
          description={topic.description}
          link={{ to: getFirstNonExternalResource(allResources), text: 'View' }}
          resources={allResources}
        />
      );
    });

export const TopicsPreview = () => {
  const { topics } = useStaticQuery(graphql`
    query {
      topics: allTopicRegistryJson {
        edges {
          node {
            id
            name
            description
            connectsWith {
              ...DevhubNodeConnection
            }
          }
        }
      }
    }
  `);

  const [devhubSiphon, githubRaw] = useDevhubSiphonAndGithubRawNodes();

  const popularTopic = buildPopularTopic(
    githubRaw,
    POPULAR_TOPIC_CONFIGURATION.name,
    POPULAR_TOPIC_CONFIGURATION.description,
    DYNAMIC_TOPIC_PATHS.popular,
    POPULAR_TOPIC_CONFIGURATION.minPageViews,
    POPULAR_TOPIC_CONFIGURATION.maxNodes,
  );

  const featuredTopic = buildFeaturedTopic(
    githubRaw.concat(devhubSiphon),
    FEATURE_TOPIC_CONFIGURATION.name,
    FEATURE_TOPIC_CONFIGURATION.description,
    DYNAMIC_TOPIC_PATHS.featured,
    FEATURED_CONTENT,
  );
  const allTopics = [popularTopic, featuredTopic].concat(topics.edges);
  const topicNodes = useMemo(() => flattenGatsbyGraphQL(allTopics), [allTopics]);
  const link = { to: '/topics', text: 'Topics' };

  return (
    <PreviewContainer data-testid={TEST_IDS.container} style={{ padding: '0 10px' }}>
      <Title>
        <StyledLink to={link.to}>Topics</StyledLink>
      </Title>

      {TopicContent(topicNodes)}

      <LinkContainer>
        <ChevronLink to={link.to}>{link.text}</ChevronLink>
      </LinkContainer>
    </PreviewContainer>
  );
};

export default TopicsPreview;
