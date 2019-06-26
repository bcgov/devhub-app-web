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

Created by Derek Siemens
*/

import React from 'react';

import {
  CardDescription,
  CardImage,
  CardImageWrapper,
  CardTitle,
  EventInfoDiv,
  EventDate,
  EventContainer,
  EventImageWrapper,
  MeetupImageWrapper,
} from './index';
import Aux from '../../../hoc/auxillary';
import EventLogo from '../../Event/Logo';

//returns the event inforamtion as a component for the bottom of the card
const EventBody = ({ image, event, ComponentType }) => {
  return (
    <EventContainer>
      <EventDate>
        <span>{event.start.month}</span>
        {event.start.day}
        <small>{event.start.year}</small>
      </EventDate>
      <EventInfoDiv>
        <li>
          {event.venue !== null ? event.venue : 'tbd'}
          <ComponentType>
            <EventLogo type={image} />
          </ComponentType>
        </li>
      </EventInfoDiv>
    </EventContainer>
  );
};

//Returns the content for the body of a resource card, case for if the resource is an event
const CardBody = ({ title, description, image, showBody, event }) => {
  let cardBody = (
    <CardDescription title={description} clamp={6} tagName="p">
      {description}
    </CardDescription>
  );

  //Little if statement to change the amount of lines we want to clamp based on if the title takes 1 or two lines
  let clampAmount = 4;
  if (title.length < 23) {
    clampAmount = 5;
  }

  //first check if its an eventbrite event or meetup, as in our resolver in gatsby-node.js -> image is set to "eventbrite" if eventbrite - 'meetup' if meetup
  if ((image === 'eventbrite' || image === 'meetup') && description) {
    const ImageWrapper = image === 'eventbrite' ? EventImageWrapper : MeetupImageWrapper;
    cardBody = (
      <Aux>
        <CardDescription title={description} clamp={clampAmount} tagName="p">
          {event.unfurl.description}
        </CardDescription>
        <EventBody event={event} image={image} ComponentType={ImageWrapper} />
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
  if (showBody) {
    return (
      <>
        <CardTitle clamp={image && description ? 2 : 3} tagName="h2" title={title}>
          {title}
        </CardTitle>
        {cardBody}
      </>
    );
  } else {
    return <div />;
  }
};

export default CardBody;
