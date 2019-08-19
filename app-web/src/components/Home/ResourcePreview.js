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
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { EMOTION_BOOTSTRAP_BREAKPOINTS } from '../../constants/designTokens';
import { ChevronLink } from '../UI/Link';
import { Container, LinkContainer } from './index';
import Card from '../Cards/Card/Card';
import Pill from '../UI/Pill';

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

const PreviewHeader = styled.div`
  padding: 10px 4px;
  display: flex;
  flex-flow: row wrap;
  border-bottom: 1px solid #ccc;
  h2 {
    font-weight: 400;
    text-transform: capitalize;
    padding: 0 20px 0 0;
    margin: 0 2px;
    margin-top: 5px;
  }
`;

const SeeMoreP = styled.p`
  text-decoration: underline;
  color: #1a5a96;
  font-weight: 400;
  text-transform: capitalize;
  padding: 0 4px;
  margin: 0 2px;
  :hover {
    cursor: pointer;
  }
`;

// used by react-testing-library dom querying
export const TEST_IDS = {
  container: 'resource-preview-container',
};

// this is a wrapper component that encapsulates cards for topics or other sizes
export const ResourcePreview = ({ title, link, resources, filters, amountToShow, seeMore }) => {
  let [showCount, updateCount] = useState(amountToShow);
  let [seeMoreResults, updateSeeMore] = useState(seeMore);
  const setCount = () => {
    if (showCount + 6 >= resources.length) {
      updateSeeMore(false);
    }
    updateCount(showCount + 6);
  };

  let resourceIcons;
  if (filters) {
    //No people resource type Icon rn
    resourceIcons = filters.map(filter => {
      if (filter.name !== 'People') {
        return (
          <Pill
            resourceType={filter.name}
            label={
              filter.counter > 1 || filter.counter === 0
                ? `${filter.counter} Results`
                : `${filter.counter} Result`
            } //make a bit of logic for this perhaps
            variant="filled"
            deletable={false}
            key={filter.name}
          />
        );
      }
      return '';
    });
  }

  return (
    <Container data-testid={TEST_IDS.container}>
      <PreviewHeader>
        <h2>{title}</h2>
        {resourceIcons}
      </PreviewHeader>
      <ResourceContainer>
        {resources.slice(0, showCount).map(r => (
          <CardWrapper key={r.id}>
            <Card
              type={r.fields.resourceType}
              title={r.fields.title}
              description={r.fields.description}
              image={r.fields.image}
              link={r.fields.standAlonePath}
              event={r}
            />
          </CardWrapper>
        ))}
      </ResourceContainer>
      <LinkContainer>
        {seeMoreResults && resources.length > 6 && (
          <SeeMoreP onClick={() => setCount()}>See More Results</SeeMoreP>
        )}
        {link && <ChevronLink to={link.to}>{link.text}</ChevronLink>}
      </LinkContainer>
    </Container>
  );
};

ResourcePreview.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.shape({
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }),
  filters: PropTypes.array,
  amountToShow: PropTypes.number.isRequired,
  seeMore: PropTypes.bool,
  resources: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ResourcePreview;
