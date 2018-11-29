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
// wrapper for all card type components
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components/Cards/Card/Card.module.css';

const Card = ({ children, resourceType }) => (
  <article className={styles.Card}>
    {children}
    <div className={styles.ResourceType}>
      <p>{resourceType}</p>
    </div>
  </article>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  resourceType: PropTypes.string.isRequired,
};

export default Card;
