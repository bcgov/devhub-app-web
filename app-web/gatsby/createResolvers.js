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
  const resolvers = {
    DevhubTopic: {
      connectsWith: { // a list of nodes only really needs pointers to the page paths and a title for a link
        type: '[ConnectedNode]',
        resolve: (source, args, context) => {
          // get all github raw nodes and siphon source type web nodes and return them ordered by fields.position
          const webNodes = context.nodeModel.getAllNodes({
            type: 'DevhubSiphon',
          }).filter(n => n.source.type === 'web').map(n => ({id: n.id, position: n.fields.position, path: n.resource.path, name: n.fields.title, resourceType: n.fields.resourceType}))
          let ghNodes = context.nodeModel.getAllNodes({
            type: 'GithubRaw'
          });
          ghNodes = ghNodes.filter(n => n.fields.topics.includes(source.name))
            .map(n => ({id: n.id, position: n.fields.position.toString(), path: `${source.fields.slug}/${n.fields.slug}`, name: n.fields.title, resourceType: n.fields.resourceType}))

          return webNodes.concat(ghNodes).sort((a, b) => {
            return a.position.localeCompare(b.position)
          });
        }
      }
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
