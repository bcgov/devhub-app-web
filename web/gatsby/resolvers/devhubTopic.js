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
const { nodeBelongsToTopic } = require('../utils/validators');
const { uniqWith, isEqual } = require('lodash');

const resolveDevhubTopicConnections = (source, args, context) => {
  // cache devhub topic connectsWith resolutions for speed purposes
  // resolvers seem to run at build time for every time there is a graphql query that calls for devhubTopic.connectsWith
  // and is a bit of an expensive process
  let _cache = {};

  if (!_cache[source.id]) {
    // get all github raw nodes and siphon source type web nodes and return them ordered by fields.position
    let webNodes = context.nodeModel
      .getAllNodes({
        type: 'DevhubSiphon',
      })
      .filter(n => {
        return n.source.type === 'web' && nodeBelongsToTopic(source.name, n);
      })
      .map(n => ({ fields: { ...n.fields }, id: n.id, path: n.resource.path }));

    let ghNodes = context.nodeModel.getAllNodes({
      type: 'GithubRaw',
    });

    // let eventbriteNodes = context.nodeModel.getAllNodes({
    //   type: 'EventbriteEvents',
    // });

    // let meetupNodes = context.nodeModel.getAllNodes({
    //   type: 'MeetupEvent',
    // });

    // siphon nodes produce multiples of the same type which we need to filter out
    webNodes = uniqWith(webNodes, isEqual);

    ghNodes = ghNodes
      .filter(n => nodeBelongsToTopic(source.name, n) && !n.fields.disabled)
      .map(n => ({
        fields: { ...n.fields },
        id: n.id,
        path: `/${source.fields.slug}/${n.fields.slug}`,
      }));

    const connectsWith = webNodes.concat(ghNodes).sort((a, b) => {
      return a.fields.position.toString().localeCompare(b.fields.position);
    });

    _cache[source.id] = connectsWith;
  }
  return _cache[source.id] || [];
};

module.exports = { resolveDevhubTopicConnections };
