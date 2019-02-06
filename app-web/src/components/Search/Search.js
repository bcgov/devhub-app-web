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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ARIA_LABEL_SEARCH_BUTTON, ARIA_LABEL_SEARCH_INPUT } from '../../constants/ariaLabels';
import PropTypes from 'prop-types';
import styles from './Search.module.css';
import Button from '../UI/Button/Button';

export class Search extends Component {
  state = {
    touched: false,
    terms: '',
  };

  handleEnter = e => {
    if (e.key === 'Enter' && this.props.searchOnEnter) {
      this.search();
    }
  };

  handleKeyUp = e => {
    // if enter was pressed
    if (e.target.value.trim().length === 0 && this.state.touched) {
      this.props.onSearchClear();
    }
    this.setState({ terms: e.target.value });
  };

  search = terms => {
    this.setState({ terms: '' });
    this.props.onSearch(this.state.terms);
  };

  render() {
    const { inputConfig } = this.props;
    return (
      <div className={styles.Search}>
        <input
          type="text"
          aria-label={ARIA_LABEL_SEARCH_INPUT}
          {...inputConfig}
          value={this.state.terms}
          onChange={this.handleKeyUp}
          onKeyPress={this.handleEnter}
          onFocus={() => this.setState({ touched: true })}
        />
        <Button
          type="primary"
          aria-label={ARIA_LABEL_SEARCH_BUTTON}
          clicked={() => (this.state.terms.trim().length > 0 ? this.search() : null)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </div>
    );
  }
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onSearchClear: PropTypes.func,
  searchOnEnter: PropTypes.bool,
  inputConfig: PropTypes.object,
};

Search.defaultProps = {
  onSearchClear: () => undefined,
  searchOnEnter: false,
  inputConfig: {},
};

export default Search;
