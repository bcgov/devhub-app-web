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
import styled from '@emotion/styled';
import { SEARCH } from '../../messages';
import { ARIA_LABEL_SEARCH_BUTTON, ARIA_LABEL_SEARCH_INPUT } from '../../constants/ariaLabels';
import PropTypes from 'prop-types';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const Container = styled.div`
  display: flex;
  align-items: center;
  > input {
    margin: 0 4px;
    padding: 4px 5px;
    flex-basis: 250px;
    flex-grow: 1;
    transition: all 0.25s;
  }
  > button {
    padding: 4px 15px;
    margin: 4px;
  }
`;

export const TEST_IDS = {
  input: 'searchbar-input',
  button: 'searchbar-button',
};

export const Search = ({ onSearch, searchOnEnter, inputConfig, query, ...rest }) => {
  const [terms, setTerms] = useState('');

  const search = () => {
    onSearch(terms);
    setTerms('');
  };

  return (
    <Container {...rest}>
      <Input
        data-testid={TEST_IDS.input}
        type="text"
        query={query}
        aria-label={ARIA_LABEL_SEARCH_INPUT}
        value={terms}
        onChange={e => {
          // if enter was pressed
          const terms = e.target.value;
          if (e.key !== 'Enter') {
            setTerms(terms);
          }
        }}
        onKeyPress={e => {
          if (e.key === 'Enter' && searchOnEnter) {
            search();
          }
        }}
        {...inputConfig}
      />
      <Button
        variant="primary"
        aria-label={ARIA_LABEL_SEARCH_BUTTON}
        clicked={search}
        data-testid={TEST_IDS.button}
      >
        {SEARCH.button.defaultMessage}
      </Button>
    </Container>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchOnEnter: PropTypes.bool,
  inputConfig: PropTypes.object,
  query: PropTypes.string,
};

Search.defaultProps = {
  searchOnEnter: false,
  inputConfig: {},
  query: '',
};

export default Search;
