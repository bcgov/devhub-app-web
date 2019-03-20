import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Pill from '../UI/Pill';
import styled from '@emotion/styled';

const ClearPill = styled(Pill)`
  background-color: #fff;
  color: #1b64a0;
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
  const pills = query.map(token => (
    <Pill key={shortid.generate()} label={token} onDelete={onDelete} variant="filled" />
  ));

  const clearPill =
    showClear && query.length > 0 ? (
      []
    ) : (
      <ClearPill
        key="clear-search"
        label="Clear"
        variant="outlined"
        deletable={false}
        onClick={onClear}
      />
    );

  return <PillContainer>{pills.concat(clearPill)}</PillContainer>;
};

SearchPills.propTypes = {
  onDelete: PropTypes.func.isRequired,
  query: PropTypes.arrayOf(PropTypes.string),
  showClear: PropTypes.bool.isRequired,
  onClear: PropTypes.func,
};

SearchPills.defaultProps = {
  query: [],
  showClear: false,
};

export default SearchPills;
