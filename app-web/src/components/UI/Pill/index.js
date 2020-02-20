import React from 'react';
import PropTypes from 'prop-types';
import {
  faTimes,
  faTimesCircle,
  faLayerGroup,
  faUser,
  faTag,
  faSearch,
  faProjectDiagram,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';
import ResourceTypeIcon from '../ResourceTypeIcon';

const variants = {
  outlined: 'outlined',
  filled: 'filled',
};

const Container = styled.button`
  padding: 3px;
  border-radius: 1em;
  color: rgba(0, 0, 0, 0.87);
  margin: 4px 5px;
  position: relative;
  display: flex;
  align-items: center;
  border-color: transparent;
  border-width: 1px;
  border-style: solid;
  :focus {
    outline: none;
  }
  > span {
    margin: 0 4px;
    font-size: 0.875em;
  }
  @media only screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const FilledContainer = styled(Container)`
  background-color: #e0e0e0;
`;

const OutlinedContainer = styled(Container)`
  border: 1px solid #ccc;
`;

const PillIcon = styled(FontAwesomeIcon)`
  margin: ${props => (props.icon.iconName === 'times' ? '0 6.75px' : '0 4px')};
`;

const ResourceIconDiv = styled.div`
  padding-left: 5px;
`;

export const TEST_IDS = {
  pillIcon: 'ui-pill-icon',
  pill: 'ui-pill',
};
/**
 * Pill Component
 * @param {Object} props
 * @param {Object} props.label the text inside the pill
 * @param {Object} props.otherIcon if passed, then the corresponding icon will show up to the left of the text
 * @param {Object} props.resourceType if a resource type is passed, then adds resourceType icon to the left of text
 * @param {Object} props.icon *optional* a react compnent that will render to the left of the text
 * @param {Object} props.variant *defaults to filled* the render style [outlined, filled]
 * @param {Object} props.onDelete called if deletable is true, receives label as an arg
 * @param {Object} props.onClick click handler for entire pill if passed in
 */
export const Pill = ({
  label,
  otherIcon,
  resourceType,
  icon,
  variant,
  onDelete,
  onClick,
  deletable,
  type,
  ...rest
}) => {
  const props = {
    'data-testid': TEST_IDS.pill,
  };

  if (onClick) {
    props.onClick = onClick;
  }
  let specialIcon;
  if (otherIcon === 'topic') {
    specialIcon = faLayerGroup;
  } else if (otherIcon === 'journey') {
    specialIcon = faProjectDiagram;
  } else if (otherIcon === 'label') {
    specialIcon = faTag;
  } else if (otherIcon === 'persona') {
    specialIcon = faUser;
  } else if (otherIcon === 'search') {
    specialIcon = faSearch;
  }

  if (variant === variants.filled) {
    return (
      <FilledContainer {...props} {...rest} data-variant={variant.filled}>
        {resourceType && (
          <ResourceIconDiv>
            <ResourceTypeIcon type={resourceType} />
          </ResourceIconDiv>
        )}
        {otherIcon && <PillIcon icon={specialIcon} />}
        <span>{label}</span>
        {deletable && (
          <PillIcon
            aria-label="delete"
            data-testid={TEST_IDS.pillIcon}
            icon={faTimesCircle}
            onClick={() => onDelete(label)}
          />
        )}
      </FilledContainer>
    );
  } else if (variant === variants.outlined) {
    return (
      <OutlinedContainer {...props} {...rest} data-variant={variant.outlined}>
        {resourceType && (
          <ResourceIconDiv>
            <ResourceTypeIcon type={resourceType} />
          </ResourceIconDiv>
        )}
        {otherIcon && <PillIcon icon={specialIcon} />}
        <span>{label}</span>
        {deletable && (
          <PillIcon aria-label="delete" icon={faTimes} onClick={() => onDelete(label)} />
        )}
      </OutlinedContainer>
    );
  }
  return (
    <Container {...props} {...rest}>
      <span>{label}</span>
      {deletable && <PillIcon aria-label="delete" icon={faTimes} onClick={() => onDelete(label)} />}
    </Container>
  );
};

Pill.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.node,
  otherIcon: PropTypes.string,
  resourceType: PropTypes.string,
  variant: PropTypes.oneOf(Object.keys(variants)),
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  deletable: PropTypes.bool.isRequired,
};

Pill.defaultProps = {
  variant: variants.filled,
  deletable: true,
};

export default Pill;
