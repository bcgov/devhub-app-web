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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece, faFile, faTools, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/fontawesome-free-brands';
import styled from '@emotion/styled';
import {
  CardBody,
  CardLinkWrapper,
  CardWrapper,
  DecorativeBar,
  ResourceCounts,
  ResourceCountGroup,
  CircleIconWrapper,
  CircleIcon,
  ResourceCountTitle,
  CardDescription,
} from './index';
import { RESOURCE_TYPES } from '../../../constants/ui';

const CardTitle = styled.h2`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 15px;
  text-transform: capitalize;
`;

const CollectionWrapper = styled(CardWrapper)`
  color: #444;
  height: 300px;
  width: 485px;
`;

const CollectionBarTitle = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  padding: 8px 10px;
  font-size: 14px;
`;

const DecorativeBarTitle = styled.h3`
  margin: 0px 10px;
  font-size: 1em;
  font-weight: 400;
`;
const Collection = ({
  link,
  title,
  description,
  documentation,
  repositories,
  components,
  tools,
}) => {
  return (
    <CardLinkWrapper to={link}>
      <CollectionWrapper>
        <DecorativeBar type="Collections">
          <CollectionBarTitle>
            <FontAwesomeIcon icon={faLayerGroup} />
            <DecorativeBarTitle style={{ margin: '0 10px' }}>Collection</DecorativeBarTitle>
          </CollectionBarTitle>
        </DecorativeBar>
        <CardBody>
          <CardTitle clamp={2} tagName="h2">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardBody>
        <hr />
        <ResourceCounts>
          <ResourceCountGroup>
            <CircleIconWrapper type={RESOURCE_TYPES.SELF_SERVICE_TOOLS}>
              <CircleIcon icon={faTools} />
            </CircleIconWrapper>
            <ResourceCountTitle>{tools} Tools</ResourceCountTitle>
          </ResourceCountGroup>
          <ResourceCountGroup>
            <CircleIconWrapper type={RESOURCE_TYPES.DOCUMENTATION}>
              <CircleIcon icon={faFile} />
            </CircleIconWrapper>
            <ResourceCountTitle>{documentation} Documentation</ResourceCountTitle>
          </ResourceCountGroup>
          <ResourceCountGroup>
            <CircleIconWrapper type={RESOURCE_TYPES.COMPONENTS}>
              <CircleIcon icon={faPuzzlePiece} />
            </CircleIconWrapper>
            <ResourceCountTitle>{components} Components</ResourceCountTitle>
          </ResourceCountGroup>
          <ResourceCountGroup>
            <CircleIconWrapper type={RESOURCE_TYPES.REPOSITORIES}>
              <CircleIcon icon={faGithub} />
            </CircleIconWrapper>
            <ResourceCountTitle>{repositories} Repositories</ResourceCountTitle>
          </ResourceCountGroup>
        </ResourceCounts>
      </CollectionWrapper>
    </CardLinkWrapper>
  );
};

Collection.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  documentation: PropTypes.number.isRequired,
  tools: PropTypes.number.isRequired,
  repositories: PropTypes.number.isRequired,
  components: PropTypes.number.isRequired,
};

Collection.defaultProps = {
  description: null,
  tools: 0,
  documentatioon: 0,
  repositories: 0,
  components: 0,
};

export default Collection;
