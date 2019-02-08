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
import Avatar from '@pahtaro/react-avatar';

// our supported namespace
const NAMESPACES = {
  fontawesome: 'fontawesome',
  github: 'github',
};

/**
 * creates a uri which is used by the react avatar component to fetch a source type
 * @param {String} namespace the name spaced passed in to us
 * @param {String} src
 */
const getAvatarURI = (namespace, src) => `${namespace}://${src}`;

/**
 * returns the appropriate namespaced component
 */
const getNameSpacedComponent = {
  // we only support solid font awesome iconds
  [NAMESPACES.fontawesome]: (src, rest) => (
    <i className={`fas fa-${src}`} {...rest} aria-hidden="true" />
  ),
  [NAMESPACES.github]: (src, rest) => (
    <Avatar uri={getAvatarURI(NAMESPACES.github, src)} {...rest} />
  ),
};
/**
 * returns true if the src stirng passed in is a supported namespace
 * @param {String} src
 * @returns {Boolean}
 */
export const srcIsNameSpaced = src => {
  const split = src.split(':');
  // this check prevents things like a uri such as https://... being
  // split and verified as a valid namespace
  return split.length === 2 && NAMESPACES[split[0]];
};

const NameSpacedImg = ({ src, alt, ...rest }) => {
  if (srcIsNameSpaced(src)) {
    console.log('namespaced?');
    const splitSrc = src.split(':');
    const namespace = splitSrc[0];
    const imgSrc = splitSrc[1];
    return getNameSpacedComponent[namespace](imgSrc, rest);
    // is it just a regular image?
  } else if (/^https?/.test(src) || /\.(png|svg|jpg|gif|jpeg)$/.test(src)) {
    return <Avatar src={src} {...rest} alt={alt} />;
  } else {
    // is it just a name?
    return <Avatar name={src} {...rest} alt={src} />;
  }
};

NameSpacedImg.defaultProps = {
  alt: '',
};

NameSpacedImg.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default NameSpacedImg;
