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
import validUrl from 'valid-url';
import CardHeader from './CardHeader';

import {
  CardBody,
  CardDescription,
  CardImage,
  CardImageWrapper,
  CardLinkWrapper,
  CardTitle,
  CardWrapper,
  DecorativeBar,
  EventInfoDiv,
  EventDate,
  EventContainer,
  EventImageWrapper,
  MeetupImageWrapper,
} from './index';
import Aux from '../../../hoc/auxillary';

import { RESOURCE_TYPES_LIST } from '../../../constants/ui';
import EventLogo from '../../Event/Logo';

const Card = ({ type, title, description, image, link, ...rest }) => {
  let isExternal = !!validUrl.isWebUri(link);
  // if there is an image it takes priority

  let cardBody = (
    <CardDescription title={description} clamp={6} tagName="p">
      {description}
    </CardDescription>
  );
  //Little if statement to change the amount of lines we want to clamp based on if the title takes 1 or two lines
  let clampAmount = 4;
  //if takes one line.......
  if (title.length < 23) {
    clampAmount = 5;
  }

  //first check if its an eventbrite event, as in our resolver in gatsby-node.js -> image is set to "eventbrite"
  if (image === 'eventbrite' && description) {
    cardBody = (
      <Aux>
        <CardDescription title={description} clamp={clampAmount} tagName="p">
          {rest.event.unfurl.description}
        </CardDescription>
        <EventContainer>
          <EventDate>
            <span>{rest.event.start.month}</span>
            {rest.event.start.day}
            <small>{rest.event.start.year}</small>
          </EventDate>
          <EventInfoDiv>
            <li>
              {rest.event.venue !== null ? rest.event.venue : 'tbd'}
              <EventImageWrapper>
                <EventLogo type={image} />
              </EventImageWrapper>
            </li>
          </EventInfoDiv>
        </EventContainer>
      </Aux>
    );
  } else if (image === 'meetup' && description) {
    cardBody = (
      <Aux>
        <CardDescription title={description} clamp={clampAmount} tagName="p">
          {rest.event.unfurl.description}
        </CardDescription>
        <EventContainer>
          <EventDate>
            <span>{rest.event.start.month}</span>
            {rest.event.start.day}
            <small>{rest.event.start.year}</small>
          </EventDate>
          <EventInfoDiv>
            <li>
              {rest.event.venue !== null ? rest.event.venue : 'tbd'}
              <MeetupImageWrapper>
                <EventLogo type={image} />
              </MeetupImageWrapper>
            </li>
          </EventInfoDiv>
        </EventContainer>
      </Aux>
    );
  } else if (image && description) {
    cardBody = (
      <Aux>
        <CardDescription title={description} clamp={2} tagName="p">
          {description}
        </CardDescription>
        <CardImageWrapper>
          <CardImage src={image} alt={title} />
        </CardImageWrapper>
      </Aux>
    );
  } else if (image) {
    cardBody = (
      <CardImageWrapper>
        <CardImage src={image} alt={title} />
      </CardImageWrapper>
    );
  }

  return (
    <CardLinkWrapper to={link}>
      <CardWrapper {...rest}>
        <DecorativeBar type={type} />
        <CardBody>
          <CardHeader type={type} linksToExternal={isExternal} />
          <CardTitle clamp={image && description ? 2 : 3} tagName="h2" title={title}>
            {title}
          </CardTitle>
          {cardBody}
        </CardBody>
      </CardWrapper>
    </CardLinkWrapper>
  );
};

Card.propTypes = {
  type: PropTypes.oneOf(RESOURCE_TYPES_LIST),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  link: PropTypes.string.isRequired,
};

Card.defaultProps = {
  description: null,
  image: null,
};

export default Card;
