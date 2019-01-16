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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/fontawesome-free-brands';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.css';

const Header = ({ title, originalSource, fileName, sourcePath, repo }) => (
  <header className={styles.Header}>
    <h1>{title}</h1>
    <ul className={styles.SourceTags}>
      <li>
        <a href={originalSource}>
          <FontAwesomeIcon
            icon={faGithub}
            aria-label={`View the original source ${fileName} on github`}
          />
        </a>
      </li>
      <li>
        <a href={`${sourcePath}/fork`}>
          <FontAwesomeIcon icon={faCodeBranch} aria-label={`Fork ${repo} on github`} />
        </a>
      </li>
    </ul>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
  originalSource: PropTypes.string.isRequired,
  sourcePath: PropTypes.string.isRequired,
};

export default Header;
