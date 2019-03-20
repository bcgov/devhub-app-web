import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Pill from '../UI/Pill';

/**
 * Search Pills Component
 * @param {Object} props
 * @param {Func} props.onDelete
 * @param {Array} props.query array of search tokens ['token', 'token']
 */
export const SearchPills = ({ onDelete, query }) => {
  if (query.length === 1 && query[0] === '') {
    return null;
  }
  return query.map(token => (
    <Pill key={shortid.generate()} label={token} onDelete={onDelete} variant="filled" />
  ));
};

SearchPills.propTypes = {
  onDelete: PropTypes.func.isRequired,
  query: PropTypes.arrayOf(PropTypes.string),
};

SearchPills.defaultProps = {
  query: [],
};

export default SearchPills;
