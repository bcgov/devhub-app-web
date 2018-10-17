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
    const pathFinderTemplate = resolve(__dirname, '../src/templates/github.js');
    const genericTemplate = resolve(__dirname, '../src/templates/generic.js');
    // *****************************************************
    // this is legacy page creation for pathfinder.gov.bc.ca
    // *****************************************************
    const githubData = await graphql(`
    {
      allGithubData {
        edges {
          node {
            fields {
              slug
              basePagePath
            }
            data {
              organization {
                repository {
                  resources {
                    yaml: text
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  // process the yaml file from pathfinder repo
  // although this is in a loop, it's should be length 1 
  githubData.data.allGithubData.edges.forEach(({ node }) => {
    // create pathfinder page using github page template
    createPage({
      path: node.fields.basePagePath + node.fields.slug,
      component: pathFinderTemplate,
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug: node.fields.slug,
        yaml: node.data.organization.repository.resources.yaml,
      },
    });
  });

  // main graphql query here
  const githubDataV2 = await graphql(`
    {
        allSourceDevhubGithub {
        edges {
            node {
                id,
                name,
                fileName,
                fileType,
                owner,
                path,
                source,
                sourceName,
                childMarkdownRemark {
                  frontmatter {
                    title,
                  },
                  html,
                },
                internal {
                    contentDigest
                    mediaType
                    type
                    content
                    owner
                }
            }
        }
    }}
  `);

  // // right now we are making an assumption all data here resolved from a markdown file
  // // and will be treated as so
  githubDataV2.data.allSourceDevhubGithub.edges.forEach(({ node }) => {
    const title = node.childMarkdownRemark.frontmatter.title ? node.childMarkdownRemark.frontmatter.title : node.fileName;
    createPage({
        path: `/learn/${node.source}/${title}`,
        component: genericTemplate,
        context: {
          // Data passed to context is available in page queries as GraphQL variables.
          id: node.id,
        },
    });
  });
};