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
import styles from './PrimaryFilter.module.css';
import { connect } from 'react-redux';
import Select from 'react-select';
import Aux from '../../hoc/auxillary';
import * as actions from '../../store/actions/actions';
import { MAIN_NAV_CONFIG } from '../../constants/ui';
import { ARIA_LABEL_FILTER_SELECT } from '../../constants/strings';
import Hamburger from '../Common/Hamburger';

export const PrimaryFilter = ({
  filterSiphonNodes,
  menuToggled,
  selectedOption,
  setSelectedOption,
  setMainNavigationToggled,
}) => {
  // mapping config to work with the <Select /> composition
  // value is stringified because it is used in two select components
  // this is to prevent any pass-by-reference bugs from happening within Select
  const navigationItems = MAIN_NAV_CONFIG.map(navConfig => ({
    value: JSON.stringify({
      filterBy: navConfig.SIPHON_PROP,
      value: navConfig.VALUE,
    }),
    label: navConfig.DISPLAY_NAME,
  }));

  const selectStylesLargeScreen = {
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
    control: (provided, state) => ({
      ...provided,
      width: 150,
    }),
  };
  // mobile select styles
  // hiding the dropdown menu and instead using a hamburger to activate it via state
  const selectStylesMobile = {
    ...selectStylesLargeScreen,
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid #ccc',
      color: state.isSelected ? '#036' : '#444',
      backgroundColor: '#fafafa',
    }),
    control: (provided, state) => ({
      display: 'none',
    }),
    menu: (provided, state) => {
      const width = 150;
      return {
        ...provided,
        width,
        transform: `translate(-${width}px, 18px)`,
      };
    },
  };

  return (
    <Aux>
      <Select
        value={selectedOption}
        ariaLabel={ARIA_LABEL_FILTER_SELECT}
        className={[styles.PrimaryFilter, styles.largeOnly].join(' ')}
        styles={selectStylesLargeScreen}
        options={navigationItems}
        placeholder="Filter"
        onChange={selectedOption => {
          setSelectedOption(selectedOption);
          const option = JSON.parse(selectedOption.value);
          filterSiphonNodes(option.filterBy, option.value);
        }}
        onMenuOpen={() => setMainNavigationToggled(true)}
        onMenuClose={() => setMainNavigationToggled(false)}
      />
      {/* mobile select */}
      <Hamburger
        className={styles.mobileOnly}
        clicked={() => setMainNavigationToggled(!menuToggled)}
      />
      <Select
        value={selectedOption}
        ariaLabel={ARIA_LABEL_FILTER_SELECT}
        className={[styles.PrimaryFilter, styles.mobileOnly].join(' ')}
        styles={selectStylesMobile}
        options={navigationItems}
        placeholder=""
        menuIsOpen={menuToggled}
        onChange={selectedOption => {
          setSelectedOption(selectedOption);
          setMainNavigationToggled(false);
          const option = JSON.parse(selectedOption.value);
          filterSiphonNodes(option.filterBy, option.value);
        }}
      />
    </Aux>
  );
};

const mapStateToProps = state => ({
  menuToggled: state.ui.mainNavigationToggled,
  selectedOption: state.ui.selectedFilterOption,
});

const mapDispatchToProps = dispatch => {
  return {
    filterSiphonNodes: (filterBy, value) => dispatch(actions.filterSiphonNodes(filterBy, value)),
    setMainNavigationToggled: toggled => dispatch(actions.toggleMainNavigation(toggled)),
    setSelectedOption: option => dispatch(actions.setSelectedFilterOption(option)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryFilter);
