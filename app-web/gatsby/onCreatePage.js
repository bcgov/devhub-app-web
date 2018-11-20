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

// const { FILTER_BASE_ROUTE } = require('../src/constants/routes');
// the above declaration is to identify the actual constants where FILTER_BASE_ROUTES
// should be coming from. At this time, there is no babel transpilation of this file or gatsby-node
// and so requiring from an es6+ file (such as src/constants/routes) will fail.
// until the time this issue is resolved, are declaring the filter base route here in the interim.
const FILTER_BASE_ROUTE = '/resources';

module.exports = async ({ page, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const re = new RegExp(`^${FILTER_BASE_ROUTE}`);
  // check if page that's being created matches the filter base routes
  // which is intended for client side loading only
  // https://github.com/gatsbyjs/gatsby/blob/v1/docs/docs/building-apps-with-gatsby.md#client-only-routes--user-authentication
  if (page.path.match(re)) {
    page.matchPath = `${FILTER_BASE_ROUTE}/:resource`;
    createPage(page);
  }
};
