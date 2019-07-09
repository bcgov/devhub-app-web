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

const cloneDeep = require('lodash/cloneDeep');
/**
 * takes in file parameters and runs it through plugins that
 * modifies its properties
 * @param {String} fileExtension
 * @param {Object} file
 * @returns {Object} the file transformed
 */
const fileTransformer = (fileExtension, originalFile) => {
  let file = cloneDeep(originalFile);
  const plugins = [];
  return {
    use(plugin, options = {}) {
      // using typeof check instaed of TypeCheck since async functions are nott
      // true instances of Function
      if (typeof plugin !== 'function') {
        throw new Error('Plugin must be function');
      }
      plugins.push([plugin, options]);
      return this;
    },
    async resolve() {
      for (const plugin of plugins) {
        file = await plugin[0](fileExtension, file, plugin[1]);
        if (file === undefined) {
          throw new Error('Plugin must return the file');
        }
      }
      return file;
    },
  };
};

module.exports = {
  fileTransformer,
};
