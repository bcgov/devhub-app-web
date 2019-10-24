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
const { flatten } = require('lodash');
const resolveJourneyConnections = (source, args, context) => {
  // cache journey connectsWith resolutions for speed purposes
  // resolvers seem to run at build time for every time there is a graphql query that calls for devhubTopic.connectsWith
  // and is a bit of an expensive process
  let _cache = {};
  if (!_cache[source.id]) {
    const ghNodes = context.nodeModel.getAllNodes({ type: 'GithubRaw' });
    const siphonNodes = context.nodeModel.getAllNodes({ type: 'DevhubSiphon' });
    /**
     * Attempts to find a node that belongs to a journey
     * it also caches results in the _cache object to prevent additional lookups
     * @param {String} sourceType
     * @param {Object} args
     * returns the node or null
     */
    const findNode = (sourceType, args) => {
      if (sourceType === 'web') {
        if (!_cache[args.url]) {
          const url = args.url.toLowerCase();
          const node = siphonNodes.find(node => node.path.toLowerCase() === url);
          if (node) {
            _cache[args.url] = node;
          }
        }
        return _cache[args.url];
      } else if (sourceType === 'github') {
        const gitUrl = `https://github.com/${args.owner}/${args.repo}/blob/${
          args.branch ? args.branch : 'master'
        }/${args.file}`.toLowerCase();
        if (!_cache[gitUrl]) {
          const node = ghNodes.find(node => {
            return node.html_url.toLowerCase() === gitUrl;
          });

          if (node) {
            _cache[gitUrl] = node;
          }
        }
        return _cache[gitUrl];
      }

      return null;
    };

    /**
     * Factory for Stop Objects
     * @param {Object} fields
     * @param {String} path
     * @param {String} id
     * @param {String} type the original nodes internal.type
     */
    const Stop = (fields, path, id, type) => ({ fields, path, id, _type: type });

    const resolvePrimaryStops = (stop, basePath) => {
      const node = findNode(stop.sourceType, stop.sourceProperties);

      let resolvedStop = null;
      if (node.internal.type === 'GithubRaw') {
        resolvedStop = Stop(
          node.fields,
          `/${basePath}/${node.fields.slug}`,
          node.id,
          node.internal.type,
        );
      } else {
        resolvedStop = Stop(node.fields, node.path, node.id, node.internal.type);
      }

      return {
        ...resolvedStop,
        connectsWith:
          stop.stops && stop.stops.length > 0 && node.internal.type !== 'DevhubSiphon' // only real files are allowed to have connections
            ? flatten(
                stop.stops.map(nextStop =>
                  resolveSecondaryStop(nextStop, `${basePath}/${node.fields.slug}`),
                ),
              )
            : [],
      };
    };
    /**
     * recursively iterates over a journey stop and attempts to find a node if it exists
     * @param {Object} stop
     */
    const resolveSecondaryStop = (stop, basePath) => {
      // we technically should bar primary stops from being source type web since it leads to a bad ux ??
      let nodes = [];
      let resolvedStops = [];
      // find stop based on source type found in the registry config
      if (stop.sourceType === 'github' && stop.sourceProperties.files) {
        nodes = stop.sourceProperties.files.map(f =>
          findNode(stop.sourceType, { ...stop.sourceProperties, file: f }),
        );
      } else if (stop.sourceType === 'github' && stop.sourceProperties.files) {
        nodes = [findNode(stop.sourceType, stop.sourceProperties)];
      } else {
        // because github source types have 1-n files listed we need to make web source types
        // appear as an array as well
        nodes = [findNode(stop.sourceType, stop.sourceProperties)];
      }

      resolvedStops = nodes.map(node => {
        if (node.internal.type === 'GithubRaw') {
          return Stop(node.fields, `${basePath}/${node.fields.slug}`, node.id);
        } else {
          return Stop(node.fields, node.path, node.id);
        }
      });

      return resolvedStops;
    };

    _cache[source.id] = flatten(
      source.sourceProperties.stops.map(stop => resolvePrimaryStops(stop, source.fields.slug)),
    );
  }
  return _cache[source.id];
};

module.exports = {
  resolveJourneyConnections,
};
