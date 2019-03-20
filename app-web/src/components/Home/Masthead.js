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
import Title from '../Page/Title';
import { SEARCH } from '../../constants/ui';
import Search from '../Search/Search';
// localizations
import { HOME } from '../../messages';

import styles from './Masthead.module.css';

export const Masthead = ({ setSearchBarTerms }) => (
  <header className={styles.Masthead}>
    <Title
      title={HOME.header.title.defaultMessage}
      subtitle={HOME.header.subtitle.defaultMessage}
    />
    <div className={styles.SearchContainer}>
      <Search
        searchOnEnter
        inputConfig={SEARCH.INPUT}
        onSearch={terms => {
          // set resource type to all since we are searching the entire index
          setSearchBarTerms(terms);
          navigate(`/?q=${encodeURIComponent(terms)}`);
        }}
      />
    </div>
  </header>
);

Masthead.propTypes = {
  setSearchBarTerms: PropTypes.func.isRequired,
};

export default Masthead;
