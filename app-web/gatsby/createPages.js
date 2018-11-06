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

// create pages based on nodes
const { resolve } = require('path');

module.exports = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const markdownTemplate = resolve(__dirname, '../src/templates/markdown.js');

  // main graphql query here
  const devhubData = await graphql(`
    {
      allSourceDevhubGithub {
        edges {
          node {
            id
            source
            resourcePath
            internal {
              mediaType
            }
            childMarkdownRemark {
              frontmatter {
                resourcePath
                ignore
              }
            }
          }
        }
      }
    }
  `);
  // // right now we are making an assumption all data here resolved from a markdown file
  // // and will be treated as so
  devhubData.data.allSourceDevhubGithub.edges.forEach(({ node }) => {
    // only create pages for markdown files and ones that don't have an ignore flag
    // or a resourcePath (which links the content to an external resource)
    if (
      node.internal.mediaType === 'text/markdown' &&
      !node.childMarkdownRemark.frontmatter.ignore &&
      !node.childMarkdownRemark.frontmatter.resourcePath
    ) {
      createPage({
        path: node.resourcePath,
        component: markdownTemplate,
        context: {
          // Data passed to context is available in page queries as GraphQL variables.
          id: node.id,
          source: node.source,
        },
      });
    }
  });
};
