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
const { SOURCE_TYPES } = require('../plugins/gatsby-source-github-all/utils/constants');

/**
 * Get Templates based on source and media type
 * @param {String} source 
 * @param {String} mediaType 
 * @returns {string} the path to the template
 */
const getTemplate = (source, mediaType) => {
  const TEMPLATES = {
    [SOURCE_TYPES.GITHUB]: {
      'text/markdown': resolve(__dirname, '../src/templates/SourceGithubMarkdown.js'),
      'text/html': resolve(__dirname, '../src/templates/SourceGithubHTML.js'),
    },
  };

  const sourceTemplate = TEMPLATES[source];
  if (sourceTemplate) {
    return sourceTemplate[mediaType];
  } else {
    throw new Error(
      `No Available Template for source type ${source}, this is most likely an issue with Siphon's code base creating nodes with the incorrect source type!`,
    );
  }
};

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // main graphql query here
  const devhubData = await graphql(`
    {
      allDevhubSiphon {
        edges {
          node {
            id
            source {
              name
              type
            }
            resource {
              path
            }
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
  devhubData.data.allDevhubSiphon.edges.forEach(({ node }) => {
    // only create pages for markdown files and ones that don't have an ignore flag
    // or a resourcePath (which links the content to an external resource)
    const isResource =
      node.childMarkdownRemark &&
      node.childMarkdownRemark.frontmatter &&
      node.childMarkdownRemark.frontmatter.resourcePath;
    const isIgnored =
      node.childMarkdownRemark &&
      node.childMarkdownRemark.frontmatter &&
      node.childMarkdownRemark.frontmatter.ignore;
    // if file is html these would both resolve to false since there are no meta data properties
    // for now we are explicitly only creating pages for text/markdown, although html pages
    // would work, there are many things about presenting html documents that haven't been ironed
    // out yet but will be in future versions
    if (!isResource && !isIgnored && node.internal.mediaType === 'text/markdown') {
      createPage({
        path: node.resource.path,
        component: getTemplate(node.source.type, node.internal.mediaType),
        context: {
          // Data passed to context is available in page queries as GraphQL variables.
          id: node.id,
          source: node.source.name,
        },
      });
    }
  });
};
