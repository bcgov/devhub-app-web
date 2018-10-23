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
// based on file type, we are possibly mutating the original
// file obj via plugins. This is important for things like markdown
// files. Front matter for md files cannot be trusted to be completed by
// users of the system and so we will provide default front matter properties
// via a plugin
const matter = require('gray-matter'); // eslint-disable-line
const { TypeCheck } = require('@bcgov/common-web-utils'); // eslint-disable-line
const visit = require('unist-util-visit'); // eslint-disable-line
const remark = require('remark'); // eslint-disable-line

/**
 * applys default front matter properties
 * @param {String} extension 
 * @param {String} content 
 * @param {Object} file 
 * @returns {String} the modified markdown content
 */
const markdownPlugin = (extension, raw, file) => {
    // only modify markdown files
    if(extension === 'md') {
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
                    if(title === file.metadata.fileName && (node.depth === 1 || node.depth === 2)) {
                        if( node.position.start.line === 1) {
                            title = node.children[0].value;
                        }
                    }
                });
                return title;
            },
        };
        // check front matter against defaults
        Object.keys(DEFAULTS).forEach(key => {
            // does front matter have a valid non string value
            // for key
            const value = frontmatter[key];
            if(!value || !TypeCheck.isString(value) || value === '') {
                // can we provide a default? 
                if(DEFAULTS[key]) {
                    frontmatter[key] = DEFAULTS[key]();
                }
            }
        });
        // create 'new' md string with updated front matter
        return matter.stringify(data.content, frontmatter);
    }
    return raw;
};

const fileTransformer = (fileExtension, content, file) => {
  return {
    content,
    use(plugin, options = {}) {
      if(!TypeCheck.isFunction(plugin)) {
        throw new Error('Plugin must be function');
      }
      const contentTransformed = plugin(fileExtension, this.content, file, options);
      if (contentTransformed === undefined) {
        throw new Error(`Plugin ${plugin.name} must return content`);
      }
      this.content = contentTransformed;
      return this;
    },
    resolve() {
        return this.content;
    },
  };
};

module.exports = {
  fileTransformer,
  markdownPlugin,
};
