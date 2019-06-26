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
const { TypeCheck } = require('@bcgov/common-web-utils');
const { GRAPHQL_NODE_TYPE } = require('../../plugins/gatsby-source-github-all/utils/constants');
const { URL } = url;

/**
 * normalizes the file path by the following rules:
 * relative = no change
 * absolute = no change
 * not relative && no leading / = change to relative path
 * @param {String} path the file path
 * @returns {String} normalized path
 */
const normalizeFilePath = path => {
  const re = /^\w/;
  if (re.test(path)) {
    return `./${path}`;
  }

  return path;
};

/**
 * returns true/false if path is relative
 * @param {String} path the url/file path
 * @returns {Boolean} true if path is relative
 */
const isRelativePath = path => /^..?\//.test(path);

/**
 * returns the base path for a repository
 * @param {String} repo the repo name
 * @param {String} owner the owner/org
 * @param {String} branch the branch defaults to master
 */
const getGithubBasePath = (repo, owner, branch = 'master') => {
  branch = TypeCheck.isString(branch) ? branch : 'master';
  return `https://github.com/${owner}/${repo}/blob/${branch}/`;
};
/**
 * this is the converter callback used within
 * the gatsby-remark-transform-path plugin
 * see gatsby-config.js for details on its implementation
 * @param {String} astType 'as per plugin docs this will only ever be 'image', 'video' or 'link'
 * @param {String} path 'relative path of astNode
 * @param {Object} parentQLnode 'parent graphQLNode
 */
const converter = (astType, path, markdownNode, parentQLnode, { getNode }) => {
  // only convert source devhub nodes
  if (parentQLnode.internal.type === GRAPHQL_NODE_TYPE.SIPHON) {
    // get collection node
    const collection = getNode(parentQLnode.parent);
    const sourceLocations = new Map(collection._metadata.sourceLocations);
    // normalize the path so that any paths that have no leading slash are assumed to be relative
    const normalizedPath = normalizeFilePath(path);
    let absolutePath;
    // parse the originalSource node of the sourceDevhubGithub
    const urlObj = new URL(parentQLnode.resource.originalSource);

    if (isRelativePath(normalizedPath)) {
      absolutePath = url.resolve(urlObj.href, normalizedPath);
      // we need to check if relative path would match a github path based on the collection
      // source locations map
      const internalPagePath = sourceLocations.get(absolutePath);
      if (internalPagePath) {
        absolutePath = internalPagePath;
      }
    } else {
      // if its absolute we need to append path to the base of the github repository endpoint
      const { repo, owner, branch } = parentQLnode.source._properties;
      const baseGithubPath = getGithubBasePath(repo, owner, branch);
      // join the relative normalized path with github base uri
      absolutePath = url.resolve(baseGithubPath, normalizedPath);
    }
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
  // if not converting return path
  return path;
};

module.exports = {
  converter,
  isRelativePath,
  normalizeFilePath,
  getGithubBasePath,
};
