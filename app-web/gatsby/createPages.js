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
  TOPIC_TEMPLATES,
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
 * Get Templates based on source and topicTemplate or topic template file path
 * in the even topic template file path and topic template both exist
 * the file path supersedes
 * @param {String} source
 * @param {String} topicTemplate
 * @param {String} topicTemplateFilePath
 * @returns {String} the path to the template
 */
const getTemplate = (source, topicTemplate, topicTemplateFilePath = null) => {
  const TEMPLATES = {
    [SOURCE_TYPES.GITHUB]: {
      [TOPIC_TEMPLATES.DEFAULT]: resolvePath('../src/templates/SourceGithub_default.js'),
      [TOPIC_TEMPLATES.OVERVIEW]: resolvePath('../src/templates/SourceGithub_overview.js'),
    },
  };

  let templatePath = '';
  // get source template path for default
  const sourceTemplate = TEMPLATES[source];
  if (sourceTemplate) {
    templatePath = sourceTemplate[topicTemplate];
  } else {
    throw new Error(chalk`
      {red.underline No Available Template for source type ${source}!} \n\n 
      This is most likely an issue with Siphon's code base creating nodes with the incorrect source type!
      I'd recommend checking the registry and validating all sources and topics have the correct sourcetype
      where applicable and then sifting through the validation routines to see where things are getting bunged up.`);
  }

  // if there is a topic template file path, try to resolve it and see if exists
  if (topicTemplateFilePath !== '') {
    const filePath = resolvePath(`../src/templates/${topicTemplateFilePath}`);
    if (fs.existsSync(filePath)) {
      templatePath = filePath;
    } else {
      // if it doesn't exist change template to default one
      templatePath = TEMPLATES[source][TOPIC_TEMPLATES.DEFAULT];
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

/**
 * creates all the resource pages based on the topic the resource belongs too
 * @param {Function} createPage the gatsby createpage function
 * @param {Function} graphql the gatsby graphql function
 */
const createResourceComponentPages = async (createPage, graphql) => {
  // main graphql query here
  const devhubData = await graphql(`
    {
      allDevhubTopic {
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
  // loop over topics and then nodes

  devhubData.data.allDevhubTopic.edges.forEach(({ node }) => {
    const topic = node;
    // 'node' is the property that holds the topic object after the graphql query has prrocessed
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
          topic._metadata.template,
          topic._metadata.templateFile,
        );

        try {
          createPage({
            path: siphon.resource.path,
            component: template,
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              id: siphon.id,
              collection: topic.name,
              collectionId: topic.id,
            },
          });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e); // console error here so message is displayed in a nicer way
          throw new Error('Error Quiting Build'); // throw to kill gatsby build
        }
      }
    });
  });
};

/**
 * attempts to create the evnets page, however if the event brite api key is missing
 * is creates a placeholder page
 * @param {Function} createPage the gatsby createpage function
 */
const createEventsPage = createPage => {
  let component = resolvePath('../src/templates/events.js');

  if (!process.env.EVENT_BRITE_API_KEY || !process.env.MEETUP_API_KEY) {
    component = resolvePath('../src/templates/TemplatePlaceholder.js');
  }

  createPage({
    path: 'events',
    component,
  });
};

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions;
  createResourceTypePages(createPage);
  createResourceComponentPages(createPage, graphql);
  createEventsPage(createPage);
};
