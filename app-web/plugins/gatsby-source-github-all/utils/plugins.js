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

const matter = require('gray-matter'); // eslint-disable-line
const visit = require('unist-util-visit'); // eslint-disable-line
const remark = require('remark'); // eslint-disable-line
const { TypeCheck } = require('@bcgov/common-web-utils'); // eslint-disable-line
const { MARKDOWN_FRONTMATTER_SCHEMA, } = require('./constants');
/**
 * applys default front matter properties
 * @param {String} extension 
 * @param {String} content 
 * @param {Object} file 
 * @returns {String} the modified markdown content
 */
const markdownPlugin = (extension, raw, file) => {
  // only modify markdown files
  if (extension === 'md') {
    // parse front matter
    const data = matter(raw);
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
          if (
            title === file.metadata.fileName &&
            (node.depth === 1 || node.depth === 2)
          ) {
            if (node.position.start.line === 1) {
              title = node.children[0].value;
            }
          }
        });
        return title;
      },
    };
    // check front matter against defaults
    Object.keys(MARKDOWN_FRONTMATTER_SCHEMA).forEach(key => {
      const property = MARKDOWN_FRONTMATTER_SCHEMA[key];
      const value = frontmatter[key];
      const valueIsInvalid =
        !value || !TypeCheck.isString(value) || value === '';
      // if propery required and frontmatter doesn't have it
      if (property.required && valueIsInvalid) {
        throw new Error(
          `Frontmatter key ${key} is required but ${file.metadata
            .fileName} is missing it`
        );
        // is there a defaultable value we can provide
      } else if (valueIsInvalid && DEFAULTS[key]) {
        frontmatter[key] = DEFAULTS[key]();
      }
    });
    // create 'new' md string with updated front matter
    return matter.stringify(data.content, frontmatter);
  }
  return raw;
};

module.exports = {
  markdownPlugin,
};
