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
const { hashString, convertPositionToSortableString } = require('./helpers');
const { GRAPHQL_NODE_TYPE } = require('./constants');

/**
 * creates the object that is passed into the gatsby create node function
 * to create a siphon collection node type
 * @param {Object} collection the collection object
 * @param {String} id the unique id
 */
const createCollectionNode = (collection, id, collectionContent = null) => {
  const { name, type, description, metadata } = collection;

  const internalContent = collectionContent
    ? {
        content: collectionContent.content,
        mediaType: collectionContent.metadata.mediaType,
      }
    : {};
  return {
    id,
    children: [],
    parent: null,
    name,
    type,
    description: description || '',
    internal: {
      ...internalContent,
      contentDigest: hashString(JSON.stringify(collection)),
      type: GRAPHQL_NODE_TYPE.COLLECTION,
    },
    _metadata: {
      position: convertPositionToSortableString(10, metadata.position),
      template: collection.template,
      templateFile: collection.templateFile,
      slug: collection.slug,
      sourceLocations: collection.sourceLocations,
    },
  };
};

/**
 * creates a object that is passed to the gatsby create node function
 * many of these properties are assigned by convention
 * @param {Object} data the siphon node data
 * @param {String} id the unique id
 * @param {String} collectionId the collection id that owns this resource
 */
const createSiphonNode = (data, id, collectionId) => ({
  id,
  children: [],
  fileName: data.metadata.fileName,
  fileType: data.metadata.fileType,
  devhubId: data.metadata.id,
  name: data.metadata.name,
  owner: data.metadata.owner,
  parent: collectionId,
  path: data.path,
  unfurl: data.metadata.unfurl, // normalized unfurled content from various sources https://medium.com/slack-developer-blog/everything-you-ever-wanted-to-know-about-unfurling-but-were-afraid-to-ask-or-how-to-make-your-e64b4bb9254
  collection: {
    name: data.metadata.collection.name, // name of the collection
    type: data.metadata.collection.type,
  },
  source: {
    name: data.metadata.source, // the source-name
    displayName: data.metadata.sourceName, // the pretty name of the 'source'
    sourcePath: data.metadata.sourceURL, // the path to the source
    type: data.metadata.sourceType, // the type of the source
    _properties: data.metadata.sourceProperties, // the source properties mapped to the node from the registry
  },
  resource: {
    path: data.metadata.resourcePath, // either path to a gastby created page based on this node
    type: data.metadata.resourceType, // the base resource type for this see utils/constants.js
    originalSource: data.metadata.originalResourceLocation, // the original location of the resource
  },
  attributes: {
    labels: data.metadata.labels, // labels from source registry
    personas: data.metadata.personas, // persona from the source registry, see constants for valid personas
  },
  internal: {
    contentDigest: hashString(JSON.stringify(data)),
    // Optional media type (https://en.wikipedia.org/wiki/Media_type) to indicate
    // to transformer plugins this node has data they can further process.
    mediaType: data.metadata.mediaType,
    // A globally unique node type chosen by the plugin owner.
    type: GRAPHQL_NODE_TYPE.SIPHON,
    // Optional field exposing the raw content for this node
    // that transformer plugins can take and further process.
    content: data.content,
  },
  _metadata: {
    position: convertPositionToSortableString(10, data.metadata.position),
  },
});

module.exports = {
  createSiphonNode,
  createCollectionNode,
};
