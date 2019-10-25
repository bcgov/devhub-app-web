import React from 'react';
import PropTypes from 'prop-types';
import {
  RESOURCE_TYPES,
  TOPICS,
  RESOURCE_TYPES_LIST,
  SEARCH_RESOURCE_TYPES,
  JOURNEY,
} from '../../../constants/ui';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faPuzzlePiece,
  faFile,
  faTools,
  faLayerGroup,
  faCalendar,
  faExclamationCircle,
  faProjectDiagram,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/fontawesome-free-brands';

const FaIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.colors[props.type]};
`;

export const TEST_IDS = {
  icon: 'resource-type-icon',
};

export const ResourceTypeIcon = ({ type }) => {
  let icon;
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
    case TOPICS:
      icon = faLayerGroup;
      break;
    case RESOURCE_TYPES.REPOSITORIES:
      icon = faGithub;
      break;
    case RESOURCE_TYPES.EVENTS:
      icon = faCalendar;
      break;
    case SEARCH_RESOURCE_TYPES.GITHUB_ISSUE:
      icon = faExclamationCircle;
      break;
    case JOURNEY:
      icon = faProjectDiagram;
      break;
    case SEARCH_RESOURCE_TYPES.DOCUMIZE:
      icon = faBook;
      break;
    default:
      icon = null;
  }

  if (!icon) return null;

  return <FaIcon type={type} icon={icon} data-testid={TEST_IDS.icon} />;
};

ResourceTypeIcon.propTypes = {
  type: PropTypes.oneOf(RESOURCE_TYPES_LIST.concat([TOPICS])),
};

export default ResourceTypeIcon;
