import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import Pill from '../UI/Pill';
import shortid from 'shortid';

const withCursorOnHover = css`
  > svg {
    cursor: pointer;
  }
`;

const ClearPill = styled(Pill)`
  ${withCursorOnHover};
  background-color: #fff;
  color: #1b64a0;
`;
const SearchPill = styled(Pill)`
  ${withCursorOnHover};
`;

const PillContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;
/**
 * Search Pills Component
 * @param {Object} props
 * @param {Func} props.onDelete
 * @param {Array} props.query array of search tokens ['token', 'token']
 */
export const SearchPills = ({ onDelete, query, showClear, onClear }) => {
  // if no query or if the query is a whitespace (when search is pressed without typing)
  if (query.length === 0 || (query.length === 1 && query[0] === '')) {
    return null;
  }
  let pills = [];
  if (isString(query)) {
    pills = [
      <SearchPill key={shortid.generate()} label={query} onDelete={onDelete} variant="filled" />,
    ];
  } else if (isArray(query)) {
    const queries = query;
    pills = queries.map(query => (
      <SearchPill key={shortid.generate()} label={query} onDelete={onDelete} variant="filled" />
    ));
  }

  const clearPill =
    showClear && query.length > 0 ? (
      <ClearPill
        key="clear-search"
        label="Clear"
        variant="outlined"
        deletable={false}
        onClick={onClear}
      />
    ) : (
      []
    );

  return <PillContainer>{pills.concat(clearPill)}</PillContainer>;
};

SearchPills.propTypes = {
  onDelete: PropTypes.func.isRequired,
  query: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  showClear: PropTypes.bool.isRequired,
  onClear: PropTypes.func,
};

SearchPills.defaultProps = {
  query: '',
  showClear: false,
};

export default SearchPills;
