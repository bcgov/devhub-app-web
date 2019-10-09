import React from 'react';
import styled from '@emotion/styled';
import { RCButton, GithubButton, DocumizeButton } from '../UI/Button/Button';
import { useAuthenticated } from '../../utils/hooks';
import { Link } from 'react-scroll';
import { SEARCH_SOURCE_CONTENT } from '../DynamicSearchResults';
import { SEARCH_SOURCES } from '../../constants/search';

const StyledLink = styled(Link)`
  margin: 0 5px;
`;

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

  const scrollOffset = -125;

  return (
    <SearchSourcesContainer data-testid={TEST_IDS.container}>
      {authenticated ? (
        <StyledLink to={SEARCH_SOURCE_CONTENT[SEARCH_SOURCES.rocketchat].id} offset={scrollOffset}>
          <RCButton title="Click to jump to rocket chat search results" />
        </StyledLink>
      ) : (
        <RCButton {...iconProps} title="Login to view rocket chat search results" />
      )}
      {authenticated ? (
        <StyledLink to={SEARCH_SOURCE_CONTENT[SEARCH_SOURCES.github].id} offset={scrollOffset}>
          <GithubButton title="Click to jump to Github search results" />
        </StyledLink>
      ) : (
        <GithubButton {...iconProps} title="Login to view Github search results" />
      )}
      {authenticated ? (
        <StyledLink to={SEARCH_SOURCE_CONTENT[SEARCH_SOURCES.documize].id} offset={scrollOffset}>
          <DocumizeButton title="Click to jump to Documize search results" />
        </StyledLink>
      ) : (
        <DocumizeButton {...iconProps} title="Login to view Documize search results" />
      )}
    </SearchSourcesContainer>
  );
};
