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
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '../../UI/Link';
import ResourceTypeIcon from '../../UI/ResourceTypeIcon';

const LI = styled.li`
  padding: 8px 4px;
  margin-bottom: 0;
  line-height: 1.25em;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: inline-block;
`;

const Icon = styled.small`
  color: #444;
  margin: 4px;
`;

const NavItem = ({ text, isExternal, resourceType, to, ...rest }) => (
  <LI {...rest}>
    {resourceType && <ResourceTypeIcon type={resourceType} />}
    <StyledLink
      exact="true"
      to={to}
      getProps={({ isCurrent }) => {
        if (isCurrent) {
          return {
            style: {
              textDecoration: 'underline',
            },
          };
        }
        return {};
      }}
    >
      {text}
      {isExternal && (
        <Icon>
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </Icon>
      )}
    </StyledLink>
  </LI>
);

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isExternal: PropTypes.bool.isRequired,
  resourceType: PropTypes.string,
};

export default NavItem;
