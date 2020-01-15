import React, { useState } from 'react';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import validUrl from 'valid-url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavItem from '../GithubTemplate/Navigation/NavItem';
import { JOURNEY_TOPIC_VIEW_MODES, RESOURCE_TYPES_LIST } from '../../constants/ui';
import Switch from 'react-switch';

const TableTitle = styled.h3`
  font-size: 20px;
  margin: 0;
  font-weight: 300;
  color: black;
`;

const ArrowIcon = styled.span`
  width: 22px;
  height: 22px;
  transition: transform 0.3s ease-in-out;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.8;
  transform-origin: 25% 50%;
  transform: ${props => (props.opened ? 'rotate(90deg)' : 'rotate(0deg)')};
`;

const ModeContainer = styled.span`
  font-size: 18px;
  padding: 10px;
  margin-top: 3px;
`;

// used by topics/journeys to provide that underlined border between a journey and or topic
export const OutsideBorder = styled.li`
  top-margin: 15px;
  padding: 7px;
  list-style: none;
  margin-bottom: 0;
  :not(:last-of-type) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }
`;

export const AccordionList = styled.ul`
  margin: 0;
  padding: 0;
  background-color: #fff;
  max-width: 650px;
  overflow: scroll;
  border-top: 1px solid rgba(#000, 0.1);
`;

/**
 *
 * @param {String} pathname the pathname of the current page
 * @param {Boolean} viewMode the current view mode
 */
export const viewToggle = (pathname, viewMode) => {
  if (viewMode === JOURNEY_TOPIC_VIEW_MODES.card) {
    navigate(`${pathname}?v=${JOURNEY_TOPIC_VIEW_MODES.list}`);
  } else if (viewMode === JOURNEY_TOPIC_VIEW_MODES.list) {
    navigate(`${pathname}?v=${JOURNEY_TOPIC_VIEW_MODES.card}`);
  }
};

export const TableOfContentsToggle = ({ viewMode, ...rest }) => (
  <div>
    <ModeContainer>List View </ModeContainer>
    <Switch
      checked={viewMode === JOURNEY_TOPIC_VIEW_MODES.card}
      uncheckedIcon={false}
      checkedIcon={false}
      offColor={'#0f80cc'}
      {...rest}
    />
    <ModeContainer> Card View</ModeContainer>
  </div>
);

export const TableOfContents = ({ title, contents }) => {
  const [opened, setOpened] = useState(false);
  return (
    <React.Fragment>
      <div
        onClick={() => setOpened(!opened)}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <TableTitle>{title}</TableTitle>
        <ArrowIcon opened={opened} data-testid={`table-of-contents-${title}`}>
          <FontAwesomeIcon icon={faChevronRight} />
        </ArrowIcon>
      </div>

      {opened && (
        <AccordionList style={{ margin: 0, paddingLeft: 0, fontSize: '1.15em' }}>
          {contents.map(content => (
            <NavItem
              key={content.path}
              resourceType={content.resourceType}
              text={content.title}
              to={content.path}
              isExternal={validUrl.isWebUri(content.path)}
            />
          ))}
        </AccordionList>
      )}
    </React.Fragment>
  );
};

TableOfContents.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
      resourceType: PropTypes.oneOf(RESOURCE_TYPES_LIST),
    }),
  ),
};

export default TableOfContents;
