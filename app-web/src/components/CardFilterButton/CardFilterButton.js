/*
Copyright 2018 Province of British Columbia

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
import { scroller } from 'react-scroll';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import { REACT_SCROLL } from '../../constants/ui';
export const CardFilterButton = ({
  scrollToTarget,
  addFilter,
  filterKey,
  unsetFilters,
  children,
  ...rest
}) => {
  // resets all filters, adds the selected filter and scrolls down to the target container
  const clicked = function() {
    unsetFilters();
    addFilter(filterKey);
    // scroll to the cards container
    scroller.scrollTo(scrollToTarget, {
      ...REACT_SCROLL.CONFIG,
      offset: -120,
    });
  };

  return (
    <Button clicked={clicked} {...rest} style={{ margin: '.7em' }}>
      {children}
    </Button>
  );
};

CardFilterButton.propTypes = {
  addFilter: PropTypes.func.isRequired,
  unsetFilters: PropTypes.func.isRequired,
  children: PropTypes.string,
  scrollToTarget: PropTypes.string,
};

CardFilterButton.defaultProps = {
  children: '',
  scrollToTarget: '',
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
