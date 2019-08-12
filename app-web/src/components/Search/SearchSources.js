import React from 'react'
import styled from '@emotion/styled';
import PropTypes from 'prop-types'
import { RCButton } from '../UI/Button/Button';
import { useAuthenticated } from '../../utils/hooks';
import { SEARCH_SOURCES } from '../../constants/search';

export const SearchSourcesContainer = styled.div`
  display: flex;
  padding: 6px;
  > * {
    flex-basis: 35px;
  }
`;

export const TEST_IDS = {
  container: 'search.sources.container'
}

export const SearchSources = ({rocketchat, toggleSource}) => {
  const { authenticated } = useAuthenticated();
  const rcProps = {};

  if(!rocketchat) {
    rcProps.style = {opacity: 0.65};
  }
  return (

      <SearchSourcesContainer data-testid={TEST_IDS.container}>
        {authenticated && <RCButton onClick={() => toggleSource(SEARCH_SOURCES.rocketchat)} {...rcProps} title="toggle rocket chat search results"/>}
      </SearchSourcesContainer>

  )
}