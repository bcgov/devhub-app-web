import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import { EVENT_TYPES } from '../../constants/ui';

const EventLogo = ({ type }) => (
  <StaticQuery
    query={graphql`
      query EventLogo {
        eventbrite: file(relativePath: { eq: "eventbrite.png" }) {
          ...eventTypeLogo
        }
      }
    `}
    render={data => {
      if (type === EVENT_TYPES.eventbrite) {
        return <GatsbyImage fixed={data.eventbrite.childImageSharp.fixed} />;
      }
      return null;
    }}
  />
);

EventLogo.propTypes = {
  type: PropTypes.oneOf(Object.keys(EVENT_TYPES)),
};

export const EventTypeLogo = graphql`
  fragment eventTypeLogo on File {
    childImageSharp {
      fixed(width: 85, quality: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`;
export default EventLogo;
