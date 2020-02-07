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
import styled from '@emotion/styled';
import css from '@emotion/css';
import { ChevronLink } from '../UI/Link';
import { Container, LinkContainer } from './index';
import CardsInColumns from '../Card/CardsInColumns';
import Pill from '../UI/Pill';
import { RESOURCE_TYPES } from '../../constants/ui';
import { getSearchResultLabel, togglePills } from '../../utils/helpers';
import Row from '../Card/Row';
import queryString from 'query-string';
import { navigate } from 'gatsby';

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
  background: red;
  border-width: 1px;
  border-style: solid;
  border-color: #e0e0e0;
`;

// used by @testing-library/react dom querying
export const TEST_IDS = {
  container: 'resource-preview-container',
  pill: 'resource-preview-pill',
};
let filterarr = [];
// this is a wrapper component that encapsulates cards for topics or other sizes
export const ResourcePreview = ({ title, link, resources, filters, amountToShow, seeMore }) => {
  let [showCount, setCount] = useState(amountToShow);
  let [seeMoreResults, setSeeMore] = useState(seeMore);
  let [resourcesToShow, setResources] = useState(resources);
  let [activeFilters, setActiveFilters] = useState(['All']);
  const extraItemsToShow = 6; //two more row of card in the page after click 'see more'

  useEffect(() => {
    setResources(resources);
  }, [resources]);

  //sets the amount of resources to show, allowing users to 'see more' if its appropriate
  const updateCount = () => {
    //show 6 more results
    setSeeMore(true);
    setCount(showCount + extraItemsToShow);
    if (resourcesToShow.length <= showCount) {
      setSeeMore(false); //hide the 'see more results' when there isn‘t more to show
    }
  };

  // This filters what results we are showing based on the given filter coming from user interaction with the ResourcePills
  const resourceFilter = filterName => {
    //filter the results based on given filter, update the resources and active filter
    let filteredResources = []; 
    let newPillList = togglePills(filterName, activeFilters);
    filteredResources = resources.filter(resource =>
      newPillList.includes(resource.fields.resourceType),
    );
    if (newPillList.includes('All')) {
      setResources(resources);
    } else {
      setResources(filteredResources);
    }
    //reset the amount of resources to show
    setCount(amountToShow);
    setActiveFilters(newPillList);
  };

  let resultLabel = getSearchResultLabel(resources.length);
  resultLabel = resources.length !== 0 ? 'All ' + resultLabel : resultLabel;
  let pills = [];
  const combfunct = filtername => {
    addtourl(filtername);
    resourceFilter(filtername);
  };
  const addtourl = filtername => {
    filtername = filtername.replace(/\s/g,'');  
    if(filtername === 'All') {
      filterarr = []
      console.log(filterarr, "here")
      filterarr.push('All')
    }
    else if (filterarr.includes(filtername)) {
      const index = filterarr.indexOf(filtername);
      filterarr.splice(index,1);
      // console.log('included ' + filtername);
    } else {
      filterarr.push(filtername);
      if (filterarr.includes('All')){
        const allpill = filterarr.indexOf('All');
        filterarr.splice(allpill,1)
      }
    }
    const searchParams = queryString.parse(location.search)
    const newSearchParams = queryString.stringify({...searchParams, filters: filterarr})
    console.log(newSearchParams,filtername)
    console.log(newSearchParams.includes(filtername))
    history.pushState({}, title, `?${newSearchParams}`);
    // decidecss()
    // navigate(`?${newSearchParams}`);
  };
  const decidecss = (filtername) => {
    filtername = filtername.replace(/\s/g,''); 
    const pillurl = window.location.href
    if(pillurl.includes(filtername)){
      return true
    }
    else{
      return false
    }
  }
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
        key={'All Results'}
        variant="filled"
        deletable={false}
        css={activeFilters.includes('All') ? toggled : ''}
        onClick={() => combfunct('All')}
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

          //adds informative info for the behavior of the ResourcePills their current state
          let iconInfo = activeFilters.includes(filter.name)
            ? `Click to hide ${filter.name} search results`
            : `Click to show ${filter.name} search results`;
          // console.log(filter.name);
          // const searchurl = queryString.parse(window.location.href)
          // const test = queryString.stringify({searchurl})
          // console.log(test)
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
              onClick={() =>  combfunct(filter.name)}
              css={decidecss(filter.name) ? toggled : ''}
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
          <CardsInColumns cards={resourcesToShow.slice(0, showCount)} />
        </Row>
      </ResourceContainer>
      <LinkContainer>
        {seeMoreResults && resourcesToShow.length > showCount && (
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

export default ResourcePreview;
