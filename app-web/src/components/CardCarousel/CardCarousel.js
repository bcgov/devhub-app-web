import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';

import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import css from '@emotion/css';
import { EMOTION_BOOTSTRAP_BREAKPOINTS } from '../../constants/designTokens';

import { RESOURCE_TYPES_LIST, CARD_CAROUSEL } from '../../constants/ui';

import Card from '../Cards/Card/Card';
import { useStaticQuery } from 'gatsby';
import { flattenGatsbyGraphQL } from '../../utils/dataHelpers';

export const TEST_IDS = {
  arrowLeft: 'carousel-arrow-left',
  arrowRight: 'carousel-arrow-right',
};

const Icon = styled(FontAwesomeIcon)`
  display: none;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.sm} {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 50px;
    padding: 0 5px;
    cursor: pointer;
    display: block;
  }
`;

/**
 * returns whether or not the arrow buttons should show in the carousel
 * based on certain cases the arrow components are returned or not returned
 * @param {Number} numResources the amount of resources within the carousel
 * @param {Number} index the current page position
 * @param {Number} slidesPerPage the amount of slides being displayed in the carousel
 * @returns {Object} the arrow props (or not) to be merged into the remaining carousel props
 */
const showArrow = (numResources, index, slidesPerPage) => {
  if (numResources <= slidesPerPage) {
    return {};
  }
  const maxPages = Math.ceil(numResources / slidesPerPage);
  const nominalSlides = maxPages * slidesPerPage;
  return {
    arrowLeft: index === 0 ? null : <Icon data-testid={TEST_IDS.arrowLeft} icon={faChevronLeft} />,
    arrowRight:
      index + slidesPerPage >= nominalSlides ? null : (
        <Icon data-testid={TEST_IDS.arrowRight} icon={faChevronRight} />
      ),
  };
};

//Takes the title of a card and returns the other places where this card can be found
export const FindPaths = title => {
  const ResourceData = useStaticQuery(graphql`
    query ResourceQuery {
      allDevhubCollection {
        edges {
          node {
            name
            childrenDevhubSiphon {
              collection {
                name
              }
              resource {
                path
              }
              unfurl {
                title
              }
            }
          }
        }
      }
    }
  `);
  const allCards = flattenGatsbyGraphQL(ResourceData.allDevhubCollection.edges).flatMap(
    collection => collection.childrenDevhubSiphon,
  );

  const duplicateCards = allCards.filter(card => card.unfurl.title === title);
  const paths = duplicateCards.map(path => {
    path = {
      name: path.collection.name,
      link: path.resource.path,
    };
    return path;
  });

  return paths;
};

const CardCarousel = ({ resources }) => {
  const [index, setIndex] = useState(0);
  const numResources = resources.length;

  const slides = resources.map(r => (
    <Card
      key={r.id}
      css={css`
        width: 235px;
        margin: 10px;
      `}
      type={r.resource.type}
      title={r.unfurl.title}
      description={r.unfurl.description}
      image={r.unfurl.image}
      link={r.resource.path}
      event={r}
    />
  ));

  const settings = {
    animationSpeed: 125,
    value: index,
    onChange: setIndex,
    ...showArrow(numResources, index, CARD_CAROUSEL.desktop.slidesPerPage),
    addArrowClickHandler: true,
    slidesPerPage: CARD_CAROUSEL.desktop.slidesPerPage,
    slidesPerScroll: CARD_CAROUSEL.desktop.slidesPerScroll,
    itemWidth: 251,
    breakpoints: {
      500: {
        slidesPerPage: CARD_CAROUSEL.mobile.slidesPerPage,
        slidesPerScroll: CARD_CAROUSEL.mobile.slidesPerScroll,
      },
    },
  };
  return <Carousel {...settings}>{slides}</Carousel>;
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
