import React from 'react';
import styled from '@emotion/styled';
import { RCButton, GithubButton, DocumizeButton } from '../UI/Button/Button';
import { useAuthenticated } from '../../utils/hooks';
import { Link } from 'react-scroll';
import { SEARCH_SOURCE_CONTENT } from '../DynamicSearchResults';
import { SEARCH_SOURCES } from '../../constants/search';
import PropTypes from 'prop-types';

const StyledLink = styled(Link)`
  margin: 0 5px;
`;

const StyledDiv = styled.div`
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

export const SearchSources = ({ searchSourcesLoading }) => {
  const { authenticated } = useAuthenticated();
  const iconProps = {};

  if (!authenticated || searchSourcesLoading) {
    iconProps.style = {
      opacity: 0.65,
      cursor: 'initial',

      boxSizing: 'content-box',
    };
  } else {
    iconProps.style = {};
  }

  const scrollOffset = -125;

  return (
    <SearchSourcesContainer data-testid={TEST_IDS.container}>
      {authenticated && !searchSourcesLoading ? (
        <StyledLink to={SEARCH_SOURCE_CONTENT[SEARCH_SOURCES.rocketchat].id} offset={scrollOffset}>
          <RCButton {...iconProps} title="Click to jump to rocket chat search results" />
        </StyledLink>
      ) : (
        <StyledDiv>
          <RCButton {...iconProps} title="Login or wait to view rocket chat search results" />
        </StyledDiv>
      )}
      {authenticated && !searchSourcesLoading ? (
        <StyledLink to={SEARCH_SOURCE_CONTENT[SEARCH_SOURCES.github].id} offset={scrollOffset}>
          <GithubButton {...iconProps} title="Click to jump to Github search results" />
        </StyledLink>
      ) : (
        <StyledDiv>
          <GithubButton {...iconProps} title="Login or wait to view Github search results" />
        </StyledDiv>
      )}
      {authenticated && !searchSourcesLoading ? (
        <StyledLink to={SEARCH_SOURCE_CONTENT[SEARCH_SOURCES.documize].id} offset={scrollOffset}>
          <DocumizeButton {...iconProps} title="Click to jump to Documize search results" />
        </StyledLink>
      ) : (
        <StyledDiv>
          <DocumizeButton {...iconProps} title="Login or wait to view Documize search results" />
        </StyledDiv>
      )}
    </SearchSourcesContainer>
  );
};
SearchSources.propTypes = {
  searchSourcesLoading: PropTypes.bool,
};
