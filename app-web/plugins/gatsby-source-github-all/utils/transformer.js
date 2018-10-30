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

const { TypeCheck } = require('@bcgov/common-web-utils'); // eslint-disable-line
/**
 * takes in file parameters and runs it through plugins that
 * modify the content
 * @param {String} fileExtension 
 * @param {String} content 
 * @param {Object} file 
 * @returns {String} file content transformed
 */
const fileTransformer = (fileExtension, content, file) => ({
  content,
  use(plugin, options = {}) {
    if (!TypeCheck.isFunction(plugin)) {
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
});

module.exports = {
  fileTransformer,
};
