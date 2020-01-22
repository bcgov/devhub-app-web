/*
Copyright 2019 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';
import { Alert } from 'reactstrap';
import { css } from '@emotion/core';
import { ChevronLink } from '../UI/Link';
import { SEARCH } from '../../constants/ui';
import { EMOTION_BOOTSTRAP_BREAKPOINTS, SPACING } from '../../constants/designTokens';
import Search from '../Search';
import AppLogo from '../UI/AppLogo/AppLogo';
import { SearchSources } from '../Search/SearchSources';
import AuthContext from '../../AuthContext';
import AlgoliaBrand from '../UI/AlgoliaBrand';
import { ALGOLIA_INDEX_SUFFIX } from '../../constants/api';

const SearchStyled = styled(Search)`
  font-size: 1.25em;
  flex-flow: row wrap;
  > button {
    flex-grow: 1;
  }
`;

const AlertMessage = styled(Alert)`
  margin: 10px auto;
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 500px;
`;

const Container = styled.div`
  background-color: #fafafa;
  text-align: center;
  font-size: 16px;
  display: flex;
  align-items: center;
  padding: 25px 15px 30px;
  flex-flow: column nowrap;
  ${EMOTION_BOOTSTRAP_BREAKPOINTS.sm} {
    padding: ${SPACING['4x']} 15px;
  }
`;

const IconDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;
export const TEST_IDS = {
  alertBox: 'Masthead.show',
  algolia: 'Masthead.algolia',
};

export const Masthead = ({ query, searchSourcesLoading }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [alertHasBeenAcknowledged, setAlertHasBeenAcknowledged] = useState(false);

  const onDismiss = () => {
    setAlertHasBeenAcknowledged(true);
  };

  return (
    <Container>
      <AppLogo
        css={css`
          font-size: 1.5em;
          margin-bottom: 0.5em;
        `}
      />

      <h4
        css={css`
          max-width: 525px;
          line-height: 1.2em;
        `}
      >
        One place that brings together resources to help build digital products for the BC
        Government
      </h4>

      <ChevronLink
        to="/aboutDevhub"
        css={css`
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 1.5em;
        `}
      >
        How Devhub Works
      </ChevronLink>

      <SearchContainer>
        <SearchStyled
          searchOnEnter
          query={query}
          inputConfig={SEARCH.INPUT}
          onSearch={terms => {
            navigate(`/?q=${encodeURIComponent(terms)}`);
          }}
        />
        <IconDiv>{query && <SearchSources searchSourcesLoading={searchSourcesLoading} />}</IconDiv>
      </SearchContainer>
      {!isAuthenticated && !alertHasBeenAcknowledged && (
        <AlertMessage
          color="warning"
          isOpen={query !== ''}
          toggle={() => onDismiss()}
          data-testid={TEST_IDS.alertBox}
        >
          You can view search results from applications like Rocket.Chat, Github or Documize when
          logged in.
        </AlertMessage>
      )}
      <AlgoliaBrand
        data-testid={TEST_IDS.algolia}
        data-index={ALGOLIA_INDEX_SUFFIX}
        style={{ paddingBottom: '5px' }}
      />
    </Container>
  );
};

Masthead.propTypes = {
  query: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  resultCount: PropTypes.number,
  searchSourcesLoading: PropTypes.bool,
};

export default Masthead;
