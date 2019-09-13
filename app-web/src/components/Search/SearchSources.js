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

export const SearchSources = () => {
  const { authenticated } = useAuthenticated();
  const iconProps = {};

  if (!authenticated) {
    iconProps.style = {
      opacity: 0.65,
      margin: '0 2px',
      cursor: 'initial',
      padding: '0 4px',
      boxSizing: 'content-box',
    };
  }

  return (
    <SearchSourcesContainer data-testid={TEST_IDS.container}>
      {authenticated ? (
        <Link to={'#rocketChat'}>
          <RCButton title="Click to jump to rocket chat search results" />
        </Link>
      ) : (
        <RCButton {...iconProps} title="Login to view rocket chat search results" />
      )}
      {authenticated ? (
        <Link to={'#github'}>
          <GithubButton title="Click to jump to Github search results" />
        </Link>
      ) : (
        <GithubButton {...iconProps} title="Login to view Github search results" />
      )}
    </SearchSourcesContainer>
  );
};
