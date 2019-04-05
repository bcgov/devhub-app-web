import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const CardWrapper = styled.article`
  max-width: 480px;
  height: 300px;
  border-radius: 2px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  transition: transform 0.25s ease-out;
  box-shadow: 0 1px 2px 1px #00000026;
`;

const Header = styled.header`
  display: flex;
  flex-flow: row nowrap;
  overflow: hidden;
  padding: 4px;
  background-color: ${({ theme }) => theme.colors.Events} > h2, h4 {
    color: #fff;
    margin-bottom: 0;
  }
`;

const Body = styled.div`
  display: flex;
  flex-flow: row wrap-reverse;
`;

const EventDescriptionContainer = styled.div`
  overflow: 'auto';
  flex: 1 1 75%;
  min-width: 280px;
`;

const EventDetailsContainer = styled.div`
  flex: 1 1 25%;
  min-width: 280px;
`;
export const Event = ({ title, description, where, organizer, image, when, link }) => (
  <CardWrapper>
    <Header>
      <h2>{title}</h2>
      <h4>{organizer}</h4>
    </Header>
    <Body>
      <img src={image} alt={title} />
      <EventDescriptionContainer dangerouslySetInnerHTML={{ __html: description }} />
      <EventDetailsContainer>
        <h5>Where</h5>
        <p>1012 Douglas</p>
        <h5>When</h5>
        <p>March 12 to March 14 2019</p>
      </EventDetailsContainer>
    </Body>
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
export default Event;
