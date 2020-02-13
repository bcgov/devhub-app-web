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
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import styled from '@emotion/styled';
import css from '@emotion/css';
import { ChevronLink } from '../UI/Link';
import { Container, LinkContainer } from './index';
import CardsInColumns from '../Card/CardsInColumns';
import Pill from '../UI/Pill';
import { RESOURCE_TYPES } from '../../constants/ui';
import { getSearchResultLabel } from '../../utils/helpers';
import Row from '../Card/Row';
import { FILTER_QUERY_PARAM } from '../../constants/filterGroups';
import withLocation from '../../hoc/withLocation';
import intersection from 'lodash/intersection';

export const CardWrapper = styled.div`
  margin: 6px 9px;
`;

export const ResourceContainer = styled.div`
  padding: 15px 0;
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

export const SeeMoreP = styled.p`
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

// used by @testing-library/react dom querying
export const TEST_IDS = {
  container: 'resource-preview-container',
  pill: 'resource-preview-pill',
};

export const ALL_FILTER = 'ALL';
/**
 * Toggles on/off a filter
 * @param {String} filterName the filter that was toggled
 * @param {Array} activeFilters the list of active filters
 * @returns {Array} the remaining active filters
 */
export const handleFilterToggle = (filterName, activeFilters) => {
  if (filterName === ALL_FILTER) {
    return [];
  }
  if (activeFilters.includes(filterName)) {
    return activeFilters.filter(f => f !== filterName);
  }
  return activeFilters.concat(filterName);
};

// this is a wrapper component that encapsulates cards for topics or other sizes
export const ResourcePreview = ({
  title,
  link,
  resources,
  filters,
  amountToShow,
  seeMore,
  location,
}) => {
  const [showCount, setCount] = useState(amountToShow);
  const [seeMoreResults, setSeeMore] = useState(seeMore);
  const queryParam = queryString.parse(location.search);

  const filtersList = filters.map(({ name }) => name);
  const extraItemsToShow = 6; //two more row of card in the page after click 'see more'
  const [activeFilters, setActiveFilters] = useState([]);

  // this effect extracts initial state from the url parameter
  // we only run this when location changes from doing searches
  useEffect(() => {
    const windowHasFilters = Object.prototype.hasOwnProperty.call(queryParam, FILTER_QUERY_PARAM);
    const filterQueryParams = windowHasFilters
      ? decodeURIComponent(queryParam[FILTER_QUERY_PARAM]).split(',')
      : [];
    const validFilters = intersection(filtersList, filterQueryParams);
    if (validFilters.length !== activeFilters.length) {
      // make sure filters are treated as an array
      // if only one filter is passed as param ?f= it will be a string
      setActiveFilters(validFilters);
    } else if (activeFilters.length !== 0) {
      setActiveFilters([]);
    }
    // eslint-disable-next-line
  }, [location.search]);

  const isAllToggled = activeFilters.length === 0 || activeFilters.length === filters.length;

  //When all filters are clicked it resets the active filters to be 'All'
  if (activeFilters.length === filters.length && activeFilters.length > 0) {
    setActiveFilters([]);
  }

  const filteredResources = isAllToggled
    ? resources
    : resources.filter(resource => activeFilters.includes(resource.fields.resourceType));

  //sets the amount of resources to show, allowing users to 'see more' if its appropriate
  const updateCount = () => {
    //show 6 more results
    setSeeMore(true);
    setCount(showCount + extraItemsToShow);
    if (resources.length <= showCount) {
      setSeeMore(false); //hide the 'see more results' when there isn‘t more to show
    }
  };

  // This filters what results we are showing based on the given filter coming from user interaction with the ResourcePills

  const resourceFilterClicked = filterName => {
    const { pathname } = location;
    const toggledFilters = handleFilterToggle(filterName, activeFilters);

    const searchMap = {
      ...queryParam,
      [FILTER_QUERY_PARAM]: toggledFilters.length === filtersList.length ? [] : toggledFilters,
    };
    const searchString = queryString.stringify(searchMap);

    setCount(amountToShow);
    // replacing state so that back button doesn't get poluted with filter changes
    // also this will trigger the url to change but will not cause a page refresh unlike gatsby.navigate
    window.history.replaceState({}, 'foo', `${pathname}?${searchString}`);
    setActiveFilters(toggledFilters);
  };

  let resultLabel = getSearchResultLabel(resources.length);
  resultLabel = resources.length !== 0 ? 'All ' + resultLabel : resultLabel;
  let pills = [];
  //Filters will be mapped into pills displaying result count for that particular resourcetype
  //These pills are interactive and filter results when clicked
  if (filters) {
    //No people resource type Icon rn
    pills = pills.concat(
      //Add first pill to the start of the list
      <ResourcePill
        otherIcon={'search'}
        label={resultLabel}
        title={'Click to view all results'}
        data-testid={`${TEST_IDS.pill}-all`}
        key={'All Results'}
        data-active={isAllToggled}
        variant="filled"
        deletable={false}
        css={isAllToggled ? toggled : ''}
        onClick={() => resourceFilterClicked(ALL_FILTER)}
      />,
    );
    pills = pills.concat(
      filters.map(filter => {
        if (filter.counter === 0) {
          return '';
        }

        if (filter.name !== RESOURCE_TYPES.PEOPLE) {
          //formats the text correctly for different cases

          let iconLabel = getSearchResultLabel(filter.counter);
          const isActive = !isAllToggled && activeFilters.includes(filter.name);
          //adds informative info for the behavior of the ResourcePills their current state
          let iconInfo = isActive
            ? `Click to hide ${filter.name} search results`
            : `Click to show ${filter.name} search results`;

          return (
            <ResourcePill
              resourceType={filter.name}
              data-resourcetype={filter.name}
              data-testid={`${TEST_IDS.pill}-${filter.name}`}
              data-testclass={`${TEST_IDS.pill}`}
              data-count={filter.counter}
              label={iconLabel}
              variant="filled"
              deletable={false}
              key={filter.name}
              data-active={isActive}
              css={isActive ? toggled : ''}
              onClick={() => resourceFilterClicked(filter.name)}
              title={iconInfo}
            />
          );
        }
        return '';
      }),
    );
  }

  return (
    <Container data-testid={TEST_IDS.container}>
      <PreviewHeader>
        <h2>{title}</h2>
        {pills}
      </PreviewHeader>
      <ResourceContainer>
        <Row>
          <CardsInColumns cards={filteredResources.slice(0, showCount)} />
        </Row>
      </ResourceContainer>
      <LinkContainer>
        {seeMoreResults && filteredResources.length > showCount && (
          <SeeMoreP onClick={() => updateCount()}>See More Results</SeeMoreP>
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

export default withLocation(ResourcePreview)();
