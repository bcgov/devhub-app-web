import React from 'react';
import styled from '@emotion/styled';
import rocketChatSvg from '../../assets/images/rocketchat_logo.svg';
import { RocketChatItem } from './RocketChatItem';
import { Title, LinkContainer } from '../Home';
import { ChevronLink } from '../UI/Link';
import { SEARCH_SOURCE_CONFIG } from '../../constants/search';
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

export const RocketChatResults = ({ results }) => (
  <Container>
    <Title id={'rocketChat'}>
      From Rocket.Chat <img src={rocketChatSvg} alt="rocket chat logo" />
    </Title>
    {results.length > SEARCH_SOURCE_CONFIG.rocketchat.maxResults && (
      <small>
        Showing {SEARCH_SOURCE_CONFIG.rocketchat.maxResults} of {results.length}
      </small>
    )}
    {results.slice(0, SEARCH_SOURCE_CONFIG.rocketchat.maxResults).map(r => (
      <RocketChatItem {...r} key={r.id} data-testid={r.id} />
    ))}
    <LinkContainer>
      <ChevronLink to="https://chat.pathfinder.gov.bc.ca">Go to Rocket.Chat</ChevronLink>
    </LinkContainer>
  </Container>
);
