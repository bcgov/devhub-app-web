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

import { CardLinkWrapper, CardWrapper, DecorativeBar } from './index';

import { RESOURCE_TYPES_LIST } from '../../../constants/ui';
import CardBody from './CardBody';

class Card extends React.Component {
  // if there is an image it takes priority
  render() {
    return (
      <CardLinkWrapper to={this.props.link}>
        <CardWrapper {...this.props.rest}>
          <DecorativeBar type={this.props.type} />
          <CardBody
            type={this.props.type}
            isExternal={!!validUrl.isWebUri(this.props.link)}
            title={this.props.title}
            description={this.props.description}
            event={this.props.event}
            image={this.props.image}
            clampAmount={this.props.title.length < 23 ? 5 : 4}
          />
        </CardWrapper>
      </CardLinkWrapper>
    );
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
