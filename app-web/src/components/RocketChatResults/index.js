import React from 'react';
import styled from '@emotion/styled';
import rocketChatSvg from '../../assets/images/rocketchat_logo.svg';
import {RocketChatItem } from './RocketChatItem';
import { Title, LinkContainer } from '../Home';
import { ChevronLink } from '../UI/Link';
const Container = styled.div`
  padding: 0;
  margin: 0;
  list-style: none;
  max-width: 1100px;
  margin: 20px auto;
  img {
    width: 40px;
    margin-bottom: 0;
    margin-left: 3px;
  }
`;

export const RocketChatResults = ({results}) => (
  <Container>
    <Title>From Rocket.Chat <img src={rocketChatSvg} alt="rocket chat logo"  /></Title>
    {results.slice(0, 10).map(r => <RocketChatItem {...r} key={r.id}/>)}
    <LinkContainer>
      <ChevronLink to="https://chat.pathfinder.gov.bc.ca">Go to Rocket.Chat</ChevronLink>
    </LinkContainer>
  </Container>
)