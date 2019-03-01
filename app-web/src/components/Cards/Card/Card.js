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
import styled from '@emotion/styled';
import validUrl from 'valid-url';
import DotDotDot from 'react-dotdotdot';
import Image from 'react-image';
import { Link } from '../../UI/Link';
import CardHeader from './CardHeader';
import Aux from '../../../hoc/auxillary';

import { RESOURCE_TYPES_LIST } from '../../../constants/ui';

const CardLinkWrapper = styled(Link)`
  text-decoration: none;
  color: initial;
  :hover {
    text-decoration: none;
    color: initial;
    cursor: pointer;
  }
`;

const DecorativeBar = styled.div`
  background-color: ${props => props.theme.colors[props.type]};
  height: 10px;
`;

const CardWrapper = styled.article`
  width: 250px;
  height: 225px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 2px;
  box-sizing: border-box;
  transition: transform 0.25s ease-out;
  box-shadow: 0 1px 2px 1px #00000026;
  display: flex;
  flex-flow: column nowrap;
  :hover {
    box-shadow: 0 2px 2px 1px #00000026;
    transform: translateY(-2px);
  }
`;

const CardTitle = styled(DotDotDot)`
  font-weight: 700;
  font-size: 20px;
  color: #494949;
  line-height: 1.3;
  margin-bottom: 0;
  flex: 0 0 auto;
  word-break: break-word;
`;

const CardDescription = styled(DotDotDot)`
  font-size: 14px;
  line-height: 1.4;
  flex: 0 0 auto;
  margin-bottom: 0;
`;

// combination of card image and wrapper make images response correctly
// to the flex container. The card image wrapper can grow/shrink automatically
// the object-fit scaledown maintains aspect ratio for any type of image
const CardImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: scale-down;
  max-height: 100%;
  margin-bottom: 0;
`;

const CardImageWrapper = styled.div`
  flex: 1 1 auto;
  align-self: center;
  overflow: hidden;
  padding-top: 10px;
  text-align: center;
  display: flex;
`;

const CardBody = styled.div`
  padding: 6px 10px;
  height: 100%;
  padding: 6px 10px;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
`;

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
