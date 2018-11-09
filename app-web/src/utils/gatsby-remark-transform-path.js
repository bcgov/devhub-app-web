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
const url = require('url');
const { GRAPHQL_NODE_TYPE } = require('../../plugins/gatsby-source-github-all/utils/constants');

const { URL } = url;
/**
 * this is the converter callback used within
 * the gatsby-remark-transform-path plugin
 * see gatsby-config.js for details on its implementation
 * @param {String} astType 'as per plugin docs this will only ever be 'image' or 'link'
 * @param {String} relativePath 'relative path of astNode
 * @param {Object} parentQLnode 'parent graphQLNode
 */
const converter = (astType, relativePath, parentQLnode) => {
  // only convert source devhub nodes
  if (parentQLnode.internal.type === GRAPHQL_NODE_TYPE) {
    // parse the originalSource node of the sourceDevhubGithub
    const urlObj = new URL(parentQLnode.originalSource);
    // check if it has a protocol
    // join the relative path with the directory of the absolute source
    let absolutePath = url.resolve(urlObj.href, relativePath);
    if (astType === 'image') {
      // if the ast type is image we need to add the ?raw=true paramater
      // because the github absolute source is actually only the path to
      // where the source image is presented and not to the actual image itself
      const absPathObj = new URL(absolutePath);
      absPathObj.searchParams.set('raw', true);
      absolutePath = absPathObj.toString();
    }
    return absolutePath;
  }
  // if not converting return relativePath
  return relativePath;
};

module.exports = converter;
