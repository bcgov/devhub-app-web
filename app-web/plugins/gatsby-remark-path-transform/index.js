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
const validURL = require('valid-url');
const { TypeCheck } = require('@bcgov/common-web-utils');
const { IMAGE, LINK } = require('./utils/constants');

/**
 * sifts through ast (see https://www.huynguyen.io/2018-05-remark-gatsby-plugin-part-2/)
 * and converts relative paths to absolute paths for images and links via a converter cb
 * the converter cb receives (ast node type, relative url, parent graphql node, getNode (to get nodes further up the tree if needed))
 * @param {Object} remark
 * @param {Object} options
 */
const transformRelativePaths = ({ markdownAST, markdownNode, getNode }, { converter } = {}) => {
  if (!converter || !TypeCheck.isFunction(converter)) {
    throw new Error(
      "gatsby-remark-path-transform option: 'converter' must be passed in as a function!",
    );
  }

  /**
   * Closured call back to call that returns the url transformed by the
   * converter cb or the url on its own if it isn't relative
   * @param {String} nodeType
   * @param {Object} parentQLNode
   */
  const visitCB = (nodeType, parentQLNode) => url => {
    // if its an actual valid link or an anchor don't transform
    if (validURL.isWebUri(url) || url.indexOf('#') === 0) {
      return url;
    }
    const absolutePath = converter(nodeType, url, parentQLNode, getNode);
    return absolutePath; // eslint-disable-line
  };

  const parentQLNode = getNode(markdownNode.parent);
  const imageVisitedCB = visitCB(IMAGE, parentQLNode);
  const linkVisitedCB = visitCB(LINK, parentQLNode);

  // visit any html nodes and ensure and check for stand alone image tags
  visit(markdownAST, 'html', node => {
    const $ = cheerio.load(node.value);
    const images = $('img');

    images.each((ind, elm) => {
      const src = $(elm).attr('src');
      $(elm).attr('src', imageVisitedCB(src));
    });

    node.value = $.html();
  });

  // visit link and img ast nodes
  visit(markdownAST, IMAGE, node => {
    node.url = imageVisitedCB(node.url);
  });

  visit(markdownAST, LINK, node => {
    node.url = linkVisitedCB(node.url);
  });
  // return null;
};

module.exports = transformRelativePaths;
