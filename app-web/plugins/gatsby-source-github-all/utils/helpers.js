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
const stringSimilarity = require('string-similarity');
const { RESOURCE_TYPES_LIST } = require('./constants');

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
const createUnfurlObj = (
  type,
  { label1, data1, label2, data2, description, title, image, author },
) => {
  if (!TypeCheck.isString(type)) {
    throw new Error('type must be a string!');
  }

  return {
    type,
    label1,
    data1,
    label2,
    data2,
    image,
    title,
    description,
    author,
  };
};

/**
 * returns the closest resourceType from the constant resourceTypes array based on the
 * uncontrolled resourceType (given to us by contributors)
 * @param {String} resourceType the resource type provided by a specific piece of content
 */
const getClosestResourceType = resourceType => {
  // if its blank don't bother checking closeness
  if (resourceType === '') return '';
  const matches = stringSimilarity.findBestMatch(resourceType, RESOURCE_TYPES_LIST);
  // only return the best match if its greater than .5 in similarity
  return matches.bestMatch.rating >= 0.5 ? matches.bestMatch.target : '';
};

/**
 * returns the closest persona from the array of personas based on the
 * uncontrolled persona (given to us by contributors)
 * @param {String} persona the persona provided by a specific piece of content
 * @param {Array} personas the valid personas list
 */
const getClosestPersona = (persona, personas) => {
  const RATING_THRESHOLD = 0.5; // rating is between 0 - 1, we only want a match if it's greater than half.
  // if its blank don't bother checking closeness
  if (persona === '') return '';
  const matches = stringSimilarity.findBestMatch(persona, personas);
  return matches.bestMatch.rating >= RATING_THRESHOLD ? matches.bestMatch.target : '';
};

module.exports = {
  createPathWithDigest,
  createUnfurlObj,
  getClosestResourceType,
  getClosestPersona,
};
