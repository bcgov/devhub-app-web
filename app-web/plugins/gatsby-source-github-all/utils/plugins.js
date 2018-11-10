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
const shortid = require('shortid'); // eslint-disable-line
const matter = require('gray-matter'); // eslint-disable-line
const visit = require('unist-util-visit'); // eslint-disable-line
const remark = require('remark'); // eslint-disable-line
const { TypeCheck } = require('@bcgov/common-web-utils'); // eslint-disable-line
const { createPathWithDigest } = require('./helpers'); // eslint-disable-line
const { MARKDOWN_FRONTMATTER_SCHEMA } = require('./constants');
/**
 * applys default front matter properties
 * @param {String} extension 
 * @param {Object} file 
 * @returns {Object} the modified file
 */
const markdownFrontmatterPlugin = (extension, file) => {
  // only modify markdown files
  if (extension === 'md') {
    // parse front matter
    const data = matter(file.content);
    const frontmatter = data.data;
    const DEFAULTS = {
      title: () => {
        // attempt to generate a title by finding the first h1 in markdown content
        // if none title should be fileName
        const ast = remark.parse(data.content);
        // make title file name by default
        let title = file.metadata.fileName;
        // visit heading
        visit(ast, 'heading', node => {
          // is node on first line and a h1 or h2?
          if (title === file.metadata.fileName && (node.depth === 1 || node.depth === 2)) {
            // accept headers up to 3rd line of markdown file
            if (node.position.start.line < 3) {
              title = node.children[0].value;
            }
          }
        });
        return title;
      },
      ignore: () => false, // ignore this node (when true) all together no page or other presentational components are created
      resourcePath: () => '', // when blank indicates this node is destined to create a page, the markdownPagePath plugin updates this
      pageOnly: () => false, // in the use case where we want this node to not be presented as a card in the home page
    };
    // check front matter against defaults
    Object.keys(MARKDOWN_FRONTMATTER_SCHEMA).forEach(key => {
      const property = MARKDOWN_FRONTMATTER_SCHEMA[key];
      const value = frontmatter[key];
      const valueIsInvalid = !value || !TypeCheck.isA(property.type, value) || value === '';
      // if propery required and frontmatter doesn't have it
      if (property.required && valueIsInvalid) {
        throw new Error(
          `Frontmatter key ${key} is required but ${file.metadata.fileName} is missing it`
        );
        // is there a defaultable value we can provide
      } else if (valueIsInvalid && DEFAULTS[key]) {
        frontmatter[key] = DEFAULTS[key]();
      }
    });
    // create 'new' md string with updated front matter
    file.content = matter.stringify(data.content, frontmatter);
    return file;
  }
  return file;
};

/**
 * assigns the metadata page path property
 * @param {String} extension
 * @param {Object} file
 * @returns {Object} the modified file
 */
const markdownPagePathPlugin = (extension, file) => {
  if (extension !== 'md') {
    return file;
  }
  // check front matter for a resourcePath
  const data = matter(file.content);
  const frontmatter = data.data;
  if (frontmatter.resourcePath) {
    file.metadata.resourcePath = frontmatter.resourcePath;
  } else {
    // no resource path, this file is destined to be turned into a page,
    // the page page is composed of the source name, the title of the file plus an id
    file.metadata.resourcePath = createPathWithDigest(
      file.metadata.source,
      file.metadata.source,
      file.metadata.name,
      file.html_url
    );
  }

  return file;
};

module.exports = {
  markdownFrontmatterPlugin,
  markdownPagePathPlugin,
};
