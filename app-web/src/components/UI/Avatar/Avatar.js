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
import NameSpacedImage from '../NameSpacedImg/NameSpacedImg';
import Link from '../Link/Link';
import styles from './Avatar.module.css';
import { AVATAR_NAMESPACES } from '../../../constants/ui';
import { getGithubUsernameURL } from '../../../utils/helpers';

const Avatar = ({ src, size, ...rest }) => {
  // check if src is namespaced to github
  const namespacedSource = src.split(':');
  if (namespacedSource[0] === AVATAR_NAMESPACES.github && namespacedSource.length === 2) {
    return (
      <Link className={styles.Avatar} to={getGithubUsernameURL(namespacedSource[1])} {...rest}>
        <NameSpacedImage src={src} size={size} />
      </Link>
    );
  } else {
    return (
      <div className={styles.Avatar}>
        <NameSpacedImage src={src} size={size} />
      </div>
    );
  }
};

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  link: PropTypes.string,
  size: PropTypes.number.isRequired,
};

export default Avatar;
