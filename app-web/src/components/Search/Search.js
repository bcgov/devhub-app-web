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
import Button from '../UI/Button/Button';

export class Search extends Component {
  state = {
    touched: false,
  };

  shouldComponentUpdate(nextState, nextProps) {
    return nextProps.terms !== this.props.terms;
  }

  handleKeyUp = e => {
    // if enter was pressed
    if (e.target.value.trim().length === 0 && this.state.touched) {
      this.props.onSearchClear();
    } else if (e.keyCode === 13 && this.props.searchOnEnter) {
      this.props.onSearch(e.target.value);
    } else {
      this.props.onkeyup(e.target.value);
    }
  };

  render() {
    const { terms, onSearch } = this.props;
    return (
      <div>
        <input
          type="text"
          value={terms}
          onChange={this.handleKeyUp}
          onFocus={() => this.setState({ touched: true })}
        />
        <Button clicked={() => (terms.trim().length > 0 ? onSearch(terms) : null)}>Search</Button>
      </div>
    );
  }
}

Search.propTypes = {
  onkeyup: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSearchClear: PropTypes.func,
  terms: PropTypes.string.isRequired,
  searchOnEnter: PropTypes.bool,
};

Search.defaultProps = {
  onSearchClear: () => undefined,
  searchOnEnter: false,
};

export default Search;
