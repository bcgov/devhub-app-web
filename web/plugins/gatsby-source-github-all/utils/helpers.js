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
const { TypeCheck } = require('@bcgov/common-web-utils'); // eslint-disable-line
const { isFunction } = require('lodash');
const path = require('path');
const crypto = require('crypto');
const url = require('url');
const chalk = require('chalk');
const shorthash = require('shorthash');
const stringSimilarity = require('string-similarity');
const scrape = require('html-metadata');
const validUrl = require('valid-url');
const { RESOURCE_TYPES_LIST, UNFURL_TYPES, SOURCE_TYPES } = require('./constants');
const siphonMessenger = require('./console');
const { fetchRepo } = require('./sources/github/api');
/**
 * returns an idempotent path based on a base path plus a digestable string that is hashed
 * @param {String} base the base path (which is not changed)
 * @param  {...String} digestables comma seperated list of strings which are dsigested by shorthash
 * @returns {String} ie (/mypath, file.md) => /mypath/123dsfakjhdf
 */
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

const withUnfurlWarning = (url, unfurl) => {
  // eslint-disable-next-line no-console
  if (!unfurl.title || !unfurl.description) console.log(siphonMessenger.unfurlLacksInfo(url));
  return unfurl;
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

const getClosest = (value, list) => {
  const matches = stringSimilarity.findBestMatch(value, list);
  // only return the best match if its greater than .5 in similarity
  return matches.bestMatch.rating >= 0.5 ? matches.bestMatch.target : '';
};

/**
 * returns the closest resourceType from the constant resourceTypes array based on the
 * uncontrolled resourceType (given to us by contributors)
 * @param {String} resourceType the resource type provided by a specific piece of content
 */
const getClosestResourceType = resourceType => {
  // if its blank don't bother checking closeness
  if (resourceType === '') return '';
  return getClosest(resourceType, RESOURCE_TYPES_LIST);
};

/**
 * returns the closest persona from the array of personas based on the
 * uncontrolled persona (given to us by contributors)
 * @param {Array} personas the personas provided by a specific piece of content
 * @param {Array} personas the valid personas list
 */
const getClosestPersona = (personaList, personas) => {
  // if its blank don't bother checking closeness
  if (personaList.length === 0) return [];

  return personaList.map(p => {
    return getClosest(p, personas);
  });
};

/**
 * returns a new absolute path based off of a relative position from the given absolute path
 * @param {String} relativePath eg '../../something/something.txt'
 * @param {String} absolutePath eg 'https://example.com/'
 * @param {Object} queryParams a key value pair set of query parameters
 */
const getAbsolutePathFromRelative = (relativePath, absolutePath, queryParams) => {
  const { URL } = url;
  const absPath = url.resolve(absolutePath, relativePath);

  const absPathObj = new URL(absPath);

  Object.keys(queryParams).forEach(key => {
    absPath.searchParams.set(key, queryParams[key]);
  });

  return absPathObj.toString();
};

/**
 * validates an object against a schema
 * schema is in format
 * {
 *  [object key name] : {
 *    type: [object constructor String | Array | Object etc],
 *    required: [Boolean]
 *  }
 * }
 * @param {Object} obj the object that is being tested
 * @param {Object} schema the schema object that is being tested against
 * @returns {Object} an object containing error messages and isValid property
 * {
 *   messages: {Array},
 *   isValid: {Boolean}
 * }
 */
const validateAgainstSchema = (obj, schema) => {
  const error = {
    messages: [],
  };

  Object.keys(schema).every(key => {
    const schemaItem = schema[key];
    let isValid = true;
    // is there a validator function
    if (isFunction(schemaItem.validate)) {
      isValid = schemaItem.validate(obj);
    } else if (schemaItem.required) {
      isValid =
        Object.prototype.hasOwnProperty.call(obj, key) && TypeCheck.isA(schemaItem.type, obj[key]);
      // does this source property have it anyways?
    } else if (Object.prototype.hasOwnProperty.call(obj, key)) {
      isValid = TypeCheck.isA(schemaItem.type, obj[key]);
    }

    if (!isValid) {
      error.messages.push(
        `Error Validating Source: failed on property ${key}, received value ${obj[key]}`,
      );
    }
    return isValid;
  });

  error.isValid = error.messages.length === 0;

  return error;
};

/**
 * verifies registry item against schema
 * @param {Object} registryItem the registry item
 * @param {Object} schema the schema to test against
 * @returns {Boolean}
 */
const validateRegistryItemAgainstSchema = (registryItem, schema) => {
  const error = validateAgainstSchema(registryItem, schema);
  if (!error.isValid) {
    // eslint-disable-next-line no-console
    console.error(
      chalk`{red.bold \nError Validating Registry item}`,
      '\n',
      error.messages.join('\n-'),
    );
  }

  return error.isValid;
};

/** validates a registry item's source Properties against a valid schema
 * @param {Object} source the registry source item properties
 * @param {Object} schema has shape { type: String | Boolean | Date etc, required: true/false}
 * @returns {Boolean}
 */
const validateSourcePropertiesAgainstSchema = (source, schema) => {
  const error = validateAgainstSchema(source.sourceProperties, schema);
  if (!error.isValid) {
    // eslint-disable-next-line no-console
    console.error(
      chalk`{red.bold \nError Validating Source type ${source.sourceType}}`,
      '\n',
      error.messages.join('\n-'),
    );
  }

  return error.isValid;
};

const unfurlWebURI = async uri => {
  // if is not valid uri throw
  if (!uri || !validUrl.isUri(uri)) {
    throw new Error('The uri is not valid');
  }
  let data;
  try {
    data = await scrape(uri);
  } catch (e) {
    if (e.message === 'No metadata found in page') {
      //this is the only case we want to handle and to continue without throwing
      data = {};
    } else {
      throw e;
    }
  }

  // metadata comes in with properties for each type of unfurl spec (twitter, openGraph etc)
  const combinedData = { ...data.general, ...data.twitter, ...data.openGraph };
  // update image to have resource path prepended to it if it is not https
  if (TypeCheck.isString(combinedData.image)) {
    combinedData.image = url.resolve(uri, combinedData.image);
  } else if (
    TypeCheck.isObject(combinedData.image) &&
    Object.prototype.hasOwnProperty.call(combinedData.image, 'url')
  ) {
    // sometimes the image property from opengraph or twitter card comes in from scrape as
    // .url property
    combinedData.image = combinedData.image.url;
  }
  return createUnfurlObj(UNFURL_TYPES.EXTERNAL, combinedData);
};

/**
 * merges unfurls from a configuration setting with ones that are externally sourced
 * the configuration one takes priority in the merge
 * @param {Object} configurationLevelUnfurl
 * @param {Object} externalUnfurl
 */
const mergeUnfurls = (configurationLevelUnfurl, externalUnfurl) => {
  const newUnfurl = {};
  Object.keys(configurationLevelUnfurl).forEach(key => {
    const value = configurationLevelUnfurl[key];
    if (value !== undefined) {
      newUnfurl[key] = value;
    } else {
      newUnfurl[key] = externalUnfurl[key];
    }
  });
  return newUnfurl;
};

/**
 * returns a md5 hash
 * @param {String} content the string to be hashed
 * @returns {String} the hash
 */
const hashString = content =>
  crypto
    .createHash('md5')
    .update(content)
    .digest('hex');

/**
 * returns true/false if source contains more sources
 * @param {Object} source
 * @returns {Boolean}
 */
const isSourceCollection = source =>
  Object.prototype.hasOwnProperty.call(source.sourceProperties, 'sources') &&
  TypeCheck.isArray(source.sourceProperties.sources);

/**
 * creates the main collection object
 * which is used later on to create the collection siphon node
 * optionally allows to bind props to it later
 * @param {Object} collection
 * @param {Object} props
 * @returns {Object} the new collection object
 */
const newCollection = (collection, props = {}) => ({ ...collection, ...props });

/** returns a description based on source type
 * for example, github would retrieve the repo description
 * @param {Object} source
 * @param {Object} tokens
 */
const getCollectionDescriptionBySourceType = async (source, tokens) => {
  switch (source.sourceType) {
    case SOURCE_TYPES.GITHUB:
      const { repo, owner } = source.sourceProperties;
      const repoData = await fetchRepo(repo, owner, tokens.GITHUB_API_TOKEN);
      return repoData.description;
    default:
      return '';
  }
};

/** Position helpers
 * position is based on a tier mechanism
 * collection is highest tier
 * sourc position is second highest
 * resource third etc.
 * position [2,3,500]
 * 2: collection position in registry
 * 3: source position within collection
 * 5: resource position within source (tbd by the fetchsource routine for that source type)
 */

/**
 * @param {Number} position the position
 * @param {Array} lastPosition the array of positions
 * @returns {Array} the new positions array
 */
const createPosition = (position, lastPosition = []) => lastPosition.concat([position]);

/**
 * this is the callback function for Array.map to assign positions to collections
 * in the order they were entered in the registry
 * @param {Object} collection
 * @param {Number} position
 * @returns {Object} the new collection object + position data
 */
const assignPositionToCollection = (collection, position) => ({
  ...collection,
  metadata: {
    position: createPosition(position),
  },
});

/**
 * this is a CLOSURED cb function that assigns position of source in an array.map
 * based on the position inside of the current collection
 * @param {Object} collection the collection
 * @returns {Function} the array map callback function
 */
const assignPositionToSource = collection => (source, position) => ({
  ...source,
  metadata: {
    position: createPosition(position, collection.metadata.position), // position at source level is [resource, source]
  },
});

/**
 * this is a CLOSURED cb function that assigns position of resource in an array.map
 * based on the position inside of the current source
 * @param {Object} source the collection
 * @returns {Function} the array map callback function
 */
const assignPositionToResource = source => (resource, position) => ({
  ...resource,
  metadata: {
    ...resource.metadata,
    position: createPosition(position, source.metadata.position),
  },
});

/**
 * creates a string that is usable in a natural sort
 * it padds numbers with zeros so that it will sort normally
 * ie [0, 0, 1], [0, 0, 10] => 0000.0000.0001 , 0000.0000.0010
 * @param {Array} pos the position array
 */
const convertPositionToSortableString = (maxPadding, pos) =>
  pos.reduce((acc, position, index) => {
    const posLength = maxPadding - (position + '').length;
    const paddedPosition = '0'.repeat(posLength) + position;
    return acc + paddedPosition + '.';
  }, '');

module.exports = {
  assignPositionToResource,
  createPosition,
  convertPositionToSortableString,
  assignPositionToSource,
  assignPositionToCollection,
  newCollection,
  hashString,
  createPathWithDigest,
  createUnfurlObj,
  mergeUnfurls,
  getClosest,
  getClosestResourceType,
  getClosestPersona,
  getAbsolutePathFromRelative,
  validateSourcePropertiesAgainstSchema,
  validateRegistryItemAgainstSchema,
  validateAgainstSchema,
  unfurlWebURI,
  isSourceCollection,
  getCollectionDescriptionBySourceType,
  withUnfurlWarning,
};
