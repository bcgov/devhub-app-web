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
import { connect } from 'react-redux';
import { SEARCH } from '../../constants/ui';
import FilterMenu from './FilterMenu/FilterMenu';
import SearchFeedback from './SearchFeedback/SearchFeedback';
import Search from '../Search/Search';
import styles from './ToolsMenu.module.css';
import { setResourceType, setSearchBarTerms } from '../../store/actions/actions';

const ToolsMenu = ({
  filters,
  searchCount,
  totalNodeCount,
  searchWordLength,
  setResourceType,
  setSearchBarTerms,
}) => {
  console.log(searchCount);
  return (
    <div className={styles.ToolsMenu}>
      <FilterMenu filters={filters} />
      <Search
        searchOnEnter
        inputConfig={SEARCH.INPUT}
        onSearch={terms => {
          // set resource type to all since we are searching the entire index
          setResourceType('All');
          setSearchBarTerms(terms);
          navigate(`/?q=${encodeURIComponent(terms)}`);
        }}
      />
      <SearchFeedback
        searchCount={searchCount}
        totalNodeCount={totalNodeCount}
        searchWordLength={searchWordLength}
      />
    </div>
  );
};

ToolsMenu.propTypes = {
  filters: PropTypes.array.isRequired,
  searchCount: PropTypes.number.isRequired,
  totalNodeCount: PropTypes.number.isRequired,
};
const mapStateToProps = state => ({
  searchWordLength: state.siphon.searchBarTerms.length,
});

const mapDispatchToProps = dispatch => ({
  setResourceType: resourceType => dispatch(setResourceType(resourceType)),
  setSearchBarTerms: resourceType => dispatch(setSearchBarTerms(resourceType)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToolsMenu);
