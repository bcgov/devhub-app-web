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
import Link from '../UI/Link/Link';
import PropTypes from 'prop-types';
import styles from './PrimaryFilter.module.css';
import shortid from 'shortid';
import { MAIN_NAV_CONFIG } from '../../constants/ui';
import { ARIA_LABEL_FILTER_SELECT } from '../../constants/ariaLabels';

export const PrimaryFilter = ({ selectedFilter, mobile }) => {
  const filters = MAIN_NAV_CONFIG.map(navConfig => {
    return (
      <li key={shortid.generate()}>
        <Link
          exact
          to={navConfig.ROUTE}
          aria-label={ARIA_LABEL_FILTER_SELECT}
          activeClassName={styles.ActiveFilter}
        >
          {navConfig.DISPLAY_NAME}
        </Link>
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

export default PrimaryFilter;
