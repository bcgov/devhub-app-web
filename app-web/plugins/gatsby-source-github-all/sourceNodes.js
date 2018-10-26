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
const crypto = require('crypto');
const _ = require('lodash'); // eslint-disable-line
const shortid = require('shortid'); // eslint-disable-line
const { getFilesFromRepo } = require('./utils/github-api');
const { fileTransformer } = require('./utils/transformer');
const { markdownPlugin } = require('./utils/plugins');

const createGHNode = (file, id) => ({
  id,
  children: [],
  fileName: file.metadata.fileName,
  fileType: file.metadata.fileType,
  name: file.metadata.name,
  owner: file.metadata.owner,
  parent: null,
  path: file.path,
  htmlURL: file.html_url,
  source: file.metadata.source,
  sourceName: file.metadata.sourceName,
  pagePath: `/${file.metadata.source}/${file.metadata.name}_${shortid.generate()}`,
  internal: {
    contentDigest: crypto
      .createHash('md5')
      .update(JSON.stringify(file))
      .digest('hex'),
    // Optional media type (https://en.wikipedia.org/wiki/Media_type) to indicate
    // to transformer plugins this node has data they can further process.
    mediaType: file.metadata.mediaType,
    // A globally unique node type chosen by the plugin owner.
    type: 'SourceDevhubGithub',
    // Optional field exposing the raw content for this node
    // that transformer plugins can take and further process.
    content: file.content,
  },
});

const repoIsValid = repo => repo.name && repo.url && repo.repo && repo.owner;

const reposAreValid = repos => repos.every(repoIsValid);

const checkRegistry = registry => {
  if (!registry.repos || !reposAreValid(registry.repos)) {
    throw new Error(
      'Error in Gatsby Source Github All: registry is not valid. One or more repos may be missing required parameters'
    );
  }
  return true;
};

const getRegistry = getNodes => {
  const registryFound = getNodes().filter(node => node.internal.type === 'SourceRegistryYaml');
  if (registryFound.length > 0) {
    return registryFound[0];
  }

  throw new Error('Registry not found');
};

const sourceNodes = async ({ getNodes, boundActionCreators, createNodeId }, { token }) => {
  // get registry from current nodes
  const registry = getRegistry(getNodes);
  const { createNode } = boundActionCreators;
  try {
    // check registry prior to fetching data
    checkRegistry(registry);
    // fetch all repos
    const repos = await Promise.all(
      registry.repos.map(repo => getFilesFromRepo(repo.repo, repo.owner, repo.name, token))
    );
    // repos is an array of arrays [repo files, repo files] etc
    // so we flatten it into a 1 dimensional array
    const dataToNodify = _.flatten(repos, true);
    // create nodes
    dataToNodify
      .map(file => {
        const newFile = { ...file, metadata: { ...file.metadata } };
        const { content, metadata: { extension } } = newFile;
        const ft = fileTransformer(extension, content, newFile);
        const newContent = ft.use(markdownPlugin).resolve();
        newFile.content = newContent;
        return newFile;
      })
      .forEach(file => {
        createNode(createGHNode(file, createNodeId(file.sha)));
      });
  } catch (e) {
    // failed to retrieve files or some other type of failure
    // eslint-disable-next-line
    console.error(e);
    process.exit(1);
  }
};
module.exports = {
  getRegistry,
  checkRegistry,
  createGHNode,
  sourceNodes,
};
