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
import Aux from '../../hoc/auxillary';
import * as actions from '../../store/actions/actions';
import { MAIN_NAV_CONFIG } from '../../constants/ui';
import { ARIA_LABEL_FILTER_SELECT } from '../../constants/strings';
import Hamburger from '../Common/Hamburger';

export class PrimaryNavigation extends React.Component {
  state = {
    selectedOption: null,
    toggled: false,
  };

  render() {
    const { filterSiphonNodes } = this.props;
    // convert into open objects the Select component understands
    // value is stringified because it is used in two select components
    // this is to prevent any odd pass by reference bugs from going on that
    // are beyond our control
    const navigationItems = MAIN_NAV_CONFIG.map(navConfig => ({
      value: JSON.stringify({
        filterBy: navConfig.SIPHON_PROP,
        value: navConfig.VALUE,
      }),
      label: navConfig.DISPLAY_NAME,
    }));

    const customStylesLarge = {
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
    const customStylesSmall = {
      ...customStylesLarge,
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
          value={this.state.selectedOption}
          ariaLabel={ARIA_LABEL_FILTER_SELECT}
          className={[styles.PrimaryNavigation, styles.largeOnly].join(' ')}
          styles={customStylesLarge}
          options={navigationItems}
          placeholder="Filter"
          onChange={selectedOption => {
            this.setState({ selectedOption: selectedOption });
            const option = JSON.parse(selectedOption.value);
            filterSiphonNodes(option.filterBy, option.value);
          }}
        />
        {/* mobile select */}
        <Hamburger
          className={styles.mobileOnly}
          clicked={() => this.setState({ toggled: !this.state.toggled })}
        />
        <Select
          value={this.state.selectedOption}
          ariaLabel={ARIA_LABEL_FILTER_SELECT}
          className={[styles.PrimaryNavigation, styles.mobileOnly].join(' ')}
          styles={customStylesSmall}
          options={navigationItems}
          placeholder=""
          menuIsOpen={this.state.toggled}
          onChange={selectedOption => {
            this.setState({ selectedOption: selectedOption, toggled: false });
            const option = JSON.parse(selectedOption.value);
            filterSiphonNodes(option.filterBy, option.value);
          }}
        />
      </Aux>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    filterSiphonNodes: (filterBy, value) => dispatch(actions.filterSiphonNodes(filterBy, value)),
  };
};

export default connect(null, mapDispatchToProps)(PrimaryNavigation);
