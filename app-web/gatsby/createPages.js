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
const slugify = require('slugify');
const snakeCase = require('snake-case');
const {
  SOURCE_TYPES,
  COLLECTION_TEMPLATES,
} = require('../plugins/gatsby-source-github-all/utils/constants');

const { RESOURCE_TYPES } = require('../plugins/gatsby-source-github-all/utils/constants');

// configuration to generate pages for the resourcetype page template
const RESOURCE_TYPE_PAGES = [
  RESOURCE_TYPES.COMPONENTS,
  RESOURCE_TYPES.DOCUMENTATION,
  RESOURCE_TYPES.SELF_SERVICE_TOOLS,
  RESOURCE_TYPES.REPOSITORIES,
];

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
      [COLLECTION_TEMPLATES.DEFAULT]: resolvePath('../src/templates/SourceGithub_default.js'),
      [COLLECTION_TEMPLATES.OVERVIEW]: resolvePath('../src/templates/SourceGithub_overview.js'),
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
  if (collectionTemplateFilePath !== '') {
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

/**
 * Creates all common resource type views
 * @param {Function} createPage the gatsby createpage function
 */
const createResourceTypePages = createPage => {
  const template = resolvePath('../src/templates/resourceType.js');
  RESOURCE_TYPE_PAGES.forEach(type => {
    createPage({
      path: slugify(type.toLowerCase()),
      context: {
        resourceTypeConst: snakeCase(type).toUpperCase(),
        resourceType: type,
      },
      component: template,
    });
  });
};

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions;
  createResourceTypePages(createPage);
  // main graphql query here
  const devhubData = await graphql(`
    {
      allDevhubSiphonCollection {
        edges {
          node {
            id
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
        const template = getTemplate(
          siphon.source.type,
          collection._metadata.template,
          collection._metadata.templateFile,
        );

        try {
          createPage({
            path: siphon.resource.path,
            component: template,
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              id: siphon.id,
              collection: collection.name,
              collectionId: collection.id,
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
