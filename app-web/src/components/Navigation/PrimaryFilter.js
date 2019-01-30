/* eslint-disable jsx-a11y/anchor-is-valid */
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
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import styles from './PrimaryFilter.module.css';
import { MAIN_NAV_CONFIG } from '../../constants/ui';
import { ARIA_LABEL_FILTER_SELECT } from '../../constants/ariaLabels';

export const PrimaryFilter = ({
  selectedFilter,
  mobile,
  setOnSearch,
  resourceType,
  setResourceType,
}) => {
  const filters = MAIN_NAV_CONFIG.map(navConfig => {
    return (
      <li key={shortid.generate()}>
        <a
          aria-label={ARIA_LABEL_FILTER_SELECT}
          className={navConfig.VALUE === resourceType ? styles.ActiveFilter : ''}
          onClick={() => {
            setResourceType(navConfig.VALUE);
            navigate(`/?q=${encodeURIComponent(navConfig.ROUTE)}`);
          }}
        >
          {navConfig.DISPLAY_NAME}
        </a>
      </li>
    );
  });

  return (
    <nav className={styles.PrimaryFilter}>
      <ul className={mobile ? styles.mobileOnly : styles.largeOnly}>{filters}</ul>
    </nav>
  );
};

PrimaryFilter.propTypes = {
  mobile: PropTypes.bool,
};

PrimaryFilter.defaultProps = {
  mobile: false,
};

const mapStateToProps = state => ({
  resourceType: state.siphon.resourceType,
});

const mapDispatchToProps = dispatch => ({
  setResourceType: resourceType => dispatch(actions.setResourceType(resourceType)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrimaryFilter);
