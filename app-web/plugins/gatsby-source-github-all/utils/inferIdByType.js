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

const { SOURCE_TYPES } = require('./constants');
/**
 * based on a source type, it infers a unique id from the source type properties
 * @param {Object} source the source as found from the registry
 * @returns {String} the infered id
 */
const inferIdByType = ({ sourceType, sourceProperties }) => {
  if (sourceType === SOURCE_TYPES.WEB) {
    return sourceProperties.url;
  } else if (sourceType === SOURCE_TYPES.GITHUB) {
    return `${sourceProperties.repo}-${sourceProperties.file}`;
  }

  throw new Error(`Unable to infer a devhub id from type ${sourceType}`);
};

module.exports = { inferIdByType };
