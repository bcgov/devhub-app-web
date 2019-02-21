/*
Copyright 2019 Province of British Columbia

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
import { CustomInput } from 'reactstrap';
import styles from './input.module.css';
/* design system custom checkbox
    usage:
      <Formgroup>
        <Label for=[FOR]>foo</Label>
        <Checkbox id=[FOR1] {...} />
        <Checkbox id=[FOR2] {...} />
        <Checkbox id=[FOR3] {...} />
      </Formgroup>
    please note the 'for' attribute in the label, all id's passed to checkbox must be an increment
    of that value
*/
const Checkbox = ({ id, label, name, checked, ...rest }) => (
  <CustomInput
    type="checkbox"
    id={id}
    label={label}
    checked={checked}
    className={styles.Checkbox}
    {...rest}
  />
);

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  checked: false,
};

export default Checkbox;
