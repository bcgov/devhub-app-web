import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { useKeycloak } from '@react-keycloak/web';
import { SearchSourcesButton } from '../UI/Button/Button';
import { Link } from 'react-scroll';
import { SEARCH_SOURCE_CONTENT } from '../DynamicSearchResults';
import { SEARCH_SOURCES } from '../../constants/search';
import PropTypes from 'prop-types';
import { AppConfig } from '../../context/AppConfig';

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
  const [keycloak] = useKeycloak();
  const isAuthenticated = keycloak && keycloak.authenticated;
  const iconProps = {};
  const { features } = useContext(AppConfig);

  if (!isAuthenticated || searchSourcesLoading) {
    iconProps.style = {
      opacity: 0.65,
      cursor: 'initial',
      boxSizing: 'content-box',
    };
  }
  const scrollOffset = -125;

  return Object.keys(SEARCH_SOURCES).map(searchSource => {
    if (features.dynamicSearch[searchSource]) {
      return (
        <SearchSourcesContainer key={searchSource} data-testid={TEST_IDS.container}>
          {isAuthenticated && !searchSourcesLoading ? (
            <StyledLink
              key={searchSource}
              to={SEARCH_SOURCE_CONTENT[searchSource].id}
              offset={scrollOffset}
            >
              <SearchSourcesButton
                searchType={searchSource}
                title={'Click to jump to ' + searchSource + ' search results'}
              ></SearchSourcesButton>
            </StyledLink>
          ) : (
            <StyledDiv>
              <SearchSourcesButton
                searchType={searchSource}
                style={iconProps.style}
                title={'Login in to view search results from ' + searchSource}
              ></SearchSourcesButton>
            </StyledDiv>
          )}
        </SearchSourcesContainer>
      );
    }
    return null;
  });
};
SearchSources.propTypes = {
  searchSourcesLoading: PropTypes.bool,
};
