import React from 'react'
import { Link } from '../UI/Link';
import styled from '@emotion/styled';

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

export const Container = styled.div`
  padding: 4px 6px;
  :hover {
    background-color: #f0f0f0;
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

  font-weight: 300;
  color: #444;
  margin-bottom: 0;
`;

export const RocketChatItem = ({author, time, message, link}) => (
  <StyledLink to={link}>
  <Container>
    <div>
      <Author>{author}</Author><Time>{time}</Time>
    </div>
    <Message>{message}</Message>
  </Container>
  </StyledLink>
);