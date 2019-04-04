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
import styled from '@emotion/styled';

import { RESOURCE_TYPES } from '../../constants/ui';
import { getFirstNonExternalResource } from '../../utils/helpers';

import Collection from '../Cards/Card/Collection';
import Container from '../Cards/Container';
import Row from '../Cards/Row';
import Column from '../Cards/Column';
import { ChevronLink } from '../UI/Link';
import { Container as PreviewContainer, Title, StyledLink, LinkContainer } from './index';

// used for react-testing-library dom querying
export const TEST_IDS = {
  container: 'collections-container',
};

const ContainerCentered = styled(Container)`
  margin: 0 auto 15px;
  align-item: flex-start;
`;

const StyledColumn = styled(Column)`
  flex: 0 1 506px;
  justify-content: center;
  display: flex;
`;

const CollectionContent = collections =>
  collections
    .filter(collection => collection.hasResources)
    .slice(0, 4)
    .map(collection => {
      // resources are grouped by type, 'ungroup' them so we can find the first available
      // non external link to use as the entry page for the collection card
      const allResources = collection.childrenDevhubSiphon.sort((a, b) => {
        // sort to ensure first resource in collection is the entry poitn
        const position1 = a._metadata.position;
        const position2 = b._metadata.position;
        return position1.localeCompare(position2);
      });

      return (
        <StyledColumn key={collection.id}>
          <Collection
            title={collection.name}
            description={collection.description}
            documentation={collection.resources[RESOURCE_TYPES.DOCUMENTATION].length}
            repositories={collection.resources[RESOURCE_TYPES.REPOSITORIES].length}
            components={collection.resources[RESOURCE_TYPES.COMPONENTS].length}
            tools={collection.resources[RESOURCE_TYPES.SELF_SERVICE_TOOLS].length}
            link={getFirstNonExternalResource(allResources)}
          />
        </StyledColumn>
      );
    });

export const CollectionsContainer = ({ collections, link }) => (
  <PreviewContainer data-testid={TEST_IDS.container}>
    <Title>
      <StyledLink to={link.to}>Collections</StyledLink>
    </Title>
    <ContainerCentered>
      <Row>{CollectionContent(collections)}</Row>
    </ContainerCentered>
    <LinkContainer>
      <ChevronLink to={link.to}>{link.text}</ChevronLink>
    </LinkContainer>
  </PreviewContainer>
);

CollectionsContainer.propTypes = {
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      resources: PropTypes.arrayOf(PropTypes.object).isRequired,
    }),
  ),
  link: PropTypes.shape({
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};
export default CollectionsContainer;
