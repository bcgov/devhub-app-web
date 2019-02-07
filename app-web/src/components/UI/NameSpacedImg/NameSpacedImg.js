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
import queryString from 'query-string';

const NAMESPACES = {
  fa: 'fa',
  gh: 'gh',
};

export const getFontAwesomeIcon = src => {
  const validStyles = {
    regular: 'regular',
    solid: 'solid',
  };
  // is there a query param?
  const ind = src.indexOf('?');
  const fontStyle = 'far'; // regular weight
  if (ind > -1) {
    const query = queryString.parse(src.slice(ind));
    if (query.style && validStyles[query.style.toLowerCase()]) {
      // get font style from query param
    }
  }
};
/**
 * returns the ap
 */
const getNameSpacedComponent = {
  [NAMESPACES.fa]: (src, rest) => <i className={`far fa-${src}`} {...rest} aria-hidden="true" />,
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
    const splitSrc = src.split(':');
    const namespace = splitSrc[0];
    const imgSrc = splitSrc[1];
    return getNameSpacedComponent[namespace](imgSrc, rest);
  } else {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img src={src} {...rest} alt={alt} />;
  }
};

NameSpacedImg.defaultProps = {
  alt: '',
};

export default NameSpacedImg;
