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

const NAMESPACES = {
  fa: 'fa',
  gh: 'gh',
};

export const srcIsNameSpaced = src => src.split(':').length === 2;

export const getFontAwesomeIcon = src => src;

const NameSpacedImg = ({ src, alt, ...rest }) => {
  if (srcIsNameSpaced(src)) {
    const splitSrc = src.split(':');
    const namespace = splitSrc[0];
    const imgSrc = splitSrc[1];
    return <button>blah</button>;
  } else {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img src={src} {...rest} alt={alt} />;
  }
};

NameSpacedImg.defaultProps = {
  alt: '',
};

export default NameSpacedImg;
