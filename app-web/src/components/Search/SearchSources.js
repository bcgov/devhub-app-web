import React from 'react';
import styled from '@emotion/styled';
import { RCButton } from '../UI/Button/Button';
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
      <a href="#rocketChat">
        {authenticated && <RCButton {...rcProps} title="toggle rocket chat search results" />}
      </a>
    </SearchSourcesContainer>
  );
};
