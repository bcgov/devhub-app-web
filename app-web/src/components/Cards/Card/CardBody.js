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
  EventImageWrapper,
  CardBodyDiv,
} from './index';
import Aux from '../../../hoc/auxillary';
import CardHeader from './CardHeader';
import { EventBody } from './EventBody';

export class CardBody extends React.Component {
  render() {
    let cardBody = (
      <CardDescription title={this.props.description} clamp={6} tagName="p">
        {this.props.description}
      </CardDescription>
    );
    //first check if its an eventbrite event, as in our resolver in gatsby-node.js -> image is set to "eventbrite"
    if (this.props.image) {
      let clampNum = this.props.clampAmount ? this.props.clampAmount : 2;

      cardBody = (
        <Aux>
          {this.props.description && (
            <CardDescription title={this.props.description} clamp={clampNum} tagName="p">
              {this.props.description}
            </CardDescription>
          )}
          {this.props.image === 'eventbrite' ? (
            <EventBody
              event={this.props.event}
              image={this.props.image}
              componentType={EventImageWrapper}
            />
          ) : (
            <>
              <CardImageWrapper>
                <CardImage src={this.props.image} alt={this.props.title} />
              </CardImageWrapper>
            </>
          )}
        </Aux>
      );
    }

    return (
      <CardBodyDiv>
        <CardHeader type={this.props.type} linksToExternal={this.props.isExternal} />
        <CardTitle
          clamp={this.props.image && this.props.description ? 2 : 3}
          tagName="h2"
          title={this.props.title}
        >
          {this.props.title}
        </CardTitle>
        {cardBody}
      </CardBodyDiv>
    );
  }
}
