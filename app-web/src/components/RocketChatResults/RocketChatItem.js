import React from 'react'
import { Link } from '../UI/Link';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

export const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0;
  padding: 0;
  :hover {
    text-decoration: none;
  }
`;
export const Author = styled.span`
  font-size: 15px;
  color: #222;
`;
export const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  color: inherit;
  font-size: 12px;
  top: 5px;
  right: 6px;
  display: none;
`
export const Container = styled.div`
  padding: 4px 6px;
  position: relative;
  transition: background-color .15s ease-out;
  :hover {
    background-color: #f0f0f0;
  }
  :hover ${Icon} {
      display: inline;
  }
`;

export const Time = styled.span`
  color: #888;
  font-size: 14px;
  font-weight: 300;
  margin-left: 4px;
  text-decoration: none;
`;

export const Message = styled.div`
  font-size: 14px;
  text-transform: none;
  font-weight: 300;
  color: #444;
  margin-bottom: 0;
`;


export const RocketChatItem = ({id, roomId, author, time, message}) => (
  <StyledLink to={link}>
    <Container>
      <Icon icon={faExternalLinkAlt} />
      <div>
        <Author>{author}</Author><Time>{time}</Time>
      </div>
      <Message>{message}</Message>
    </Container>
  </StyledLink>
);