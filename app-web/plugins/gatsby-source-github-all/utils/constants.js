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

const DEFUALT_IGNORES = [
  'node_modules',
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'LICENSE',
  'CODE OF CONDUCT.md',
  'openshift',
];
// github rest api v3
const GITHUB_API_ENDPOINT = 'https://api.github.com';
const FILETYPES = {
  yml: 'YAML',
  yaml: 'YAML',
  json: 'JSON',
  md: 'Markdown',
  txt: 'text',
};

const MEDIATYPES = {
  md: 'text/markdown',
  json: 'application/json',
  yaml: 'text/yaml',
  txt: 'text/html',
  html: 'text/html',
};

const PROCESSABLE_EXTENSIONS = ['.md', '.yml', '.yaml'];

module.exports = {
  DEFUALT_IGNORES,
  GITHUB_API_ENDPOINT,
  FILETYPES,
  MEDIATYPES,
  PROCESSABLE_EXTENSIONS,
};
