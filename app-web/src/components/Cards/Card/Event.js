import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import {
  CardBody,
  CardWrapper,
  DecorativeBar,
  CardHeader,
  CardTitle,
  CardDescription,
  CardImageWrapper,
} from './index';

const DescriptionContainer = styled.div`
  display: flex;
`;
const Event = ({ title, description, where, organizer, image, date, link }) => (
  <CardWrapper>
    <DecorativeBar type="Events" />
    <CardBody>
      <CardHeader type="Events" linksToExternal />
      <CardTitle clamp={2} tagName="h2">
        {title}
      </CardTitle>
      <DescriptionContainer>
        <CardImageWrapper>
          <img src={image} alt={title} />
        </CardImageWrapper>
        <CardDescription>{description}</CardDescription>
      </DescriptionContainer>
    </CardBody>
  </CardWrapper>
);

Event.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  where: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
  logo: PropTypes.string,
  date: PropTypes.string,
  link: PropTypes.string,
};
