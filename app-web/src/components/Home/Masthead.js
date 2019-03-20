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
import Title from '../Page/Title';
import { SEARCH } from '../../constants/ui';
import Search from '../Search';
import SearchPills from '../Search/SearchPills';
// localizations
import { HOME } from '../../messages';

import styles from './Masthead.module.css';

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

export const Masthead = ({ query }) => (
  <header className={styles.Masthead}>
    <Title
      title={HOME.header.title.defaultMessage}
      subtitle={HOME.header.subtitle.defaultMessage}
    />
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
          onDelete={term => {
            // remove token from query list and rebuild navigation
            const newQuery = query.filter(token => token !== term);
            navigate(`/?q=${encodeURIComponent(newQuery.join(' '))}`);
          }}
          onClear={() => navigate('/?q=')}
        />
      )}
    </SearchContainer>
  </header>
);

Masthead.propTypes = {
  query: PropTypes.arrayOf(PropTypes.string),
};

export default Masthead;
