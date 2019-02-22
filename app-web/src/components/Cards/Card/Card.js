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
import DotDotDot from 'react-dotdotdot';
import Image from 'react-image';
import { Link } from '../../UI/Link';
import Aux from '../../../hoc/auxillary';

import { RESOURCE_TYPES_LIST } from '../../../constants/ui';

const Card = ({ type, title, description, image, link }) => {
  let isExternal = validUrl.isWebUri(link);
  // if there is an image it takes priority
  let cardBody = (
    <DotDotDot clamp={3} tagName="p">
      {description}
    </DotDotDot>
  );

  if (image && description) {
    cardBody = (
      <Aux>
        <DotDotDot clamp={2} tagName="p">
          {description}
        </DotDotDot>
        <Image src={image} />
      </Aux>
    );
  } else if (image) {
    cardBody = <Image src={image} />;
  }

  return (
    <Link to={link}>
      <article>
        <div>{type}</div>
        <DotDotDot clamp={image && description ? 2 : 3} tagName="h2">
          {title}
        </DotDotDot>
        {cardBody}
      </article>
    </Link>
  );
};

Card.propTypes = {
  type: PropTypes.oneOf([RESOURCE_TYPES_LIST]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
};

Card.defaultProps = {
  description: null,
  image: null,
};
