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
import CardHeader from '../Card/CardHeader';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Description } from '../Card';

import {
  Container as JourneyContainer,
  TopicDecorativeBar,
  PreviewContainer,
  TopicTitle,
  TitleLink,
} from '../Topic';
import { JOURNEY } from '../../constants/ui';
import { SubwayLine } from './SubwayLine';

export const JourneyDescription = styled(Description)`
  max-width: 500px;
  margin-bottom: 15px;
`;

export const TEST_IDS = {
  journey: 'journey.container',
};

export const JourneyMap = ({ title, link, stops, description, ...rest }) => {
  return (
    <JourneyContainer data-testid={TEST_IDS.journey} {...rest}>
      <TopicDecorativeBar color={JOURNEY} />
      <PreviewContainer>
        <CardHeader resourceType={JOURNEY} />
        <TopicTitle clamp={4}>
          {link ? (
            <TitleLink to={link.to} data-testid={`topic-${title}`}>
              {title}
            </TitleLink>
          ) : (
            title
          )}
        </TopicTitle>
        {description && <JourneyDescription clamp={3}>{description}</JourneyDescription>}
        <div style={{ overflowX: 'auto' }}>
          <SubwayLine stops={stops} color={JOURNEY} />
        </div>
      </PreviewContainer>
    </JourneyContainer>
  );
};

JourneyMap.propTypes = {
  title: PropTypes.string,
  link: PropTypes.object,
  description: PropTypes.string,
  stops: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
};
