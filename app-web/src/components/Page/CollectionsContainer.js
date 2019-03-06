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
import { EMOTION_BOOTSTRAP_BREAKPOINTS } from '../../constants/ui';
import { SEARCH as SEARCH_MESSAGES } from '../../messages';

import { Alert } from 'reactstrap';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Collection from '../Cards/Card/Collection';
import Container from '../Cards/Container';
import Row from '../Cards/Row';
import Column from '../Cards/Column';
import Loading from '../UI/Loading/Loading';

const CollectionContent = (loading, collections) => {
  if (loading) {
    return <Loading message="Loading..." />;
  } else {
    return collections.slice(0, 4).map(collection => (
      <Column
        key={collection.id}
        css={css`
          justify-content: center;
          display: flex;
        `}
      >
        <Collection
          title={collection.title}
          description={collection.description}
          documentation={0}
          repositories={0}
          components={0}
          tools={0}
        />
      </Column>
    ));
  }
};

const CollectionsContainer = ({ collections, loading }) => (
  <Container>
    <Row>{CollectionContent(loading, collections)}</Row>
  </Container>
);

CollectionsContainer.propTypes = {
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      resources: PropTypes.arrayOf(PropTypes.object).isRequired,
      link: PropTypes.string.isRequired,
    }),
  ),
  loading: PropTypes.bool.isRequired,
};
export default CollectionsContainer;
