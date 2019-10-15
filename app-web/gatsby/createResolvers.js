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
// Created by Derek Siemens
//

// gatsby event hooks
// https://www.gatsbyjs.org/docs/node-apis/

const { uniqBy, flatten } = require('lodash');
const { nodeBelongsToTopic } = require('./utils/validators');

const getOrganizationsById = id => {
  const organizations = {
    '228490647317': {
      id: '228490647317',
      name: 'CSI Lab',
      first_name: 'CSI',
      last_name: 'Lab',
      is_public: false,
      image_id: '53267936',
    },
  };
  return organizations[id];
};

module.exports = ({ createResolvers }) => {
  // cache devhub topic connectsWith resolutions for speed purposes
  // resolvers seem to run at build time for every time there is a graphql query that calls for devhubTopic.connectsWith
  // and is a bit of an expensive process
  const _cache = {};
  const resolvers = {
    JourneyRegistryJson: {
      connectsWith: {
        type: '[ConnectedStopNode]',
        resolve: (source, args, context) => {
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
             */
            const Stop = (fields, path, id) => ({ fields, path, id });

            const resolvePrimaryStops = (stop, basePath) => {
              const node = findNode(stop.sourceType, stop.sourceProperties);

              let resolvedStop = null;
              if (node.internal.type === 'GithubRaw') {
                resolvedStop = Stop(node.fields, `${basePath}/${node.fields.slug}`, node.id);
              } else {
                resolvedStop = Stop(node.fields, node.path, node.id);
              }
              return {
                ...resolvedStop,
                connectsWith:
                  stop.stops.length > 0 && node.internal.type !== 'DevhubSiphon' // only real files are allowed to have connections
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
              source.sourceProperties.stops.map(stop =>
                resolvePrimaryStops(stop, source.fields.slug),
              ),
            );
          }
          return _cache[source.id];
        },
      },
    },
    GithubRaw: {
      pageViews: {
        // binding page views to github raw nodes based off of Matomo page stats so that a popular topic can be built
        type: 'Int',
        resolve: (source, args, context) => {
          const nodes = context.nodeModel.getAllNodes({ type: 'MatomoPageStats' });
          const node = nodes.find(n => n.fields.githubSlug === source.fields.slug);
          if (node) {
            return node.nb_visits;
          } else {
            return 0;
          }
        },
      },
    },
    DevhubTopic: {
      connectsWith: {
        // a list of nodes only really needs pointers to the page paths and a title for a link
        type: '[ConnectedNode]',
        resolve: (source, args, context) => {
          //
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

            let eventbriteNodes = context.nodeModel.getAllNodes({
              type: 'EventbriteEvents',
            });

            let meetupNodes = context.nodeModel.getAllNodes({
              type: 'MeetupEvent',
            });

            // siphon nodes produce multiples of the same type which we need to filter out
            webNodes = uniqBy(webNodes, 'path');

            ghNodes = ghNodes
              .filter(n => nodeBelongsToTopic(source.name, n))
              .map(n => ({
                fields: { ...n.fields },
                id: n.id,
                path: `/${source.fields.slug}/${n.fields.slug}`,
              }));

            // event nodes are only connected if they occur in the future
            eventbriteNodes = eventbriteNodes
              .filter(n => nodeBelongsToTopic(source.name, n) && n.fields.daysFromNow >= 0)
              .map(n => ({ fields: { ...n.fields }, id: n.id, path: n.fields.pagePaths[0] }));

            meetupNodes = meetupNodes
              .filter(n => nodeBelongsToTopic(source.name, n) && n.fields.daysFromNow >= 0)
              .map(n => ({ fields: { ...n.fields }, id: n.id, path: n.fields.pagePaths[0] }));

            const connectsWith = webNodes
              .concat(ghNodes)
              .sort((a, b) => {
                return a.fields.position.toString().localeCompare(b.fields.position);
              })
              .concat(eventbriteNodes)
              .concat(meetupNodes);

            _cache[source.id] = connectsWith;
          }
          return _cache[source.id];
        },
      },
    },
    EventbriteEvents: {
      organization: {
        type: 'String',
        resolve: (source, args, context, info) => {
          return getOrganizationsById(source.organization_id).name;
        },
      },
      siphon: {
        type: `DevhubSiphon`,
        resolve: (source, args, context, info) => {
          return {
            unfurl: {
              title: source.name.text,
              image: 'eventbrite',
              description: source.description.text,
            },
            resource: {
              type: 'Events',
              path: source.url,
            },
            id: source.id,
          };
        },
      },
    },
    MeetupEvent: {
      siphon: {
        type: `DevhubSiphon`,
        resolve: (source, args, context, info) => {
          return {
            unfurl: {
              title: source.fields.title,
              image: 'meetup',
              description: source.fields.description,
            },
            resource: {
              type: 'Events',
              path: source.fields.link,
            },
            id: source.id,
          };
        },
      },
    },
  };
  createResolvers(resolvers);
};
