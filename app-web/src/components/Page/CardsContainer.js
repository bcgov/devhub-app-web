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
import { navigate } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Alert } from 'reactstrap';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SEARCH } from '../../constants/ui';
import { EMOTION_BOOTSTRAP_BREAKPOINTS } from '../../constants/designTokens';
import { SEARCH as SEARCH_MESSAGES } from '../../messages';

import Card from '../Card/Card';
import Search from '../Search';
import Container from '../Card/Container';
import Row from '../Card/Row';
import Column from '../Card/Column';
import Loading from '../UI/Loading/Loading';
import Pill from '../UI/Pill';
import { isQueryEmpty } from '../../utils/search';
import AlgoliaBrand from '../UI/AlgoliaBrand';

const AlertMessage = styled(Alert)`
  margin: 10px auto;
`;

const PaddedContainer = styled.div`
  padding: 0 5px;
`;

const CardsContent = (loading, searchResultsEmpty, resources) => {
  if (loading) {
    return <Loading message="Loading..." />;
  } else if (searchResultsEmpty) {
    return <AlertMessage color="info">{SEARCH_MESSAGES.results.empty.defaultMessage}</AlertMessage>;
  } else {
    return resources.map(r => (
      <Column
        key={r.path}
        css={css`
          justify-content: center;
          display: flex;
        `}
      >
        <Card
          data-testid={r.path}
          data-testclass="card"
          resourceType={r.type}
          title={r.title}
          description={r.description}
          image={r.image}
          link={r.path}
          event={r}
        />
      </Column>
    ));
  }
};

const SearchContainer = styled.div`
  display: flex;

  flex-wrap: wrap;
  > div {
    flex-basis: 350px;
  }
  justify-content: center;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.md} {
    justify-content: flex-start;
  }
`;

const FilterSideDrawerToggle = styled.div`
  background-color: #fafafa;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 5px 5px;
  display: block;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.sm} {
    display: none;
  }
`;

export const TEST_IDS = {
  algolia: 'CardContainer.algolia',
};

export const CardsContainer = ({
  resources,
  query,
  searchResultTotal,
  openSideDrawer,
  loading,
  searchResultsEmpty,
  pagePath,
}) => {
  let resultLabel;
  if (searchResultTotal) {
    resultLabel = `${searchResultTotal} Result${searchResultTotal > 1 ? 's' : ''}`;
  }
  return (
    <Container>
      <PaddedContainer>
        <SearchContainer>
          <Search
            searchOnEnter
            query={query}
            inputConfig={{ ...SEARCH.INPUT, disabled: loading }}
            onSearch={terms => {
              navigate(`${pagePath}?q=${encodeURIComponent(terms)}`);
            }}
          />
          <AlgoliaBrand
            data-testid={TEST_IDS.algolia}
            style={{ flexBasis: '250px', flexShrink: '0' }}
          />
        </SearchContainer>
      </PaddedContainer>

      <FilterSideDrawerToggle onClick={openSideDrawer}>
        <FontAwesomeIcon icon={faFilter} style={{ color: '#026', marginRight: '5px' }} />{' '}
        <span>Filters</span>
      </FilterSideDrawerToggle>
      <PaddedContainer>
        {query && !isQueryEmpty(query) && !searchResultsEmpty && (
          <Pill key={resultLabel} label={resultLabel} variant="filled" deletable={false} />
        )}
      </PaddedContainer>
      <Row>{CardsContent(loading, searchResultsEmpty, resources)}</Row>
    </Container>
  );
};

CardsContainer.propTypes = {
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string,
      path: PropTypes.string.isRequired,
    }),
  ),
  searchResultsEmpty: PropTypes.bool.isRequired,
  openSideDrawer: PropTypes.func.isRequired,
  query: PropTypes.string,
};
export default CardsContainer;
