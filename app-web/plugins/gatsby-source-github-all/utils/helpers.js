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
/**
 * returns an idempotent path based on a base path plus a digestable string that is hashed
 * @param {String} base the base path (which is not changed)
 * @param  {...String} digestables comma seperated list of strings which are dsigested by shorthash 
 * @returns {String} ie (/mypath, file.md) => /mypath/123dsfakjhdf
 */
const { TypeCheck } = require('@bcgov/common-web-utils'); // eslint-disable-line
const path = require('path');
const shorthash = require('shorthash');

const createPathWithDigest = (base, ...digestables) => {
  if (!TypeCheck.isString(base)) {
    throw new Error('base must be a string');
  }
  if (!digestables.every(TypeCheck.isString)) {
    throw new Error('digestable must be a string');
  }

  const normalizedBase = base.replace(/^\//, '').replace(/\/$/, '');
  const digested = shorthash.unique(digestables.join(''));

  return path.join('/', normalizedBase, digested);
};

/**
 * Creates Standardized Unfurl meta data
 * @param {String} type 
 * @param {Object} unfurledData
 */
const createUnfurlObj = (type, { label1, data1, label2, data2, description, title, image }) => {
  return {
    type,
    label1,
    data1,
    label2,
    data2,
    image,
    title,
    description,
  };
};

module.exports = {
  createPathWithDigest,
  createUnfurlObj,
};
