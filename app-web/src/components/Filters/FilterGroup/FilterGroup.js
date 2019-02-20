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
import { connect } from 'react-redux';
import { FormGroup, Label } from 'reactstrap';
import * as actions from '../../../store/actions/actions';
import { ARIA_LABEL_FILTER_RESOURCE } from '../../../constants/ariaLabels';
import styles from './FilterGroup.module.css';

import Checkbox from '../../UI/Input/Checkbox';

export const FilterGroup = ({ title, filters, addFilter, removeFilter }) => {
  return (
    <FormGroup className={styles.FormGroup}>
      <Label for={title} className={styles.Title}>
        {title}
      </Label>
      {filters.map((filter, ind) => {
        /* 
          a requirement for custom reactstrap inputs is that the id of the custom input is
          an incremenet of a top level labels
          for attribute 
        */
        return (
          <Checkbox
            id={title + ind}
            key={filter.key}
            aria-label={ARIA_LABEL_FILTER_RESOURCE}
            onChange={e => (filter.active ? removeFilter(filter.key) : addFilter(filter.key))}
            name={filter.filterBy}
            label={filter.text}
            checked={filter.active}
            disabled={!filter.isFilterable}
          />
        );
      })}
    </FormGroup>
  );
};

FilterGroup.propTypes = {
  title: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      filterBy: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    addFilter: key => dispatch(actions.addFilter(key)),
    removeFilter: key => dispatch(actions.removeFilter(key)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(FilterGroup);
