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

// just a base schema validating root registration properties.
// nothing internal yet.
const REGISTRY_ITEM_SCHEMA = {
  name: {
    type: String,
    required: true,
  },
  sourceProperties: {
    type: Object,
    required: true,
  },
  slug: {
    type: String,
    required: false,
  },
  resourceType: {
    type: String,
    required: false,
  },
  attributes: {
    type: Object,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  template: {
    type: String,
    required: false,
  },
  templatePath: {
    type: String,
    required: false,
  },
};

// specific validation for the collection.sourceProperties.collectionSource property
const COLLECTION_SOURCE = {
  repo: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: false,
  },
};

module.exports = {
  REGISTRY_ITEM_SCHEMA,
  COLLECTION_SOURCE,
};
