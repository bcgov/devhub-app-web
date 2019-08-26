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
import PropTypes from 'prop-types';

import { EventInfoDiv, EventDate, EventContainer } from './index';
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

EventBody.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventBody;
