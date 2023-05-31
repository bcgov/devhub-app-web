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
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { useKeycloak } from '@react-keycloak/web';
import styled from '@emotion/styled';
import { Alert } from 'reactstrap';
import { css } from '@emotion/react';
import { ChevronLink } from '../UI/Link';
import { SEARCH } from '../../constants/ui';
import { EMOTION_BOOTSTRAP_BREAKPOINTS, SPACING } from '../../constants/designTokens';
import Search from '../Search';
import AppLogo from '../UI/AppLogo/AppLogo';
import { SearchSources } from '../Search/SearchSources';

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
const dataSourceDisplayName = {
  rocketchat: 'Rocket.Chat',
  documize: 'Documize',
  github: 'Github Issues',
};

const compiledDataSourceNames = dataSources => {
  if (dataSources.length === 0) return null;

  if (dataSources.length === 1) return <span>{dataSourceDisplayName[dataSources[0]]}</span>;
  const dataSourcesCopy = [...dataSources].map(d => dataSourceDisplayName[d]);
  dataSourcesCopy[dataSourcesCopy.length - 1] = `or ${dataSourcesCopy[dataSourcesCopy.length - 1]}`;

  return <span>{dataSourcesCopy.join(', ')}</span>;
};

export const Masthead = ({ query, searchSourcesLoading, dataSources, location }) => {
  // eslint-disable-next-line no-unused-vars
  const { keycloak, initialized } = useKeycloak();
  const isAuthenticated = keycloak && keycloak.authenticated;
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
            navigate(`${location.pathname}?q=${encodeURIComponent(terms.trim())}`);
          }}
        />
        <IconDiv>{query && <SearchSources searchSourcesLoading={searchSourcesLoading} />}</IconDiv>
      </SearchContainer>
      {!isAuthenticated && !alertHasBeenAcknowledged && dataSources.length > 0 && (
        <AlertMessage
          color="warning"
          isOpen={query !== ''}
          toggle={() => onDismiss()}
          data-testid={TEST_IDS.alertBox}
        >
          You can view search results from services like {compiledDataSourceNames(dataSources)} when
          logged in.
        </AlertMessage>
      )}
    </Container>
  );
};

Masthead.propTypes = {
  query: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  resultCount: PropTypes.number,
  searchSourcesLoading: PropTypes.bool,
  location: PropTypes.shape({ pathname: PropTypes.string }),
};

export default Masthead;
