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
import styles from './SecondaryFilter.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import FilterGroup from './FilterGroup/FilterGroup';
import shortid from 'shortid';
import Toggle from 'react-toggled';

const SecondaryFilter = ({ filterGroups, mobile }) => {
  const filterGroupsComponent = (
    <div className={styles.SecondaryFilter}>
      {filterGroups.map(fg => (
        <FilterGroup {...fg} key={shortid.generate()} />
      ))}
    </div>
  );

  // if mobile we provide a toggling mechanism
  if (mobile) {
    return (
      <Toggle>
        {({ on, getTogglerProps }) => (
          <div className={styles.MobileSecondaryFilterContainer}>
            <button
              className="btn btn-link"
              {...getTogglerProps()}
              style={{ margin: '1px', fontSize: '1.2em', textDecoration: 'none', color: '#1a5a96' }}
            >
              Filters <FontAwesomeIcon icon={faFilter} />
            </button>
            {on ? filterGroupsComponent : null}
          </div>
        )}
      </Toggle>
    );
  } else {
    return filterGroupsComponent;
  }
};

SecondaryFilter.propTypes = {
  filterGroups: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      filters: PropTypes.array.isRequired,
    }),
  ).isRequired,
  mobile: PropTypes.bool,
};

SecondaryFilter.defaultProps = {
  mobile: false,
};

export default SecondaryFilter;
