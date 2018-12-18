import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';

export const CardFilterButton = ({ addFilter, filterKey, unsetFilters, children, ...rest }) => {
  const clicked = function() {
    unsetFilters();
    addFilter(filterKey);
  };

  return (
    <Button clicked={clicked} {...rest}>
      {children}
    </Button>
  );
};

CardFilterButton.propTypes = {
  addFilter: PropTypes.func.isRequired,
  unsetFilters: PropTypes.func.isRequired,
  children: PropTypes.string,
};

CardFilterButton.defaultProps = {
  children: '',
};

const mapDispatchToProps = dispatch => {
  return {
    unsetFilters: () => dispatch(actions.removeAllFilters()),
    addFilter: key => dispatch(actions.addFilter(key)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(CardFilterButton);
