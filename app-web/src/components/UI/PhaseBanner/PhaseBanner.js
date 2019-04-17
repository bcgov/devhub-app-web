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

export const PHASE_TYPES = {
  beta: 'beta',
  alpha: 'alpha',
};

const Container = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  color: ${({ phase }) => {
    switch (phase) {
      case PHASE_TYPES.alpha:
        return '#fcba19';
      case PHASE_TYPES.beta:
        return '#fcba19';
      default:
        return 'white';
    }
  }};
`;
// produces a label for the application status...alpha, beta etc
const PhaseBanner = ({ phase }) => {
  return (
    <Container phase={phase} aria-label={`This application is currently in ${phase} phase`}>
      {phase}
    </Container>
  );
};

PhaseBanner.propTypes = {
  phase: PropTypes.oneOf(Object.keys(PHASE_TYPES)),
};

PhaseBanner.defaultProps = {
  phase: PHASE_TYPES.beta,
};

export default PhaseBanner;
