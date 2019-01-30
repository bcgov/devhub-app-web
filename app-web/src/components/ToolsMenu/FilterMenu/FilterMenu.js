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
import Toggle from 'react-toggled';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './FilterMenu.module.css';

import SecondaryFilter from '../../SecondaryFilter/SecondaryFilter';

const FilterMenu = ({ filters }) => {
  return (
    <Toggle>
      {({ on, getTogglerProps }) => (
        <div className={styles.FilterMenu}>
          <button
            className="btn btn-link"
            {...getTogglerProps()}
            style={{ margin: '1px', fontSize: '1.2em', textDecoration: 'none', color: '#1a5a96' }}
          >
            Filters <FontAwesomeIcon icon={faFilter} />
          </button>
          {on ? <SecondaryFilter filters={filters} /> : null}
        </div>
      )}
    </Toggle>
  );
};

FilterMenu.propTypes = {
  filterGroups: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      filters: PropTypes.array.isRequired,
    }),
  ).isRequired,
};

export default FilterMenu;
