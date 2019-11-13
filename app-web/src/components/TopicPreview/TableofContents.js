import React, { useState } from 'react';
import styled from '@emotion/styled';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import validUrl from 'valid-url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavItem from '../GithubTemplate/Navigation/NavItem';

const Title = styled.h3`
  font-size: 20px;
  margin: 0;
  font-weight: 300;
  color: black;
`;

const Inline = styled.div`
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

const Content = styled.div`
  opacity: 1;
  margin-left: 30px;
`;

const TableofContents = ({ title, contents }) => {
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

TableofContents.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ),
};

export default TableofContents;
