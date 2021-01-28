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

import { CONTENT } from '../Card/index';
import { faBook, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styled from '@emotion/styled';

const Header = styled.span`
  color: ${({ theme }) => theme.colors.darkgrey};
  font-size: 15px;
  margin-bottom: 0;
  margin-top: 0;
  font-weight: 400;
  display: flex;
  margin: 4px;
`;

const GithubIssueCardHeader = ({ resourceType, repository }) => {
  return (
    <Header
      style={{
        margin: '4px',
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <span style={{ flex: '1 0 auto' }}>
        {CONTENT.byResourceType[resourceType].text}
        <small style={{ margin: '0 4px' }}>
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </small>
      </span>

      <small style={{ color: '#444', flex: '0 0 105px', padding: '2px 0' }}>
        <FontAwesomeIcon icon={faBook} /> {repository}
      </small>
    </Header>
  );
};

GithubIssueCardHeader.propTypes = {
  resourceType: PropTypes.oneOf(['Github Issue', 'Repository']),
  repository: PropTypes.string,
};

export default GithubIssueCardHeader;
