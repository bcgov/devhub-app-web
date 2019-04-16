import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import { RESOURCE_TYPES_LIST } from '../../constants/ui';
import Card from '../Cards/Card/Card';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2em;
  cursor: pointer;
`;

/**
 * returns whether or not the arrow buttons should show in the carousel
 * if there are less resources than there are slides per page then the buttons are disabled
 * @param {Number} numResources the amount of resources within the carousel
 * @param {Number} slidesPerPage the amount of slides being displayed in the carousel
 */
const showArrow = (numResources, slidesPerPage) =>
  numResources > slidesPerPage
    ? {
        arrowLeft: <Icon icon={faChevronLeft} />,
        arrowRight: <Icon icon={faChevronRight} />,
      }
    : {};

const CardCarousel = ({ resources }) => {
  const [index, setIndex] = useState(0);
  const numResources = resources.length;
  const slides = resources.map(r => (
    <Card
      key={r.id}
      type={r.resource.type}
      title={r.unfurl.title}
      description={r.unfurl.description}
      image={r.unfurl.image}
      link={r.resource.path}
    />
  ));

  const desktopSettings = {
    animationSpeed: 500,
    value: index,
    onChange: setIndex,

    ...showArrow(numResources, 3),
    addArrowClickHandler: true,
    slidesPerPage: 3,
    slidesPerScroll: 3,
    itemWidth: 265,
    breakpoints: {
      500: {
        slidesPerPage: 1,
        slidesPerScroll: 1,
        itemWidth: 250,
        ...showArrow(numResources, 1),
      },
    },
  };

  return <Carousel {...desktopSettings}>{slides}</Carousel>;
};

CardCarousel.propTypes = {
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(RESOURCE_TYPES_LIST),
      unfurl: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        image: PropTypes.string,
      }),
      resource: PropTypes.shape({
        path: PropTypes.string.isRequired,
        type: PropTypes.oneOf(RESOURCE_TYPES_LIST).isRequired,
      }),
    }),
  ),
};

export default CardCarousel;
