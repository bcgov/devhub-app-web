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
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '../UI/Link';
import styles from './ResourcePreview.module.css';
// this is a wrapper component that encapsulates cards for collections or other sizes
const ResourcePreview = ({ title, link, children }) => (
  <section className={styles.ResourcePreview}>
    <h2 className={styles.Title}>{title}</h2>
    {children}
    <div className={styles.LinkContainer}>
      <Link to={link.to} className={styles.Link}>
        {link.text} <FontAwesomeIcon icon={faChevronRight} />
      </Link>
    </div>
  </section>
);

ResourcePreview.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.shape({
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }),
  children: PropTypes.node.isRequired,
};

export default ResourcePreview;
