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
const crypto = require(`crypto`);
const _ = require('lodash');
const { getFilesFromRepo } = require('./utils/github-api');

const createGHNode = (file, id) => {
  return {
    id,
    children: [],
    fileName: file.name,
    fileType: file.metadata.fileType,
    name: file.metadata.name,
    owner: file.metadata.owner,
    parent: null,
    path: file.path,
    source: file.metadata.source,
    sourceName: file.metadata.name,
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
  };
};

const repoIsValid = repo => {
  return repo.name && repo.url && repo.repo && repo.owner;
};

const reposAreValid = repos => repos.every(repoIsValid);

const checkRegistry = registry => {
  if (!reposAreValid(registry.repos)) {
    throw new Error(
      'Error in Gatsby Source Github All: registry is not valid. One or more repos may be missing required parameters'
    );
  }
  return true;
};

const getRegistry = getNodes => {
  const registryFound = getNodes().filter(node => {
    return node.internal.type === 'SourceRegistryYaml';
  });
  if (registryFound.length > 0) {
    return registryFound[0];
  } else {
    throw new Error('Registry not found');
  }
};

const sourceNodes = async (
  { getNodes, boundActionCreators, createNodeId },
  { token }
) => {
  //get registry from current nodes
  const registry = getRegistry(getNodes);
  const { createNode } = boundActionCreators;
  try {
    // check registry prior to fetching data
    checkRegistry(registry);
    // fetch all repos
    const repos = await Promise.all(
      registry.repos.map(
        async repo =>
          await getFilesFromRepo(repo.repo, repo.owner, repo.name, token)
      )
    );
    // flatten dataToNodify
    const dataToNodify = _.flatten(repos, true);
    // create nodes
    return Promise.all(
      dataToNodify.map(file => {
        createNode(createGHNode(file, createNodeId(file.sha)));
      })
    );
  } catch (e) {
    // failed to retrieve files or some other type of failure
    console.error(e, e.type);
    return Promise.reject('Unable to build nodes from Github Source');
  }
};
module.exports = {
  getRegistry,
  checkRegistry,
  createGHNode,
  sourceNodes,
};
