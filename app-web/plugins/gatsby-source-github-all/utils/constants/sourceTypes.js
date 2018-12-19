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
const SOURCE_TYPES = {
  GITHUB: 'github',
  WEB: 'web',
};

const GITHUB_SOURCE_SCHEMA = {
  url: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  repo: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: false,
  },
  files: {
    type: Array,
    required: false,
  },
  // branch to base fetch off of
  branch: {
    type: String,
    required: false,
  },
  // inline devhubignores
  ignores: {
    type: Array,
    required: false,
  },
};

const WEB_SOURCE_SCHEMA = {
  url: {
    type: String,
    required: true,
  },
};

module.exports = {
  SOURCE_TYPES,
  GITHUB_SOURCE_SCHEMA,
  WEB_SOURCE_SCHEMA,
};
