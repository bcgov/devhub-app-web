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
// design system custom text input
const Input = ({ id, type, label, name, checked, ...rest }) => (
  <CustomInput
    type={type}
    id={id}
    label={label}
    checked={checked}
    className={styles.Input}
    {...rest}
  />
);

Input.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'date', 'email', 'tel', 'number', 'password']),
};

Input.defaultProps = {
  label: null,
  type: 'text',
};

export default Input;
