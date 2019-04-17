/*
Copyright 2018 Province of British Columbia

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

exports.onCreateWebpackConfig = require('./gatsby/modifyWebpackConfig');
exports.onCreatePage = require('./gatsby/onCreatePage');
exports.createPages = require('./gatsby/createPages');
exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    EventbriteEvents: {
      organization: {
        type: 'String',
        resolve: (source, args, context, info) => {
          return getOrganizationsById(source.organization_id).name;
        },
      },
    },
  };
  createResolvers(resolvers);
};
