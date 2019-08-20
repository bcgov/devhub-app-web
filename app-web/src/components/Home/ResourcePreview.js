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
import css from '@emotion/css';

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

const ResourcePill = styled(Pill)`
  :hover {
    background: white;
    border-width: 1px;
    border-style: solid;
    border-color: #e0e0e0;
    top: -3px;
  }
`;

const toggled = css`
  background: white;
  border-width: 1px;
  border-style: solid;
  border-color: #e0e0e0;
`;

// used by react-testing-library dom querying
export const TEST_IDS = {
  container: 'resource-preview-container',
};

// this is a wrapper component that encapsulates cards for topics or other sizes
export const ResourcePreview = ({ title, link, resources, filters, amountToShow, seeMore }) => {
  let [showCount, updateCount] = useState(amountToShow);
  let [seeMoreResults, updateSeeMore] = useState(seeMore);
  let [resourcesToShow, updateResources] = useState(resources);
  let [activeFilter, updateFilter] = useState('');

  //sets the amount of resources to show, allowing users to 'see more' if its appropriate
  const setCount = () => {
    //show 6 more results
    updateCount(showCount + 6);
    updateSeeMore(true);
    if (showCount >= resourcesToShow.length) {
      //hide the 'see more results' when there isnt more to show
      updateSeeMore(false);
    }
  };

  //This filters what results we are showing based on the given filter coming from user interaction with the ResourcePills
  const resourceFilter = filter => {
    if (filter.name === activeFilter) {
      //bring back the full set of search result and reset the filter
      updateResources(resources);
      updateFilter('');
    } else {
      //filter the results based on given filter, update the resources and active filter
      let filteredResources = resources.filter(
        resource => resource.fields.resourceType === filter.name,
      );
      updateResources(filteredResources);
      updateFilter(filter.name);
    }
    //reset the amount of resources to show
    updateCount(amountToShow);
  };

  let resourceIcons;
  //Filters will be mapped into pills displaying result count for that particular resourcetype
  //These pills are interactive and filter results when clicked
  if (filters) {
    //No people resource type Icon rn
    resourceIcons = filters.map(filter => {
      if (filter.name !== 'People') {
        //formats the text correctly for different cases
        let iconLabel =
          filter.counter > 1 || filter.counter === 0
            ? `${filter.counter} Results`
            : `${filter.counter} Result`;
        //adds informative info for the behavior of the ResourcePills their current state
        let iconInfo =
          filter.name === activeFilter
            ? 'Click to view all results again'
            : `Click to view only ${filter.name} results`;

        return (
          <ResourcePill
            resourceType={filter.name}
            label={iconLabel}
            variant="filled"
            deletable={false}
            key={filter.name}
            css={filter.name === activeFilter ? toggled : ''}
            onClick={filter.counter === 0 ? undefined : () => resourceFilter(filter)}
            title={iconInfo}
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
        {resourcesToShow.slice(0, showCount).map(r => (
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
        {seeMoreResults && resourcesToShow.length > showCount && (
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
