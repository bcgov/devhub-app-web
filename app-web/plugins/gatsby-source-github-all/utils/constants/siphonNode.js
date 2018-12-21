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

const { SOURCE_TYPES } = require('./sourceTypes');

const UNFURL_TYPES = {
  MARKDOWN: 'markdown',
  EXTERNAL: 'external',
};
// source types that map to fetch routines
const COLLECTION_TYPES = {
  [SOURCE_TYPES.GITHUB]: 'source',
  CURATED: 'curated',
};

const RESOURCE_TYPES = {
  COMPONENTS: 'Components',
  DOCUMENTATION: 'Documentation',
  SELF_SERVICE_TOOLS: 'Self-Service Tools',
  RESPOSITORIES: 'Repositories',
  PEOPLE: 'People',
  PROJECTS: 'Projects',
};
// Resource Types for Devhub
const RESOURCE_TYPES_LIST = Object.values(RESOURCE_TYPES);

const PERSONAS = {
  DESIGNER: 'Designer',
  DEVELOPER: 'Developer',
  PRODUCT_OWNER: 'Product Owner',
};

const PERSONAS_LIST = Object.values(PERSONAS);

const GRAPHQL_NODE_TYPE = 'DevhubSiphon';

module.exports = {
  UNFURL_TYPES,
  COLLECTION_TYPES,
  RESOURCE_TYPES,
  RESOURCE_TYPES_LIST,
  PERSONAS,
  PERSONAS_LIST,
  GRAPHQL_NODE_TYPE,
};
