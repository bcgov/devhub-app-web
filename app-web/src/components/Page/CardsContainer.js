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
import { SEARCH } from '../../constants/ui';

import Card from '../Cards/Card/Card';
import Search from '../Search/Search';
import Container from '../Cards/Container';
import Row from '../Cards/Row';
import Column from '../Cards/Column';
import Loading from '../UI/Loading/Loading';

const CardsContent = (loading, searchResultsEmpty, resources) => {
  if (loading) {
    return <Loading message="Loading..." />;
  } else if (searchResultsEmpty) {
    return <p>{SEARCH.results.empty.defaultMessage}</p>;
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
          type={r.type}
          title={r.title}
          description={r.description}
          image={r.image}
          link={r.path}
        />
      </Column>
    ));
  }
};

const SearchContainer = styled.div`
  padding: 0 5px;
`;

const CardContainer = ({ resources, setSearchBarTerms, loading, searchResultsEmpty, pagePath }) => (
  <Container grid={3}>
    <SearchContainer>
      <Search
        searchOnEnter
        inputConfig={{ ...SEARCH.INPUT, disabled: loading }}
        onSearch={terms => {
          // set resource type to all since we are searching the entire index
          setSearchBarTerms(terms);
          navigate(`${pagePath}/?q=${encodeURIComponent(terms)}`);
        }}
      />
    </SearchContainer>
    <Row>{CardsContent(loading, searchResultsEmpty, resources)}</Row>
  </Container>
);

CardContainer.propTypes = {
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ),
};
export default CardContainer;
