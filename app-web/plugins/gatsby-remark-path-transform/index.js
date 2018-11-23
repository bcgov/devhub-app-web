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
const cheerio = require('cheerio');
const { TypeCheck } = require('@bcgov/common-web-utils');
const { isRelativePath } = require('./utils/utils');

/**
 * sifts through ast (see https://www.huynguyen.io/2018-05-remark-gatsby-plugin-part-2/)
 * and converts relative paths to absolute paths for images and links via a converter cb
 * the converter cb receives (ast node type, relative url, parent graphql node)
 * @param {Object} remark 
 * @param {Object} options 
 */
const transformRelativePaths = ({ markdownAST, markdownNode, getNode }, { converter } = {}) => {
  const IMAGE = 'image';
  const LINK = 'link';

  if (!converter || !TypeCheck.isFunction(converter)) {
    throw new Error(
      "gatsby-remark-path-transform option: 'converter' must be passed in as a function!"
    );
  }

  /**
   * Closured call back to call on visit of a node
   * @param {String} nodeType 
   * @param {Object} parentQLNode 
   */
  const visitCB = (nodeType, parentQLNode) => node => {
    // is node url relative?
    if (isRelativePath(node.url)) {
      const absolutePath = converter(nodeType, node.url, parentQLNode);
      node.url = absolutePath; // eslint-disable-line
    }
  };

  const parentQLNode = getNode(markdownNode.parent);
  const imageVisitedCB = visitCB(IMAGE, parentQLNode);
  const linkVisitedCB = visitCB(LINK, parentQLNode);
  // visit any html nodes and ensure and check for stand alone img tags
  visit(markdownAST, 'html', node => {
    const $ = cheerio.load(node.value);
    const images = $('img');

    images.each((ind, elm) => {
      const src = $(elm).attr('src');

      if (isRelativePath(src)) {
        const absolutePath = converter(IMAGE, src, parentQLNode);
        $(elm).attr('src', absolutePath);
      }
    });

    node.value = $.html();
  });
  // visit link and img ast nodes
  visit(markdownAST, IMAGE, imageVisitedCB);

  visit(markdownAST, 'link', linkVisitedCB);
};

module.exports = transformRelativePaths;
