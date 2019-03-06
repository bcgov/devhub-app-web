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
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { RESOURCE_TYPES } from '../../constants/ui';
import Collection from '../Cards/Card/Collection';
import Container from '../Cards/Container';
import Row from '../Cards/Row';
import Column from '../Cards/Column';

const StyledTitle = styled.h2`
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 4px 0;
  margin-bottom: 15px;
  font-size: 1.5em;
  font-weight: 700;
`;

const ContainerCentered = styled(Container)`
  margin: 0 auto 15px;
  align-item: flex-start;
`;

const StyledColumn = styled(Column)`
  flex: 0 1 506px;
`;
const CollectionContent = collections =>
  collections
    .filter(collection => collection.hasResources)
    .slice(0, 4)
    .map(collection => (
      <StyledColumn
        key={collection.id}
        css={css`
          justify-content: center;
          display: flex;
        `}
      >
        <Collection
          title={collection.name}
          description={collection.description}
          documentation={collection.resources[RESOURCE_TYPES.DOCUMENTATION].length}
          repositories={collection.resources[RESOURCE_TYPES.REPOSITORIES].length}
          components={collection.resources[RESOURCE_TYPES.COMPONENTS].length}
          tools={collection.resources[RESOURCE_TYPES.SELF_SERVICE_TOOLS].length}
        />
      </StyledColumn>
    ));

const CollectionsContainer = ({ collections }) => (
  <ContainerCentered>
    <StyledTitle>Collections</StyledTitle>
    <Row>{CollectionContent(collections)}</Row>
  </ContainerCentered>
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
};
export default CollectionsContainer;
