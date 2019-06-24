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
import { PathBar } from './PathBar';
import { css } from '@emotion/core';

import {
  CardBody,
  CardDescription,
  CardImage,
  CardImageWrapper,
  CardLinkWrapper,
  CardTitle,
  CardWrapper,
  EventInfoDiv,
  EventDate,
  EventContainer,
  EventImageWrapper,
  MeetupImageWrapper,
  DecorativeBar,
} from './index';
import Aux from '../../../hoc/auxillary';

import { RESOURCE_TYPES_LIST } from '../../../constants/ui';
import EventLogo from '../../Event/Logo';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pathsExist: false };
  }

  handleClick = () => {
    this.setState({ pathsExist: !this.state.pathsExist });
  };

  render() {
    let cardBody = (
      <CardDescription title={this.props.description} clamp={6} tagName="p">
        {this.props.description}
      </CardDescription>
    );
    let isExternal = !!validUrl.isWebUri(this.props.link);

    //Little if statement to change the amount of lines we want to clamp based on if the title takes 1 or two lines
    let clampAmount = 4;
    //if takes one line.......
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
          <EventContainer>
            <EventDate>
              <span>{this.props.event.start.month}</span>
              {this.props.event.start.day}
              <small>{this.props.event.start.year}</small>
            </EventDate>
            <EventInfoDiv>
              <li>
                {this.props.event.venue !== null ? this.props.event.venue : 'tbd'}
                <EventImageWrapper>
                  <EventLogo type={this.props.image} />
                </EventImageWrapper>
              </li>
            </EventInfoDiv>
          </EventContainer>
        </Aux>
      );
    } else if (this.props.image === 'meetup' && this.props.description) {
      cardBody = (
        <Aux>
          <CardDescription title={this.props.description} clamp={clampAmount} tagName="p">
            {this.props.event.unfurl.description}
          </CardDescription>
          <EventContainer>
            <EventDate>
              <span>{this.props.event.start.month}</span>
              {this.props.event.start.day}
              <small>{this.props.event.start.year}</small>
            </EventDate>
            <EventInfoDiv>
              <li>
                {this.props.event.venue !== null ? this.props.event.venue : 'tbd'}
                <MeetupImageWrapper>
                  <EventLogo type={this.props.image} />
                </MeetupImageWrapper>
              </li>
            </EventInfoDiv>
          </EventContainer>
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
    let links = [
      { link: 'http://0.0.0.0:8000/collections', name: 'Collections' },
      {
        link: 'http://0.0.0.0:8000/Community-and-Events/BC-Gov-Development-Community-Events',
        name: 'Community and Events',
      },
    ];

    if (links.length > 1) {
      return (
        <div
          onClick={this.handleClick}
          css={css`
            margin: 0 6px 0 6px;
          `}
        >
          <CardWrapper {...this.props}>
            <DecorativeBar type={this.props.type} />
            <CardBody>
              <PathBar Paths={this.state.pathsExist} links={links} />
              <CardHeader type={this.props.type} linksToExternal={isExternal} manyPaths={true} />
              <CardTitle
                clamp={this.props.image && this.props.description ? 2 : 3}
                tagName="h2"
                title={this.props.title}
              >
                {this.props.title}
              </CardTitle>
              {cardBody}
            </CardBody>
          </CardWrapper>
        </div>
      );
    } else {
      return (
        <CardLinkWrapper to={this.props.link}>
          <CardWrapper {...this.props}>
            <DecorativeBar type={this.props.type} />
            <CardBody>
              <PathBar Paths={this.state.pathsExist} links={links} />
              <CardHeader type={this.props.type} linksToExternal={isExternal} manyPaths={false} />
              <CardTitle
                clamp={this.props.image && this.props.description ? 2 : 3}
                tagName="h2"
                title={this.props.title}
              >
                {this.props.title}
              </CardTitle>
              {cardBody}
            </CardBody>
          </CardWrapper>
        </CardLinkWrapper>
      );
    }
  }
}

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
