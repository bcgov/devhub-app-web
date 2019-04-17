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
import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';
import { ChevronLink } from '../UI/Link';
import { SEARCH, EMOTION_BOOTSTRAP_BREAKPOINTS } from '../../constants/ui';
import Search from '../Search';
import SearchPills from '../Search/SearchPills';
// localizations
import { HOME } from '../../messages';
import AppLogo from '../UI/AppLogo/AppLogo';
import css from '@emotion/css';

const SearchStyled = styled(Search)`
  font-size: 1.25em;
  flex-flow: row wrap;
  > button {
    flex-grow: 1;
  }
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
    padding: 50px 15px 55px;
  }
`;

export const Masthead = ({ query }) => (
  <Container>
    <AppLogo
      css={css`
        font-size: 1.5em;
        margin-bottom: 0.5em;
        ${EMOTION_BOOTSTRAP_BREAKPOINTS.sm} {
          font-size: 2em;
        }
      `}
    />
    <h4
      css={css`
        max-width: 525px;
      `}
    >
      One place that brings together resources to help build digital products for the BC Government
    </h4>

    <ChevronLink
      to="/about"
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
        inputConfig={SEARCH.INPUT}
        onSearch={terms => {
          navigate(`/?q=${encodeURIComponent(terms)}`);
        }}
      />
      {query && (
        <SearchPills
          query={query}
          onDelete={() => {
            // remove token from query list and rebuild navigation
            navigate(`/?q=`);
          }}
          showClear={false}
        />
      )}
    </SearchContainer>
  </Container>
);

Masthead.propTypes = {
  query: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
};

export default Masthead;
