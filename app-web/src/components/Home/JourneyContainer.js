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
/**
 * contains the filter menu, and searchbar/cards container
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Container as PreviewContainer, Title, StyledLink } from './index';
import { JourneyMap } from '../Journey';
import { reduceJourneyToSubwayLine } from '../../utils/helpers';

// used for @testing-library/react dom querying
export const TEST_IDS = {
  container: 'journeys-container',
};

export const JourneysContainer = ({ journeys, link }) => (
  <PreviewContainer data-testid={TEST_IDS.container}>
    <Title>
      <StyledLink to={link.to}>Journeys</StyledLink>
    </Title>
    {journeys.map(journey => (
      <JourneyMap
        title={journey.name}
        key={journey.id}
        stops={reduceJourneyToSubwayLine(journey.connectsWith)}
      />
    ))}
  </PreviewContainer>
);

JourneysContainer.propTypes = {
  journeys: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      connectsWith: PropTypes.array.isRequired,
    }),
  ),
  link: PropTypes.shape({
    to: PropTypes.string.isRequired,
  }),
};
export default JourneysContainer;
