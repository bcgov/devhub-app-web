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
const chalk = require('chalk');
const fs = require('fs');
const {
  SOURCE_TYPES,
  COLLECTION_TEMPLATES,
} = require('../plugins/gatsby-source-github-all/utils/constants');

const resolvePath = path => resolve(__dirname, path);
/**
 * Get Templates based on source and collectionTemplate or collection template file path
 * in the even collection template file path and collection template both exist
 * the file path supersedes
 * @param {String} source
 * @param {String} collectionTemplate
 * @param {String} collectionTemplateFilePath
 * @returns {String} the path to the template
 */
const getTemplate = (source, collectionTemplate, collectionTemplateFilePath = null) => {
  const TEMPLATES = {
    [SOURCE_TYPES.GITHUB]: {
      [COLLECTION_TEMPLATES.DEFAULT]: resolvePath('../src/templates/SourceGithubMarkdown.js'),
      [COLLECTION_TEMPLATES.OVERVIEW]: resolvePath('../src/templates/SourceGithubMarkdown.js'),
    },
  };

  let templatePath = '';
  // get source template path for default
  const sourceTemplate = TEMPLATES[source];
  if (sourceTemplate) {
    templatePath = sourceTemplate[collectionTemplate];
  } else {
    throw new Error(chalk`
      {red.underline No Available Template for source type ${source}!} \n\n 
      This is most likely an issue with Siphon's code base creating nodes with the incorrect source type!
      I'd recommend checking the registry and validating all sources and collections have the correct sourcetype
      where applicable and then sifting through the validation routines to see where things are getting bunged up.`);
  }

  // if there is a collection template file path, try to resolve it and see if exists
  if (collectionTemplateFilePath) {
    const filePath = resolvePath(`../src/templates/${collectionTemplateFilePath}`);
    if (fs.existsSync(filePath)) {
      templatePath = filePath;
    } else {
      // if it doesn't exist change template to default one
      templatePath = TEMPLATES[source][COLLECTION_TEMPLATES.DEFAULT];
    }
  }

  return templatePath;
};

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // main graphql query here
  const devhubData = await graphql(`
    {
      allDevhubSiphonCollection {
        edges {
          node {
            name
            _metadata {
              template
              templateFile
            }
            childrenDevhubSiphon {
              id
              source {
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
    }
  `);
  // right now we are making an assumption all data here resolved from a markdown file
  // and will be treated as so
  // loop over collections and then nodes

  devhubData.data.allDevhubSiphonCollection.edges.forEach(({ node }) => {
    const collection = node;
    // 'node' is the property that holds the collection object after the graphql query has prrocessed
    node.childrenDevhubSiphon.forEach(siphon => {
      // only create pages for markdown files and ones that don't have an ignore flag
      // or a resourcePath (which links the content to an external resource)
      const isResource =
        siphon.childMarkdownRemark &&
        siphon.childMarkdownRemark.frontmatter &&
        siphon.childMarkdownRemark.frontmatter.resourcePath;
      const isIgnored =
        siphon.childMarkdownRemark &&
        siphon.childMarkdownRemark.frontmatter &&
        siphon.childMarkdownRemark.frontmatter.ignore;
      // if file is html these would both resolve to false since there are no meta data properties
      // for now we are explicitly only creating pages for text/markdown, although html pages
      // would work, there are many things about presenting html documents that haven't been ironed
      // out yet but will be in future versions
      if (!isResource && !isIgnored && siphon.internal.mediaType === 'text/markdown') {
        try {
          createPage({
            path: siphon.resource.path,
            component: getTemplate(
              siphon.source.type,
              collection._metadata.template,
              collection._metadata.templateFile,
            ),
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              id: siphon.id,
              collection: collection.name,
            },
          });
        } catch (e) {
          console.error(e); // console error here so message is displayed in a nicer way
          throw new Error('Error Quiting Build'); // throw to kill gatsby build
        }
      }
    });
  });
};
