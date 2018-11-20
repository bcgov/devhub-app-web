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
import styles from './PrimaryNavigation.module.css';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../../store/actions/actions';
import { MAIN_NAV_CONFIG } from '../../constants/ui';

export const PrimaryNavigation = ({ filterSiphonNodes }) => {
  const navigationItems = MAIN_NAV_CONFIG.map(navConfig => ({
    value: {
      filterBy: navConfig.SIPHON_PROP,
      value: navConfig.VALUE,
    },
    label: navConfig.DISPLAY_NAME,
  }));

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid #ccc',
      color: state.isSelected ? '#036' : '#444',
      backgroundColor: state.isFocused ? '#ccc' : '#fafafa',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

  return (
    <Select
      className={styles.PrimaryNavigation}
      styles={customStyles}
      options={navigationItems}
      placeholder="Filter"
      onChange={selectedOption =>
        filterSiphonNodes(selectedOption.value.filterBy, selectedOption.value.value)}
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    filterSiphonNodes: (filterBy, value) => dispatch(actions.filterSiphonNodes(filterBy, value)),
  };
};

export default connect(null, mapDispatchToProps)(PrimaryNavigation);
