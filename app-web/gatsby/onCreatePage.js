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

module.exports = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  // check if page that's being created matches the filter base routes
  // which is intended for client side loading only
  // https://github.com/gatsbyjs/gatsby/blob/v1/docs/docs/building-apps-with-gatsby.md#client-only-routes--user-authentication
  // only match /topic/ not /topics/

  if (page.path.match(/^\/topic(?!s)/)) {
    page.matchPath = `/topic/*`;
    createPage(page);
  }
  // Delete the content contribution page so that it does not show up on Devhub.

};
