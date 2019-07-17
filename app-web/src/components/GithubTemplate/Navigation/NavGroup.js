import React from 'react';
import PropTypes from 'prop-types';
import validUrl from 'valid-url';
import styled from '@emotion/styled';
import ResourceTypeIcon from '../../UI/ResourceTypeIcon';
import { RESOURCE_TYPES, RESOURCE_TYPES_LIST } from '../../../constants/ui';
import { SPACING } from '../../../constants/designTokens';
import NavItem from './NavItem';

const Container = styled.div`
  margin-bottom: ${SPACING['3x']};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: ${SPACING['2x']};
  border-bottom: 4px solid ${({ theme, type }) => theme.colors[type]};
  h3 {
    font-weight: 600;
    margin-bottom: 0;
    font-size: 18px;
    margin-left: ${SPACING['1x']};
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const titleMapping = {
  [RESOURCE_TYPES.COMPONENTS]: 'Components',
  [RESOURCE_TYPES.DOCUMENTATION]: 'Documentation',
  [RESOURCE_TYPES.REPOSITORIES]: 'Github Repos',
  [RESOURCE_TYPES.SELF_SERVICE_TOOLS]: 'Tools',
  [RESOURCE_TYPES.EVENTS]: 'Events',
};

const NavGroup = ({ type, items }) => {

  const links = items.map(({ to, text }) => (
    <NavItem key={to} text={text} to={to} isExternal={validUrl.isWebUri(to)} />
  ));

  return (
    <Container>
      <Header type={type}>
        <ResourceTypeIcon type={type} />
        <h3>{titleMapping[type]}</h3>
      </Header>
      <List>{links}</List>
    </Container>
  );
};

NavGroup.propTypes = {
  type: PropTypes.oneOf(RESOURCE_TYPES_LIST),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      text: PropTypes.string,
    }),
  ).isRequired,
};

export default NavGroup;
