import React, { useState } from 'react';
import styled from '@emotion/styled';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import validUrl from 'valid-url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavItem from '../GithubTemplate/Navigation/NavItem';
import { JOURNEY_TOPIC_VIEW_MODES } from '../../constants/ui';
import Switch from 'react-switch';

const Title = styled.h3`
  font-size: 20px;
  margin: 0;
  font-weight: 300;
  color: black;
`;

const Inline = styled.li`
  display: block;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between; //for arrowIcon
  align-items: center;
  background-color: white;
  z-index: 2;
  position: center;
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

const Content = styled.li`
  opacity: 1;
  margin-left: 30px;
`;

const ModeContainer = styled.span`
  font-size: 18px;
  padding: 10px;
  margin-top: 3px;
`;

const OutsideBorder = styled.div`
  top-margin: 15px;
  padding: 7px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;

const AccordionList = styled.ul`
  margin: 10px;
  padding: 10px;
  background-color: #fff;
  max-width: 650px;
  overflow: scroll;
  border-top: 1px solid rgba(#000, 0.1);
`;

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
    <div>
      <Inline onClick={() => setOpened(!opened)}>
        <Title>{title}</Title>
        <ArrowIcon opened={opened}>
          <FontAwesomeIcon icon={faChevronRight} />
        </ArrowIcon>
      </Inline>
      {opened && (
        <div>
          {contents.map(content => (
            <Content key={content.path}>
              <NavItem
                key={content.path}
                resourceType={content.resourceType}
                text={content.title}
                to={content.path}
                isExternal={validUrl.isWebUri(content.path)}
              />
            </Content>
          ))}
        </div>
      )}
    </div>
  );
};

TableOfContents.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ),
};

export default TableOfContents;
