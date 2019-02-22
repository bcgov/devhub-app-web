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
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { RESOURCES } from '../../../messages';
import { RESOURCE_TYPES, RESOURCE_TYPES_LIST } from '../../../constants/ui';
import {
  faUserCircle,
  faPuzzlePiece,
  faFile,
  faTools,
  faLayerGroup,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/fontawesome-free-brands';
// renders the upper ribbon for the card
const FaIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.colors[props.type]};
`;

const H3 = styled.h3`
  color: #444;
  font-size: 14px;
  &span {
    margin: 4px;
  }
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
    case RESOURCE_TYPES.COLLECTIONS:
      icon = faLayerGroup;
      break;
    case RESOURCE_TYPES.REPOSITORIES:
      icon = faGithub;
      break;
  }

  return (
    <div type={type}>
      <H3>
        <FaIcon type={type} icon={icon} /> <span>{RESOURCES.types[type].defaultMessage}</span>
        {linksToExternal && <FontAwesomeIcon icon={faExternalLinkAlt} />}
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
