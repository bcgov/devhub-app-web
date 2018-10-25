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

const visit = require('unist-util-visit');
const { TypeCheck } = require('@bcgov/common-web-utils');
const { isRelativePath } = require('./utils/utils');

/**
 * sifts through ast (see https://www.huynguyen.io/2018-05-remark-gatsby-plugin-part-2/)
 * and converts relative paths to absolute paths for images and links via a converter cb
 * the converter cb receives (ast node type, relative url, parent graphql node)
 * @param {Object} remark 
 * @param {Object} options 
 */
const transformRelativePaths = (
  { markdownAST, markdownNode, getNode },
  { converter } = {}
) => {
  if (!converter || !TypeCheck.isFunction(converter)) {
    throw new Error(
      "gatsby-remark-path-transform option: 'converter' must be passed in as a function!"
    );
  }
  const parentQLNode = getNode(markdownNode.parent);
  // visit anchor tags and images
  visit(markdownAST, 'image', node => {
    // is node url relative?
    if (isRelativePath(node.url)) {
      const absolutePath = converter('image', node.url, parentQLNode);
      node.url = absolutePath; // eslint-disable-line
    }
  });

  visit(markdownAST, 'link', node => {
    // is node url relative?
    if (isRelativePath(node.url)) {
      const absolutePath = converter('link', node.url, parentQLNode);
      node.url = absolutePath; // eslint-disable-line
    }
  });
};

module.exports = transformRelativePaths;
