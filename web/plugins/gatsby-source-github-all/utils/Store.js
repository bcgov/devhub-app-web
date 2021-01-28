/*
Copyright 2019 Province of British Columbia

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

// creates a simple store of key value pairs with the ability to check for conflicts
// prior to setting by chaining the .checkConflict(name) method
/**
 * @param { Object } options
 * {
 *   throwOnConflict: {Boolean}
 *   conflictCb: {Function}
 * }
 */
class Store extends Map {
  constructor(mapData = [], options) {
    super(mapData);
    this.options = { ...this.defaultOptions, ...options };
  }

  get defaultOptions() {
    return {
      throwOnConflict: false,
      conflictCb: name => `The name ${name} already exists in the store`,
    };
  }

  checkConflict(name) {
    const nameExists = this.get(name) !== undefined;
    const { throwOnConflict, conflictCb } = this.options;
    const warning = conflictCb(name);
    // if there is a conflict in the store
    if (nameExists && throwOnConflict) {
      throw new Error(warning);
    } else if (nameExists) {
      console.warn(warning);
    }
    return this;
  }
}

module.exports = Store;
