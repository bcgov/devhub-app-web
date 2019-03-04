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
} from './index';
import Aux from '../../../hoc/auxillary';

import { RESOURCE_TYPES_LIST } from '../../../constants/ui';

const Card = ({ type, title, description, image, link, theme }) => {
  // console.log(theme, type);
  let isExternal = validUrl.isWebUri(link);
  // if there is an image it takes priority
  let cardBody = (
    <CardDescription clamp={3} tagName="p">
      {description}
    </CardDescription>
  );

  if (image && description) {
    cardBody = (
      <Aux>
        <CardDescription clamp={2} tagName="p">
          {description}
        </CardDescription>
        <CardImageWrapper>
          <CardImage src={image} />
        </CardImageWrapper>
      </Aux>
    );
  } else if (image) {
    cardBody = (
      <CardImageWrapper>
        <CardImage src={image} />
      </CardImageWrapper>
    );
  }

  return (
    <CardLinkWrapper to={link}>
      <CardWrapper>
        <DecorativeBar type={type} />
        <CardBody>
          <CardHeader type={type} linksToExternal={isExternal} />
          <CardTitle clamp={image && description ? 2 : 3} tagName="h2">
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
};

Card.defaultProps = {
  description: null,
  image: null,
};

export default Card;
