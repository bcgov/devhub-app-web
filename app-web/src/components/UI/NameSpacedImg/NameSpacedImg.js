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
import Avatar from 'react-avatar';
import UriAvatar from '../../../hoc/avatarUri';
import { AVATAR_NAMESPACES } from '../../../constants/ui';

/**
 * creates a uri which is used by the react avatar component to fetch a source type
 * @param {String} namespace the name spaced passed in to us
 * @param {String} src
 */
const getAvatarURI = (namespace, src) => `${namespace}://${src}`;

/**
 * returns the appropriate namespaced component
 * @param {String} namespace
 * @param {String} src
 * @param {Object} props
 * @returns {Component} A react component
 */
const getNameSpacedComponent = (namespace, src, props) => {
  let component = null;
  switch (namespace) {
    case AVATAR_NAMESPACES.fontawesome:
      // clean out any icons that reference fa-something
      // this would be the case if someone copy/pasted from the font awesome website
      const icon = src.replace('fa-', '');
      component = <i className={`fas fa-${icon}`} {...props} aria-hidden="true" />;
      break;
    default:
      component = <UriAvatar uri={getAvatarURI(namespace, src)} {...props} />;
  }
  return component;
};
/**
 * returns true if the src string passed in is a supported namespace
 * @param {String} src
 * @returns {Boolean}
 */
export const srcIsNameSpaced = src => {
  const split = src.split(':');
  // this check prevents things like a uri such as https://... being
  // split and verified as a valid namespace
  return split.length === 2 && AVATAR_NAMESPACES[split[0]];
};

const NameSpacedImg = ({ src, alt, allowNameFallback, ...rest }) => {
  if (srcIsNameSpaced(src)) {
    const splitSrc = src.split(':');
    const namespace = splitSrc[0];
    const imgSrc = splitSrc[1];
    return getNameSpacedComponent(namespace, imgSrc, rest);
  } else if (/\.svg/.test(src) || src.indexOf('data:image') === 0) {
    // is it an svg?
    return <img src={src} {...rest} alt={alt} />;
  } else if (/^https?/.test(src) || /\.(png|jpg|gif|jpeg)/.test(src)) {
    // is it just a regular image?
    return <Avatar src={src} {...rest} alt={alt} />;
  } else if (allowNameFallback) {
    // is it just a name?
    // ie src = 'Billy Bob', this will render an image with the initials BB
    return <Avatar name={src} {...rest} alt={src} />;
  }
  return null;
};

NameSpacedImg.defaultProps = {
  alt: '',
  allowNameFallback: false,
};

NameSpacedImg.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  allowNameFallback: PropTypes.bool,
};

export default NameSpacedImg;
