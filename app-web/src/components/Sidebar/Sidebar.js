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
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import styles from './Sidebar.module.css';
import SecondaryFilter from '../SecondaryFilter/SecondaryFilter';
import Search from '../Search/Search';

export const Sidebar = ({ filterGroups, terms, setSearchTerms, setSearchResults }) => (
  <div className={styles.Sidebar}>
    <Search
      searchOnEnter
      onSearch={terms => {
        // attempt to search lunr
        const lunrIndex = window.__LUNR__.en;
        const results = lunrIndex.index.search(terms);
        const searchResultsMap = results
          .map(({ ref }) => lunrIndex.store[ref])
          .reduce((obj, result) => {
            obj[result.id] = { ...result };
            return obj;
          }, {});
        setSearchResults(searchResultsMap);
      }}
    />
    <SecondaryFilter filterGroups={filterGroups} />
  </div>
);

Sidebar.propTypes = {
  filterGroups: PropTypes.array.isRequired,
  terms: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setSearchResults: results => dispatch(actions.setSearchResults(results)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Sidebar);
