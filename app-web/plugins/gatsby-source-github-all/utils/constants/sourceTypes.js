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

const { isString, isArray, every } = require('lodash');
const messages = require('../console');
const SOURCE_TYPES = {
  GITHUB: 'github',
  WEB: 'web',
};

/**
 * checks to see if source properties contains correct config for source type github
 * @param {Object} properties the source properties from the registry
 */
const hasFileOrFiles = properties => {
  if (properties.file) {
    return isString(properties.file);
  } else if (!!properties.files) {
    return isArray(properties.files) && every(properties.files, isString);
  }
  // eslint-disable-next-line no-console
  console.warn(messages.deprecatedGithubSourceValidation());
  return false;
};

const GITHUB_SOURCE_SCHEMA = {
  url: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  repo: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
    validate: hasFileOrFiles,
  },
  files: {
    type: Array,
    required: true,
    validate: hasFileOrFiles,
  },
  // branch to base fetch off of
  branch: {
    type: String,
    required: false,
  },
  // inline devhubignores
  ignores: {
    type: Array,
    required: false,
  },
};

const WEB_SOURCE_SCHEMA = {
  url: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  data1: {
    type: String,
    required: false,
  },
  label1: {
    type: String,
    required: false,
  },
  data2: {
    type: String,
    required: false,
  },
  label2: {
    type: String,
    required: false,
  },
};

module.exports = {
  SOURCE_TYPES,
  GITHUB_SOURCE_SCHEMA,
  WEB_SOURCE_SCHEMA,
};
