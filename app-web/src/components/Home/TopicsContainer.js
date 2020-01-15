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
import React from 'react';
import PropTypes from 'prop-types';
import { getFirstNonExternalResource } from '../../utils/helpers';
import TopicPreview from '../TopicPreview/TopicPreview';

import { ChevronLink } from '../UI/Link';
import { Container as PreviewContainer, Title, StyledLink, LinkContainer } from './index';

// used for @testing-library/react dom querying
export const TEST_IDS = {
  container: 'topics-container',
};

const TopicContent = topics =>
  topics
    .filter(topic => topic.hasResources)
    .slice(0, 4)
    .map(topic => {
      // resources are grouped by type, 'ungroup' them so we can find the first available
      // non external link to use as the entry page for the topic card
      const allResources = topic.connectsWith;
      return (
        <TopicPreview
          key={topic.id}
          title={topic.name}
          description={topic.description}
          link={{ to: getFirstNonExternalResource(allResources), text: 'View' }}
          resources={allResources}
        />
      );
    });

export const TopicsContainer = ({ topics, runTimeTopics, link }) => (
  <PreviewContainer data-testid={TEST_IDS.container}>
    <Title>
      <StyledLink to={link.to}>Topics</StyledLink>
    </Title>

    {TopicContent(topics)}

    <LinkContainer>
      <ChevronLink to={link.to}>{link.text}</ChevronLink>
    </LinkContainer>
  </PreviewContainer>
);

TopicsContainer.propTypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      resources: PropTypes.object.isRequired,
    }),
  ),
  link: PropTypes.shape({
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};
export default TopicsContainer;
