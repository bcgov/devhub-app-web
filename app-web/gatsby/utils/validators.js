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

// node validators

const isGithubRaw = node => node.internal.type === 'GithubRaw';
const isMarkdownRemark = node => node.internal.type === 'MarkdownRemark';
const isDevhubSiphon = node => node.internal.type === 'DevhubSiphon';
const isDevhubCollection = node => node.internal.type === 'DevhubCollection';
const isEventbriteEvents = node => node.internal.type === 'EventbriteEvents';
const isRegistryJson = node => node.internal.type === 'RegistryJson';
const isMarkdownRemarkFrontmatter = node => node.internal.type === 'MarkdownRemarkFrontmatter';

module.exports = {
  isGithubRaw,
  isMarkdownRemark,
  isMarkdownRemarkFrontmatter,
  isDevhubSiphon,
  isDevhubCollection,
  isEventbriteEvents,
  isRegistryJson,
};
