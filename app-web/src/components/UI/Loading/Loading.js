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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';

const Spinner = styled(FontAwesomeIcon)`
  @keyframes spin {
    from {
      transform: rotateZ(0);
    }

    to {
      transform: rotateZ(360deg);
    }
  }
  font-size: 2.5em;
  animation: spin 0.85s cubic-bezier(0.46, 0.65, 0.43, 0.88) infinite;
`;

const Loading = ({ message }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px',
      padding: '15px',
    }}
  >
    <p style={{ marginBottom: '15px' }}>{message}</p>
    <Spinner icon={faSpinner} />
  </div>
);

Loading.propTypes = {
  message: PropTypes.string,
};

Loading.defaultProps = {
  message: null,
};

export default Loading;
