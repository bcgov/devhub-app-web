import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import DotDotDot from 'react-dotdotdot';
import EventLogo from './Logo';
import { EVENT_TYPES } from '../../constants/ui';

const LinkWrapper = styled.a`
  > * {
    color: initial;
  }
  margin: 10px 15px;
  display: inline-block;
  :hover,
  :focus,
  :visited {
    color: initial;
    text-decoration: none;
  }
`;
const CardWrapper = styled.article`
  position: relative;
  width: 275px;
  display: flex;
  flex-flow: column nowrap;
  height: 400px;
  border-top: transparent;
  border-radius: 2px;
  box-sizing: border-box;
  transition: transform 0.25s ease-out;
  box-shadow: 0 1px 2px 1px #00000026;
  h3 {
    font-size: 0.85rem;
    text-decoration: none;
    margin-bottom: 1rem;
  }
  :hover {
    box-shadow: 0 2px 2px 1px #00000026;
    transform: translateY(-2px);
  }
`;

const Header = styled.div`
  flex: 0 0 55%;
  background-image: ${({ image }) => `url(${image})`};
  border-bottom: 1px solid #ccc;
  background-size: cover;
  border-bottom: 1px solid #ccc;
  background-repeat: no-repeat;
  background-position: center;
`;

const Body = styled.div`
  padding: 0 1em 1em;
  flex: 1 0 auto;
  display: flex;
  flex-flow: column nowrap;
`;

export const EventDetailsContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: auto 0 0 0;
  padding: 0;
  color: #4e4e4e;
  > li {
    margin-bottom: 0.5em;
  }
`;

export const DateLI = styled.li`
  text-align: center;
  width: 4em;
  position: relative;
  height: 4em;
  border-radius: 50%;
  border: 1px solid #00695c;
  margin: 0 1em 1em 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  > span {
    color: tomato;
    font-weight: 400;
    display: block;
    text-transform: uppercase;
  }
  > small {
    position: absolute;
    bottom: -1.75em;
    font-size: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const EventLogoWrapper = styled.div`
  margin: 9px 0 4px;
  flex: 0 0 25px;
  display: flex;
  align-items: center;
  img {
    margin-left: 0;
    padding-left: 15px;
    margin-bottom: 0;
  }
`;

export const Event = ({ title, type, startDay, startMonth, startYear, image, where, url }) => {
  return (
    <LinkWrapper href={url} aria-label={`Check out this event: ${title}`}>
      <CardWrapper>
        <Header image={image} />
        <EventLogoWrapper>
          <EventLogo type={type} />
        </EventLogoWrapper>
        <Body>
          <DotDotDot tagName="h3" clamp={3}>
            {title}
          </DotDotDot>
          <EventDetailsContainer>
            <DateLI>
              <span>{startMonth}</span>
              {startDay}
              <small>{startYear}</small>
            </DateLI>

            <li>{where !== null ? where : 'tbd'}</li>
          </EventDetailsContainer>
        </Body>
      </CardWrapper>
    </LinkWrapper>
  );
};

Event.propTypes = {
  title: PropTypes.string.isRequired,
  where: PropTypes.string,
  organizer: PropTypes.string,
  logo: PropTypes.string,
  date: PropTypes.string,
  link: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(EVENT_TYPES)),
};

Event.defaultProps = {
  where: 'tbd',
  type: 'eventbrite',
};

export default Event;
