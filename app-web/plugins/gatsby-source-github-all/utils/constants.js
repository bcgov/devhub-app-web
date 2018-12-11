//
// Dev Hub
//
// Copyright © 2018 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Created by Patrick Simonian on 2018-10-12.
//

const UNFURL_TYPES = {
  MARKDOWN: 'markdown',
  EXTERNAL: 'external',
};
// source types that map to fetch routines
const SOURCE_TYPES = {
  GITHUB: 'github',
};

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

const DEFUALT_IGNORES = [
  '/node_modules',
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'LICENSE',
  'CODE OF CONDUCT.md',
  '/openshift',
  '/.github',
];
// github rest api v3
const GITHUB_API_ENDPOINT = 'https://api.github.com';

const FILETYPES = {
  yml: 'YAML',
  yaml: 'YAML',
  json: 'JSON',
  md: 'Markdown',
  txt: 'text',
  html: 'HTML',
  HTML: 'HTML',
};

const MEDIATYPES = {
  md: 'text/markdown',
  json: 'application/json',
  yaml: 'text/yaml',
  yml: 'text/yaml',
  txt: 'text/html',
  html: 'text/html',
  HTML: 'text/html',
};

const PROCESSABLE_EXTENSIONS = ['.md', '.html'];

const MARKDOWN_FRONTMATTER_SCHEMA = {
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  resourcePath: {
    type: String,
    required: false,
  },
  ignore: {
    type: Boolean,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  label1: {
    type: String,
    required: false,
  },
  data1: {
    type: String,
    required: false,
  },
  label2: {
    type: String,
    required: false,
  },
  data2: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  pageOnly: {
    type: Boolean,
    required: false,
  },
  resourceType: {
    type: String,
    required: false,
  },
  persona: {
    type: String,
    required: false,
  },
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
};

module.exports = {
  GRAPHQL_NODE_TYPE,
  MARKDOWN_FRONTMATTER_SCHEMA,
  PROCESSABLE_EXTENSIONS,
  DEFUALT_IGNORES,
  GITHUB_API_ENDPOINT,
  GITHUB_SOURCE_SCHEMA,
  FILETYPES,
  MEDIATYPES,
  SOURCE_TYPES,
  RESOURCE_TYPES,
  RESOURCE_TYPES_LIST,
  UNFURL_TYPES,
  PERSONAS,
  PERSONAS_LIST,
  COLLECTION_TYPES,
};
