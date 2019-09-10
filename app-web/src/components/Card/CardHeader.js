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
import styled from '@emotion/styled';

import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { CONTENT } from './index';
import { RESOURCE_TYPES_LIST } from '../../constants/ui';
import ResourceTypeIcon from '../UI/ResourceTypeIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const H3 = styled.h3`
  color: ${({ theme }) => theme.colors.darkgrey};
  font-size: 15px;
  margin-bottom: 0;
  margin-top: 0;
  font-weight: 400;
`;

const CardHeader = ({ resourceType, render, linksToExternal }) => {
  return (
    <div
      style={{
        padding: '6px 10px 0',
      }}
    >
      <H3>
        <ResourceTypeIcon type={resourceType} />
        {render ? (
          render(resourceType)
        ) : (
          <span
            style={{
              margin: '4px',
            }}
          >
            {CONTENT.byResourceType[resourceType].text}
          </span>
        )}
        {linksToExternal && (
          <small>
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </small>
        )}
      </H3>
    </div>
  );
};

CardHeader.propTypes = {
  resourceType: PropTypes.oneOf(RESOURCE_TYPES_LIST),
  linksToExternal: PropTypes.bool.isRequired,
  render: PropTypes.func,
};

CardHeader.defaultProps = {
  linksToExternal: false,
};

export default CardHeader;
