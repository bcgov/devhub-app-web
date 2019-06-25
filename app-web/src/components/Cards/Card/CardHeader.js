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
import { css } from '@emotion/core';

import { faExternalLinkAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import { RESOURCES } from '../../../messages';
import { RESOURCE_TYPES_LIST } from '../../../constants/ui';
import ResourceTypeIcon from '../../UI/ResourceTypeIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const H3 = styled.h3`
  color: #444;
  font-size: 14px;
  margin-bottom: 0;
  font-weight: 400;
`;

const Hide = styled.div`
  float: right;
  margin-bottom: 0;
`;

const CardHeader = ({ type, linksToExternal, showPathIcon, showXIcon }) => {
  return (
    <div
      css={css`
        margin-bottom: 4px;
      `}
    >
      <H3>
        <ResourceTypeIcon type={type} />{' '}
        <span
          css={css`
            margin: 4px;
          `}
        >
          {RESOURCES.types[type].defaultMessage}
        </span>
        {linksToExternal && (
          <small
            css={css`
              padding-right: 4px;
            `}
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </small>
        )}
        {showPathIcon && (
          <small>
            <ResourceTypeIcon type={'Collections'} />
          </small>
        )}
        {showXIcon && (
          <Hide>
            <FontAwesomeIcon icon={faTimes} />
          </Hide>
        )}
      </H3>
    </div>
  );
};

CardHeader.propTypes = {
  type: PropTypes.oneOf(RESOURCE_TYPES_LIST),
  linksToExternal: PropTypes.bool.isRequired,
};

CardHeader.defaultProps = {
  linksToExternal: false,
};

export default CardHeader;
