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
import { SEARCH } from '../../messages';
import { ARIA_LABEL_SEARCH_BUTTON, ARIA_LABEL_SEARCH_INPUT } from '../../constants/ariaLabels';
import PropTypes from 'prop-types';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import styles from './Search.module.css';

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
    const terms = e.target.value;
    if (terms === 0 && this.state.touched) {
      this.props.onSearchClear();
    }
    if (e.key !== 'Enter') {
      this.setState({ terms });
    }
  };

  search = () => {
    this.props.onSearch(this.state.terms);
    this.setState({ terms: '' });
  };

  render() {
    const { inputConfig, css } = this.props;
    return (
      <div className={styles.Search} css={css}>
        <Input
          type="text"
          aria-label={ARIA_LABEL_SEARCH_INPUT}
          value={this.state.terms}
          onChange={this.handleKeyUp}
          onKeyPress={this.handleEnter}
          onFocus={() => this.setState({ touched: true })}
          {...inputConfig}
        />
        <Button type="primary" aria-label={ARIA_LABEL_SEARCH_BUTTON} clicked={() => this.search()}>
          {SEARCH.button.defaultMessage}
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
