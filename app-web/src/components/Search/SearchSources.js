import React from 'react';
import styled from '@emotion/styled';
import { RCButton, GithubButton } from '../UI/Button/Button';
import { useAuthenticated } from '../../utils/hooks';
import { Link } from '../UI/Link';

export const SearchSourcesContainer = styled.div`
  display: flex;
  padding: 6px;
  > * {
    flex-basis: 35px;
  }
`;

export const TEST_IDS = {
  container: 'search.sources.container',
};

export const SearchSources = ({ rocketchat }) => {
  const { authenticated } = useAuthenticated();
  const rcProps = {};

  if (!rocketchat) {
    rcProps.style = { opacity: 0.65 };
  }
  return (
    <SearchSourcesContainer data-testid={TEST_IDS.container}>
      <Link to={'#rocketChat'}>
        {authenticated ? (
          <RCButton title="Click to jump to rocket chat search results" />
        ) : (
          <RCButton {...rcProps} title="Login to view rocket chat search results" />
        )}
      </Link>
      <Link to={'#github'}>
        {authenticated ? (
          <GithubButton title="Click to jump to Github search results" />
        ) : (
          <GithubButton {...rcProps} title="Login to view Github search results" />
        )}
      </Link>
    </SearchSourcesContainer>
  );
};
