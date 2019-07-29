import React from 'react';
import PropTypes from 'prop-types';
import { faTimes, faTimesCircle, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
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
/**
 * Pill Component
 * @param {Object} props
 * @param {Object} props.label the text inside the pill
 * @param {Object} props.topic if topic is true, then adds topic icon to the left of text
 * @param {Object} props.resourceType if true, then adds resourceType icon to the left of text
 * @param {Object} props.icon *optional* a react compnent that will render to the left of the text
 * @param {Object} props.variant *defaults to filled* the render style [outlined, filled]
 * @param {Object} props.onDelete called if deletable is true, receives label as an arg
 * @param {Object} props.onClick click handler for entire pill if passed in
 */
export const Pill = ({
  label,
  topic,
  resourceType,
  icon,
  variant,
  onDelete,
  onClick,
  deletable,
  type,
  ...rest
}) => {
  const props = {};

  if (onClick) {
    props.onClick = onClick;
  }

  if (variant === variants.filled) {
    return (
      <FilledContainer {...props} {...rest} data-variant={variant.filled}>
        {resourceType && (
          <ResourceIconDiv>
            <ResourceTypeIcon type={resourceType} />
          </ResourceIconDiv>
        )}
        {topic && <PillIcon icon={faLayerGroup} />}
        <span>{label}</span>
        {deletable && (
          <PillIcon aria-label="delete" icon={faTimesCircle} onClick={() => onDelete(label)} />
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
        {topic && <PillIcon icon={faLayerGroup} />}
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
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
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
