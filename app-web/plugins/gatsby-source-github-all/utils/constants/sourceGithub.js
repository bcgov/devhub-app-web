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
const DEFUALT_IGNORES = [
  '/node_modules',
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'LICENSE',
  'CODE OF CONDUCT.md',
  '/openshift',
  '/.github',
  '.github',
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

const PROCESSABLE_EXTENSIONS = ['.md'];

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
  slug: {
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

module.exports = {
  DEFUALT_IGNORES,
  GITHUB_API_ENDPOINT,
  FILETYPES,
  MEDIATYPES,
  PROCESSABLE_EXTENSIONS,
  MARKDOWN_FRONTMATTER_SCHEMA,
};
