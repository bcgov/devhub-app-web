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

// this is the horizontal row of icons/badges

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Ribbon = ({ children, ...rest }) => (
  <ul className={styles.Ribbon} {...rest}>
    {children}
  </ul>
);

Ribbon.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Ribbon;
