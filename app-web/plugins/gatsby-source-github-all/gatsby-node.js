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
const { getFilesFromRepo } = require('./utils/github-api');

const createGHNode = (file, id) => {
  return {
    id,
    name: file.name,
    path: file.path,
    source: file.metadata.source,
    owner: file.metadata.owner,
    children: [],
    fileType: file.metadata.fileType,
    parent: null,
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

const checkRegistry = registry => {
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

exports.sourceNodes = async (
  { getNodes, boundActionCreators, createNodeId },
  { token }
) => {
  //get registry from current nodes
  const registry = getRegistry(getNodes);
  const { createNode } = boundActionCreators;
  // attempt to get github data
  let dataForNodifying = [];
  try {
    // check registry prior to fetching data
    checkRegistry(registry);
    // get designSystem from registry
    // this will be replaced by a loop eventually
    const [designSystem] = registry.repos;
    // get design system files
    const data = await getFilesFromRepo(
      designSystem.repo,
      designSystem.owner,
      token,
    );
    
    dataForNodifying = dataForNodifying.concat(data);
    // create nodes
    return Promise.all(
      dataForNodifying.map(file =>
        createNode(createGHNode(file, createNodeId(file.name)))
      )
    );
  } catch (e) {
    // failed to retrieve
    console.error(e);
    return Promise.reject('Unable to build nodes from Github Source');
  }
};
