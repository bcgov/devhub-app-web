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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faPuzzlePiece,
  faFile,
  faTools,
  faLayerGroup,
  faExternalLinkAlt,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/fontawesome-free-brands';

import { RESOURCES } from '../../../messages';
import { RESOURCE_TYPES, RESOURCE_TYPES_LIST, COLLECTIONS } from '../../../constants/ui';
// renders the upper ribbon for the card
const FaIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.colors[props.type]};
`;

const H3 = styled.h3`
  color: #444;
  font-size: 14px;
  margin-bottom: 0;
  font-weight: 400;
`;

const CardHeader = ({ type, linksToExternal }) => {
  let icon = null;
  // eslint-disable-next-line default-case
  switch (type) {
    case RESOURCE_TYPES.COMPONENTS:
      icon = faPuzzlePiece;
      break;
    case RESOURCE_TYPES.DOCUMENTATION:
      icon = faFile;
      break;
    case RESOURCE_TYPES.PEOPLE:
      icon = faUserCircle;
      break;
    case RESOURCE_TYPES.SELF_SERVICE_TOOLS:
      icon = faTools;
      break;
    case COLLECTIONS:
      icon = faLayerGroup;
      break;
    case RESOURCE_TYPES.REPOSITORIES:
      icon = faGithub;
      break;
    case 'Events':
      icon = faCalendar;
      break;
  }

  return (
    <div
      css={css`
        margin-bottom: 4px;
      `}
    >
      <H3>
        <FaIcon type={type} icon={icon} />{' '}
        <span
          css={css`
            margin: 4px;
          `}
        >
          {RESOURCES.types[type].defaultMessage}
        </span>
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
  type: PropTypes.oneOf(RESOURCE_TYPES_LIST),
  linksToExternal: PropTypes.bool.isRequired,
};

CardHeader.defaultProps = {
  linksToExternal: false,
};

export default CardHeader;
