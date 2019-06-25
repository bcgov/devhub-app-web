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
        meetup: file(relativePath: { eq: "MeetUp.png" }) {
          ...meetUpTypeLogo
        }
      }
    `}
    render={data => {
      if (type === EVENT_TYPES.eventbrite) {
        return <GatsbyImage fixed={data.eventbrite.childImageSharp.fixed} />;
      } else if (type === EVENT_TYPES.meetup) {
        return <GatsbyImage fixed={data.meetup.childImageSharp.fixed} />;
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
      fixed(width: 85, height: 20, quality: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`;

export const MeetUpTypeLogo = graphql`
  fragment meetUpTypeLogo on File {
    childImageSharp {
      fixed(width: 55, height: 25, quality: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`;
export default EventLogo;
