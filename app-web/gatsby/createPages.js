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
const { TOPIC_TEMPLATES } = require('../plugins/gatsby-source-github-all/utils/constants');

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
 *
 * @param {Object} node the gatsby node
 * @param {Object} node.fields
 * @param {Array} node.fields.pagePaths a list of page paths to create pages for based on this resource
 * @param {Array} node.fields.topics a list of topics that are associated with the same indexed pagePath from above
 * @param {Function} createPage the gatsby create page function
 */
const createResourceInTopicsPages = (node, createPage) => {
  node.fields.pagePaths.forEach((path, ind) => {
    const topic = node.fields.topics[ind];
    const template = getTemplate(topic.fields.template);

    createPage({
      path: `${path}`,
      component: template,
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        id: node.id,
        topic: topic.name,
        topicId: topic.id,
      },
    });
  });
};
/**
 * Get Templates based on source and topicTemplate or topic template file path
 * in the even topic template file path and topic template both exist
 * the file path supersedes
 * @param {String} source
 * @param {String} topicTemplate
 * @param {String} topicTemplateFilePath
 * @returns {String} the path to the template
 */
const getTemplate = (topicTemplate, topicTemplateFilePath = null) => {
  const TEMPLATES = {
    [TOPIC_TEMPLATES.DEFAULT]: resolvePath('../src/templates/SourceGithub_default.js'),
    [TOPIC_TEMPLATES.OVERVIEW]: resolvePath('../src/templates/SourceGithub_overview.js'),
  };

  let templatePath = '';

  // get source template path for default
  const sourceTemplate = TEMPLATES[topicTemplate];
  if (!sourceTemplate) {
    throw new Error(chalk`
      {red.underline No Available Template for ${topicTemplate}!} \n\n 
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
      templatePath = TEMPLATES[TOPIC_TEMPLATES.DEFAULT];
    }
  } else {
    templatePath = sourceTemplate;
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
 * Creates all journey views
 * @param {Function} createPage the gatsby createpage function
 */
const createJourneyPage = (node, createPage) => {
  const template = resolvePath('../src/templates/JourneyEntry_default.js');

  createPage({
    path: node.fields.slug,
    context: {
      id: node.id,
      name: node.name,
    },
    component: template,
  });
};

const createJourneyStopPage = (node, journeyId, createPage) => {
  const templateMappings = {
    GithubRaw: resolvePath('../src/templates/JourneyGithub_default.js'),
  };

  createPage({
    path: node.path,
    context: {
      id: journeyId,
      githubId: node.id,
    },
    component: templateMappings[node._type],
  });
};

const createJourneyPages = async (createPage, graphql) => {
  const data = await graphql(`
    {
      allJourneyRegistryJson {
        edges {
          node {
            id
            name
            fields {
              slug
            }
            connectsWith {
              path
              id
              _type
            }
          }
        }
      }
    }
  `);

  data.data.allJourneyRegistryJson.edges.forEach(({ node }) => {
    // create the main journey page
    createJourneyPage(node, createPage);

    // for each 'stop' in the journey create a page
    node.connectsWith.forEach(connection => {
      createJourneyStopPage(connection, node.id, createPage);
    });
  });
};
/**
 * creates all the resource pages based on the topic the resource belongs too
 * @param {Function} createPage the gatsby createpage function
 * @param {Function} graphql the gatsby graphql function
 */
const createResourceTopicsPages = async (createPage, graphql) => {
  // main graphql query here
  const data = await graphql(`
    {
      allGithubRaw {
        edges {
          node {
            id
            fields {
              pagePaths
              topics {
                id
                fields {
                  template
                }
              }
            }
          }
        }
      }
    }
  `);

  data.data.allGithubRaw.edges.forEach(({ node }) => {
    // create a page based on the github raw node and the topics its connected too
    createResourceInTopicsPages(node, createPage);
  });
};

/**
 * creates stand alone pages for githubraw resources (i.e resources that arent external)
 * @param {Function} createPage the gatsby createpage function
 * @param {Function} graphql the gatsby graphql function
 */
const createStandAlonePage = async (createPage, graphql) => {
  let template = resolvePath('../src/templates/StandAlone_GitHubRaw.js');
  // main graphql query here
  const devhubGithubData = await graphql(`
    {
      allGithubRaw {
        edges {
          node {
            id
            fields {
              title
              slug
            }
          }
        }
      }
    }
  `);

  devhubGithubData.data.allGithubRaw.edges.forEach(({ node }) => {
    let path = `/${node.fields.slug}`;
    createPage({
      path: path,
      component: template,
      context: {
        id: node.id,
      },
    });
  });
};

/**
 * attempts to create the evnets page, however if the event brite api key is missing
 * is creates a placeholder page
 * @param {Function} createPage the gatsby createpage function
 */
const createEventsPage = async createPage => {
  let eventComponent = resolvePath('../src/templates/events.js');
  let pastEventComponent = resolvePath('../src/templates/pastEvents.js');
  //if (!process.env.EVENT_BRITE_API_KEY || !process.env.MEETUP_API_KEY) {
  if (!process.env.EVENT_BRITE_API_KEY) {
    eventComponent = resolvePath('../src/templates/TemplatePlaceholder.js');
    pastEventComponent = resolvePath('../src/templates/TemplatePlaceholder.js');
  }

  createPage({
    path: 'events',
    component: eventComponent,
  });

  createPage({
    path: 'past-events',
    component: pastEventComponent,
  });
};

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions;

  await createResourceTypePages(createPage);
  await createResourceTopicsPages(createPage, graphql);
  await createEventsPage(createPage);
  await createStandAlonePage(createPage, graphql);
  // journeys should be created similarly to topics so we cann filter out conflicting github nodes
  await createJourneyPages(createPage, graphql);
};
