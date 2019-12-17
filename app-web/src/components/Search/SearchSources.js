import React from 'react';
import styled from '@emotion/styled';
import { SearchSourcesButton } from '../UI/Button/Button';
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
  }
  const scrollOffset = -125;

  return Object.keys(SEARCH_SOURCES).map(element => (
    <SearchSourcesContainer key={element} data-testid={TEST_IDS.container}>
      {authenticated && !searchSourcesLoading ? (
        <StyledLink key={element} to={SEARCH_SOURCE_CONTENT[element].id} offset={scrollOffset}>
          <SearchSourcesButton
            searchType={element}
            title={'Click to jump to ' + element + ' search results'}
          ></SearchSourcesButton>
        </StyledLink>
      ) : (
        <StyledDiv>
          <SearchSourcesButton
            searchType={element}
            style={iconProps.style}
            title={'Login or wait to view ' + element + ' search results'}
          ></SearchSourcesButton>
        </StyledDiv>
      )}
    </SearchSourcesContainer>
  ));
};
SearchSources.propTypes = {
  searchSourcesLoading: PropTypes.bool,
};
