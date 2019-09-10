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
  Description,
  Image,
  ImageWrapper,
  LinkWrapper,
  Title,
  Container,
  DecorativeBar,
} from './index';

import { RESOURCE_TYPES_LIST } from '../../constants/ui';

const variants = {
  basic: 'basic', // title, description, normal card header
  imageOnly: 'imageOnly', // title, image, normal card header
  descAndImage: 'descAndImage', // title, desc, image, normal card header
};

/**
 * Basic building block to compose all other cards from
 * @param {Object} Props
 */
export const BaseCard = ({ resourceType, children, link, ...rest }) => (
  <LinkWrapper to={link}>
    <Container {...rest}>
      <DecorativeBar color={resourceType} />
      {children}
    </Container>
  </LinkWrapper>
);

BaseCard.propTypes = {
  resourceType: PropTypes.oneOf(RESOURCE_TYPES_LIST),
  link: PropTypes.string.isRequired,
  children: PropTypes.node,
};
/**
 * base card component
 * @param {Object} props
 */
const Card = ({
  resourceType,
  title,
  description,
  image,
  link,
  renderBody,
  renderHeader,
  ...rest
}) => {
  let isExternal = !!validUrl.isWebUri(link);
  let cardBody = null;
  let inferredVariant = 'basic';

  if (image && description) inferredVariant = variants.descAndImage;

  if (!description) inferredVariant = variants.imageOnly;

  // eslint-disable-next-line default-case
  switch (inferredVariant) {
    case variants.basic:
      cardBody = (
        <CardBody>
          {renderHeader ? (
            renderHeader()
          ) : (
            <CardHeader resourceType={resourceType} linksToExternal={isExternal} />
          )}
          <Title>{title}</Title>
          <Description clamp={6} tagName="p">
            {description}
          </Description>
        </CardBody>
      );
      break;
    case variants.imageOnly:
      cardBody = (
        <CardBody>
          <CardHeader resourceType={resourceType} linksToExternal={isExternal} />
          <Title>{title}</Title>
          <ImageWrapper>
            <Image src={image} alt={title} />
          </ImageWrapper>
        </CardBody>
      );
      break;
    case variants.descAndImage:
      cardBody = (
        <CardBody>
          <Description title={description} clamp={2} tagName="p">
            {description}
          </Description>
          <ImageWrapper>
            <Image src={image} alt={title} />
          </ImageWrapper>
        </CardBody>
      );
      break;
  }

  return (
    <BaseCard resourceType={resourceType} link={link}>
      <CardBody>
        <CardHeader resourceType={resourceType} linksToExternal={isExternal} />
        <Title clamp={image && description ? 2 : 3} tagName="h2" title={title}>
          {title}
        </Title>
        {renderBody ? renderBody() : cardBody}
      </CardBody>
    </BaseCard>
  );
};

Card.propTypes = {
  resourceType: PropTypes.oneOf(RESOURCE_TYPES_LIST),
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  renderBody: PropTypes.func,
  renderHeader: PropTypes.func,
};

Card.defaultProps = {
  description: null,
  image: null,
};

export default Card;
