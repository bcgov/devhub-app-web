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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { SEARCH } from '../../constants/ui';
import FilterMenu from './FilterMenu/FilterMenu';
import Search from '../Search';
import styles from './ToolsMenu.module.css';

class ToolsMenu extends Component {
  componentWillUnmount() {
    // unset search bar terms
    this.props.setSearchBarTerms('');
  }

  render() {
    const { filters, setSearchBarTerms } = this.props;
    return (
      <div className={styles.ToolsMenu}>
        <FilterMenu filters={filters} />
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
    );
  }
}

ToolsMenu.propTypes = {
  filters: PropTypes.array.isRequired,
  searchCount: PropTypes.number,
  totalNodeCount: PropTypes.number.isRequired,
  setSearchBarTerms: PropTypes.func.isRequired,
  searchWordLength: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
};

export default ToolsMenu;
