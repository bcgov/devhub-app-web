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
import Image from 'react-image';
import Link from '../Link/Link';
import styles from './Avatar.module.css';

const Avatar = ({ image, link, width, height, ...rest }) => (
  <Link className={styles.Avatar} to={link} {...rest}>
    <Image src={image} width={width} height={height} />
  </Link>
);

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
  link: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Avatar;
