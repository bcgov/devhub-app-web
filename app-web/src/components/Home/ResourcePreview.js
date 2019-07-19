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
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { EMOTION_BOOTSTRAP_BREAKPOINTS } from '../../constants/designTokens';
import { ChevronLink } from '../UI/Link';
import { Container, Title, StyledLink, LinkContainer } from './index';
import Card from '../Cards/Card/Card';

export const CardWrapper = styled.div`
  margin: 6px 9px;
`;

export const ResourceContainer = styled.div`
  padding: 15px 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.sm} {
    justify-content: flex-start;
  }
`;

// used by react-testing-library dom querying
export const TEST_IDS = {
  container: 'resource-preview-container',
};

// this is a wrapper component that encapsulates cards for topics or other sizes
export const ResourcePreview = ({ title, link, resources }) => (
  <Container data-testid={TEST_IDS.container}>
    <Title>
      <StyledLink to={link.to}>{title}</StyledLink>
    </Title>
    <ResourceContainer>
      {resources.slice(0, 6).map(r => (
        
        <CardWrapper key={r.id}>
          <Card
            type={r.fields.resourceType}
            title={r.fields.title}
            description={r.fields.description}
            image={r.fields.image}
            link={r.fields.pagePaths[0]}
            event={r}
          />
        </CardWrapper>
      ))}
    </ResourceContainer>
    <LinkContainer>
      <ChevronLink to={link.to}>{link.text}</ChevronLink>
    </LinkContainer>
  </Container>
);

ResourcePreview.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.shape({
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }),
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ResourcePreview;
