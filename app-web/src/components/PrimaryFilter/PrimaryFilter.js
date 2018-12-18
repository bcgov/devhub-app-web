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
import styles from './PrimaryFilter.module.css';
import { connect } from 'react-redux';
import shortid from 'shortid';
import * as actions from '../../store/actions/actions';
import { MAIN_NAV_CONFIG } from '../../constants/ui';
import { ARIA_LABEL_FILTER_SELECT } from '../../constants/ariaLabels';

export const PrimaryFilter = ({
  applyPrimaryFilters,
  selectedFilter,
  setSelectedFilter,
  mobile,
  menuToggled,
  applySecondaryFilters,
}) => {
  const filters = MAIN_NAV_CONFIG.map(navConfig => {
    const activeClass = selectedFilter === navConfig.VALUE ? styles.ActiveFilter : '';
    return (
      <li
        key={shortid.generate()}
        className={activeClass}
        onClick={() => {
          setSelectedFilter(navConfig.VALUE);
          applyPrimaryFilters(navConfig.SIPHON_PROP, navConfig.VALUE);
          applySecondaryFilters();
        }}
        aria-label={ARIA_LABEL_FILTER_SELECT}
      >
        {navConfig.DISPLAY_NAME}
      </li>
    );
  });

  return (
    <div className={styles.PrimaryFilter}>
      <ul className={mobile ? styles.mobileOnly : styles.largeOnly}>{filters}</ul>
    </div>
  );
};

PrimaryFilter.propTypes = {
  mobile: PropTypes.bool.isRequired,
  selectedFilter: PropTypes.string,
  applyPrimaryFilter: PropTypes.func.isRequired,
  applySecondaryFilters: PropTypes.func.isRequired,
  setSelectedFilter: PropTypes.func.isRequired,
};

PrimaryFilter.defaultProps = {
  selectedFilter: '',
};

const mapStateToProps = state => ({
  selectedFilter: state.ui.selectedFilterOption,
});

const mapDispatchToProps = dispatch => {
  return {
    applyPrimaryFilters: (filterBy, value) => dispatch(actions.filterSiphonNodes(filterBy, value)),
    setSelectedFilter: value => dispatch(actions.setSelectedFilterOption(value)),
    applySecondaryFilters: () => dispatch(actions.filterSiphonNodesByFilterList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrimaryFilter);
