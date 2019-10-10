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
import ResourceTypeIcon from '../UI/ResourceTypeIcon';
import isFunction from 'lodash/isFunction';
import { Link } from '../UI/Link';

const JunctionContainer = styled.ul`
  margin: 5px 0;
  border-left: 2px solid ${({ theme }) => theme.colors.darkgrey};
  color: ${({ theme }) => theme.colors.darkgrey};
  font-size: 12px;
  font-weight: 400;
  border-top-left-radius: ${({ variant }) => (variant === 'up' ? '4px' : 0)};
  border-bottom-left-radius: ${({ variant }) => (variant === 'down' ? '4px' : 0)};
  padding: ${({ variant }) => (variant === 'down' ? '1.65em 0 0 4px' : '0 0 1.65em 4px')};
  list-style: none;
  li {
    margin: 6px 0;

    transform: ${({ variant }) =>
      variant === 'up' ? 'translateY(-0.25em)' : 'translateY(0.25em)'};
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    text-align: left;
    a {
      max-width: 150px;
      flex: 1 0 auto;
      color: ${({ theme }) => theme.colors.lightblue};
    }
  }
`;

const stationVariants = ['up', 'down'];

export const JunctionList = ({ links, variant, renderLink, ...rest }) => {
  return (
    <JunctionContainer variant={variant} {...rest}>
      {links.map(l => (
        <li key={l.to}>
          <span>
            ─&nbsp;
            <ResourceTypeIcon type={l.resourceType} style={{ marginRight: '4px' }} />
          </span>
          {renderLink && isFunction(renderLink) ? renderLink(l) : <Link to={l.to}>{l.name}</Link>}
        </li>
      ))}
    </JunctionContainer>
  );
};

JunctionList.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, to: PropTypes.string })),
  variant: PropTypes.oneOf(stationVariants),
  renderLink: PropTypes.func,
};

JunctionList.defaultProps = {
  variant: 'up',
};
