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
const { getFilesFromRepo } = require('./utils/github-api');

const createGHNode = (file, id) => {
  return {
    id,
    parent: String,
    // Reserved for plugins who wish to extend other nodes.
    fields: {
      slug: '',
    },
    internal: {
      contentDigest: String,
      // Optional media type (https://en.wikipedia.org/wiki/Media_type) to indicate
      // to transformer plugins this node has data they can further process.
      mediaType: String,
      // A globally unique node type chosen by the plugin owner.
      type: String,
      // The plugin which created this node.
      owner: String,
      // Stores which plugins created which fields.
      fieldOwners: Object,
      // Optional field exposing the raw content for this node
      // that transformer plugins can take and further process.
      content: String,
    },
  };
};

exports.sourceNodes = (utils, { token }) => {
  return new Promise(async (resolve, reject) => {
    // attempt to get github data
    let dataForNodifying = [];
    try {
      const data = await getFilesFromRepo('range-web', 'bcgov', token);
      // console.log(data);
      dataForNodifying = dataForNodifying.concat(data);
    } catch (e) {
      // failed to retrieve
    }
    // process dataForNodifying into nodes
  });
};
