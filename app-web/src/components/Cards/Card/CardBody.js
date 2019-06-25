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

class EventBody extends React.Component {
  render() {
    return (
      <EventContainer>
        <EventDate>
          <span>{this.props.event.start.month}</span>
          {this.props.event.start.day}
          <small>{this.props.event.start.year}</small>
        </EventDate>
        <EventInfoDiv>
          <li>
            {this.props.event.venue !== null ? this.props.event.venue : 'tbd'}
            <this.props.componentType>
              <EventLogo type={this.props.image} />
            </this.props.componentType>
          </li>
        </EventInfoDiv>
      </EventContainer>
    );
  }
}

export class CardBody extends React.Component {
  render() {
    let cardBody = (
      <CardDescription title={this.props.description} clamp={6} tagName="p">
        {this.props.description}
      </CardDescription>
    );

    //Little if statement to change the amount of lines we want to clamp based on if the title takes 1 or two lines
    let clampAmount = 4;
    if (this.props.title.length < 23) {
      clampAmount = 5;
    }

    //first check if its an eventbrite event, as in our resolver in gatsby-node.js -> image is set to "eventbrite"
    if (this.props.image === 'eventbrite' && this.props.description) {
      cardBody = (
        <Aux>
          <CardDescription title={this.props.description} clamp={clampAmount} tagName="p">
            {this.props.event.unfurl.description}
          </CardDescription>
          <EventBody
            event={this.props.event}
            image={this.props.image}
            componentType={EventImageWrapper}
          />
        </Aux>
      );
    } else if (this.props.image === 'meetup' && this.props.description) {
      cardBody = (
        <Aux>
          <CardDescription title={this.props.description} clamp={clampAmount} tagName="p">
            {this.props.event.unfurl.description}
          </CardDescription>
          <EventBody
            event={this.props.event}
            image={this.props.image}
            componentType={MeetupImageWrapper}
          />
        </Aux>
      );
    } else if (this.props.image && this.props.description) {
      cardBody = (
        <Aux>
          <CardDescription title={this.props.description} clamp={2} tagName="p">
            {this.props.description}
          </CardDescription>
          <CardImageWrapper>
            <CardImage src={this.props.image} alt={this.props.title} />
          </CardImageWrapper>
        </Aux>
      );
    } else if (this.props.image) {
      cardBody = (
        <CardImageWrapper>
          <CardImage src={this.props.image} alt={this.props.title} />
        </CardImageWrapper>
      );
    }
    if (this.props.showBody) {
      return (
        <>
          <CardTitle
            clamp={this.props.image && this.props.description ? 2 : 3}
            tagName="h2"
            title={this.props.title}
          >
            {this.props.title}
          </CardTitle>
          {cardBody}
        </>
      );
    } else {
      return <div />;
    }
  }
}
