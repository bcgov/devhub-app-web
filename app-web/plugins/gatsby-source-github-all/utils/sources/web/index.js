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
const { WEB_SOURCE_SCHEMA, MEDIATYPES } = require('../../constants');
const {
  validateSourcePropertiesAgainstSchema,
  unfurlWebURI,
  assignPositionToResource,
  mergeUnfurls,
  createUnfurlObj,
  withUnfurlWarning,
} = require('../../helpers');

/**
 * validates the source properties against the web source schema
 * @param {Object} source the registry source item
 * @returns {Boolean}
 */
const validateSourceWeb = source =>
  validateSourcePropertiesAgainstSchema(source, WEB_SOURCE_SCHEMA);

const extractUnfurlFromSourceProperties = sourceProperties =>
  createUnfurlObj('local', sourceProperties);
/**
 * fetches data from a web source
 * based on the configuration passed into the routine
 * @param {Object} source the source configuration (comes from the registry)
 * is deconstructed into its components
 * @returns {Object} the siphon object that is ready to be turned into a node
 */
const fetchSourceWeb = async ({
  sourceType,
  resourceType,
  name,
  sourceProperties,
  attributes,
  collection,
  metadata,
}) => {
  const { url } = sourceProperties;
  // fetch information from the url
  const source = { metadata: { ...metadata } };
  const localUnfurl = extractUnfurlFromSourceProperties(sourceProperties);
  const assignPosToResourceBySource = assignPositionToResource(source);
  try {
    const externalUnfurl = await unfurlWebURI(url);
    const unfurl = withUnfurlWarning(url, mergeUnfurls(localUnfurl, externalUnfurl));
    const siphonData = {
      metadata: {
        unfurl,
        resourceType,
        sourceType,
        name,
        ...attributes,
        collection,
        resourcePath: url,
        originalResourceLocation: url,
        fileName: null,
        fileType: null,
        owner: unfurl.author,
        mediaType: MEDIATYPES.HTML, // hmm not too sure what should be considered the best media type
        sourceProperties,
      },
      path: url,
    };

    return [siphonData].map((s, index) => assignPosToResourceBySource(s, index));
  } catch (e) {
    console.error(e);
    return [];
  }
};

module.exports = {
  validateSourceWeb,
  fetchSourceWeb,
  extractUnfurlFromSourceProperties,
};
