/*
Copyright 2019 Province of British Columbia

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
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const moment = require('moment');
const htmlToFormattedText = require('html-to-formatted-text');
const { isPlainObject, isArray } = require('lodash');
const visit = require('unist-util-visit');
const remark = require('remark');
const { RESOURCE_TYPES_LIST, PERSONAS_LIST, RESOURCE_TYPES } = require('../src/constants/ui');
const {
  isDevhubSiphon,
  isMarkdownRemark,
  isGithubRaw,
  isEventbriteEvents,
  isMeetupEvent,
  getClosestResourceType,
  getClosestPersona,
  isTopicRegistryJson,
  isJourneyRegistryJson,
} = require('./utils/validators.js');
const { isRelativePath, converter } = require('./utils/gatsbyRemark');
const { flattenExpandedRegistry, expandRegistry } = require('./utils/githubRaw');
const slugify = require('slugify');
const validUrl = require('valid-url');
// build time date
const buildTimeDate = moment();

/**
 * on create node for many source/transformer plugins there are a set of fields that are created
 * which are normalized. This allows a set of cards to be produced from different datastructures
 * using a common interface.
 * NORMALIZED FIELDS
 * @param  {String}  title the card title
 * @param  {String}  description short summary
 * @param  {String}  slug the page path if not pointing to an external resource
 * @param  {String} standalonePagePath
 * @param {Array{String}} personas
 * @param {Array{String}} labels
 * @param {Array{String}} topics if not already a topic
 * @param {Array{String}} journeys if not already a journey
 * @param  {String} image
 * more info can be found in devhubCardSpec.md
 */
module.exports = async ({ node, actions, getNode, getNodes, store, cache, createNodeId }) => {
  const { createNodeField, createNode } = actions;

  if (isGithubRaw(node)) {
    createNodeField({ node, name: 'topics', value: node.___boundProperties.topics });
    createNodeField({ node, name: 'journeys', value: node.___boundProperties.journeys });
    createNodeField({ node, name: 'position', value: node.___boundProperties.position });
  }

  if (isJourneyRegistryJson(node)) {
    const slug = slugify(node.name);

    createNodeField({ node, name: 'slug', value: slug });
    createNodeField({ node, name: 'title', value: node.name });
    createNodeField({ node, name: 'description', value: node.description });
    createNodeField({ node, name: 'standAlonePath', value: slug });
    createNodeField({ node, name: 'resourceType', value: 'Journey' });
  }

  if (isTopicRegistryJson(node)) {
    const slug = slugify(node.name);

    // add a content field that the markdown topics will map too
    createNodeField({ node, name: 'content', value: node.name });
    // to help with page path creation, we adapt a slug from the collection/topic name
    // because collections/topics are held within this repo they SHOULD be unique
    createNodeField({ node, name: 'slug', value: slug });
    createNodeField({ node, name: 'title', value: node.name });
    createNodeField({ node, name: 'description', value: node.description });
    createNodeField({ node, name: 'template', value: node.template ? node.template : 'default' });
    createNodeField({ node, name: 'standAlonePath', value: '' });
    createNodeField({ node, name: 'resourceType', value: 'Topics' });
  }

  if (isDevhubSiphon(node)) {
    let isExternal = !!validUrl.isWebUri(node.path);
    let truePath = '';
    if (isExternal) {
      truePath = node.resource.path;
    } else {
      truePath = `/${slugify(node.unfurl.title)}`;
    }
    createNodeField({ node, name: 'standAlonePath', value: truePath });
    createNodeField({ node, name: 'personas', value: node.attributes.personas || [] });
    createNodeField({ node, name: 'tags', value: node.attributes.tags || [] });
    createNodeField({ node, name: 'resourceType', value: node.resource.type || [] });
    createNodeField({ node, name: 'position', value: node._metadata.position });
    // bind all topics that reference this node, this can only be found by looking up the registry
    const registry = getNodes().filter(isTopicRegistryJson);

    const flattenedSources = flattenExpandedRegistry(expandRegistry(registry));
    // find topics that reference this node
    const topics = flattenedSources
      .filter(s => s.source.sourceProperties.url === node.resource.path)
      .map(s => s.topic);

    createNodeField({
      node,
      name: 'topics',
      value: topics,
    });

    createNodeField({
      node,
      name: 'title',
      value: node.unfurl.title,
    });

    createNodeField({
      node,
      name: 'description',
      value: node.unfurl.description,
    });

    if (
      node.unfurl.image &&
      /^https/.test(node.unfurl.image) &&
      !/svg$/.test(node.unfurl.image) &&
      !/(githubassets.com)/.test(node.unfurl.image) // Exclude images from GitHub CDN due to its API rate limiting breaking builds
    ) {
      let fileNode = await createRemoteFileNode({
        url: node.unfurl.image, // string that points to the URL of the image
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        cache, // Gatsby's cache
        store, // Gatsby's redux store
      });
      if (fileNode) {
        try {
          createNodeField({
            node,
            name: 'image',
            value: node.unfurl.image || '',
          });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn(`could not create image node field for devhub siphone ${node.id}`);
          createNodeField({
            node,
            name: 'image',
            value: null,
          });
        }
      }
    }

    createNodeField({
      node,
      name: 'author',
      value: node.unfurl.author,
    });

    createNodeField({
      node,
      name: 'pagePaths',
      value: [node.resource.path],
    });

    // no labels applied to siphon nodes, siphon nodes are filtered to only show 'source' type web
    // this is because siphon is getting deprecated, and eventaully source type web SHOULD be replaced
    // by a source plugin specifically made for that source type
    createNodeField({
      node,
      name: 'labels',
      value: ['website'], // stubbing in a static label to preserve this field from being created
    });
  }

  if (isEventbriteEvents(node)) {
    // createNodeField({ node, name: 'topics', value: ['Community and Events'] });
    createNodeField({
      node,
      name: 'daysFromNow',
      value: moment(node.start.local).diff(buildTimeDate, 'days'),
    });
    createNodeField({ node, name: 'image', value: 'eventbrite' });
    createNodeField({
      node,
      name: 'resourceType',
      value: RESOURCE_TYPES.EVENTS,
    });
    createNodeField({ node, name: 'title', value: node.name.text });
    createNodeField({
      node,
      name: 'description',
      value: node.description.text,
    });
    createNodeField({
      node,
      name: 'pagePaths',
      value: [node.url],
    });
    createNodeField({
      node,
      name: 'standAlonePath',
      value: node.url,
    });
  }

  if (isMeetupEvent(node)) {
    // normalize meetup event data
    createNodeField({ node, name: 'image', value: 'meetup' });
    createNodeField({
      node,
      name: 'daysFromNow',
      value: moment(node.time).diff(buildTimeDate, 'days'),
    });
    createNodeField({ node, name: 'topics', value: ['Community and Events'] });
    createNodeField({ node, name: 'title', value: node.name });
    createNodeField({
      node,
      name: 'description',
      value: node.description ? htmlToFormattedText(node.description) : '',
    });
    createNodeField({
      node,
      name: 'link',
      value: node.link,
    });
    createNodeField({
      node,
      name: 'pagePaths',
      value: [node.link],
    });
    createNodeField({
      node,
      name: 'location',
      value: node.venue ? node.venue.address_1 : '',
    });
    createNodeField({
      node,
      name: 'resourceType',
      value: RESOURCE_TYPES.EVENTS,
    });
    createNodeField({
      node,
      name: 'standAlonePath',
      value: node.link,
    });
  }

  if (isMarkdownRemark(node)) {
    const parentNode = getNode(node.parent);
    let title = node.frontmatter.title;
    const ast = remark.parse(node.internal.content);
    //if our title is blank, visit will search through the content for a usable and reasonable title
    if (!title) {
      visit(ast, 'heading', node => {
        // is title blank and is node on first line and a h1 or h2?
        const H2_NODE_DEPTH = 2;
        const MAX_STARTING_LINE = 10;
        const isH1orH2 = node.depth <= H2_NODE_DEPTH;
        if (title === '' && isH1orH2) {
          // accept headers up to 3rd line of markdown file
          if (node.position.start.line < MAX_STARTING_LINE) {
            title = node.children[0].value;
          }
        }
      });
    }

    let labels = {};
    // assert the shape of labels in frontmatter
    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'labels')) {
      if (isPlainObject(node.frontmatter.labels)) {
        labels = node.frontmatter.labels;
      }
    }
    let tags = [];
    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'tags')) {
      if (isArray(node.frontmatter.tags)) {
        tags = node.frontmatter.tags;
      }
    }

    createNodeField({
      node,
      name: 'title',
      value: node.frontmatter.title ? node.frontmatter.title : title,
    });

    createNodeField({
      node,
      name: 'labels',
      value: labels,
    });

    createNodeField({
      node,
      name: 'tags',
      value: tags,
    });

    createNodeField({
      node,
      name: 'description',
      value: node.frontmatter.description ? node.frontmatter.description : '',
    });

    if (
      !!node.frontmatter.image &&
      /^https/.test(node.frontmatter.image) &&
      !/svg$/.test(node.frontmatter.image)
    ) {
      await createRemoteFileNode({
        url: node.frontmatter.image, // string that points to the URL of the image
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        cache, // Gatsby's cache
        store, // Gatsby's redux store
      });
    }
    createNodeField({
      node,
      name: 'image',
      value: node.frontmatter.image ? node.frontmatter.image : '',
    });

    createNodeField({
      node,
      name: 'author',
      value: node.frontmatter.author ? node.frontmatter.author : '',
    });

    createNodeField({
      node,
      name: 'content',
      value: node.internal.content ? node.internal.content : '',
    });
    // add a slug for page paths if exists
    const slug = slugify(title);

    createNodeField({
      node: node,
      name: 'standAlonePath',
      value: `/${slug}`,
    });
    createNodeField({
      node: node,
      name: 'slug',
      value: slug,
    });

    if (isGithubRaw(parentNode)) {
      // allows to filter out github raw resources that shouldnt be rendered as cards
      createNodeField({
        node: parentNode,
        name: 'pageOnly',
        value: !!node.frontmatter.pageOnly,
      });

      createNodeField({
        node: parentNode,
        name: 'slug',
        value: slug,
      });

      const topics = parentNode.___boundProperties.topics;
      // we need to have topics here and create page paths for them
      const pagePaths = topics.map(t => `${slugify(t)}/${slugify(slug)}`);
      // all github raw nodes have a page path that is just the individual resource
      // the others are based off of the topics it belongs too
      createNodeField({
        node: parentNode,
        name: 'pagePaths',
        value: pagePaths,
      });
      createNodeField({
        node: parentNode,
        name: 'standAlonePath',
        value: `/${slugify(slug)}`,
      });

      // add resource type, initially it is set to the topic resource type
      let resourceType = parentNode.___boundProperties.topicResourceType;

      // if frontmatter resourcetype is valid we set it
      if (node.frontmatter.resourceType) {
        resourceType = getClosestResourceType(node.frontmatter.resourceType, RESOURCE_TYPES_LIST);
      }
      // there is a chance tthe front matter resource type is invalid in the sense that it is mispelled/or not apart of the
      // resource types list
      if (!resourceType) {
        resourceType = RESOURCE_TYPES.DOCUMENTATION;
      }

      let topicName = parentNode.___boundProperties.topics;

      createNodeField({
        node: parentNode,
        name: 'topicName',
        value: topicName ? topicName : '',
      });
      createNodeField({
        node: node,
        name: 'topicName',
        value: topicName ? topicName : '',
      });

      createNodeField({
        node: parentNode,
        name: 'resourceType',
        value: resourceType,
      });
      createNodeField({
        node: node,
        name: 'resourceType',
        value: resourceType,
      });

      // adding personas
      // add resource type, initially it is set to the topic resource type
      let personas = parentNode.___boundProperties.topicPersonas;
      // if frontmatter resourcetype is valid we set it
      if (node.frontmatter.personas) {
        personas = getClosestPersona(PERSONAS_LIST, node.frontmatter.personas);
      }
      // there is a chance tthe front matter resource type is invalid in the sense that it is mispelled/or not apart of the
      // resource types list
      if (!personas) {
        personas = [];
      }

      createNodeField({
        node: parentNode,
        name: 'personas',
        value: personas,
      });

      createNodeField({
        node: parentNode,
        name: 'title',
        value: node.frontmatter.title ? node.frontmatter.title : title,
      });

      createNodeField({
        node: parentNode,
        name: 'description',
        value: node.frontmatter.description ? node.frontmatter.description : '',
      });

      // images can point to local files to the repository which need to be resolved
      let resolvedImage = '';
      if (validUrl.isWebUri(node.frontmatter.image)) {
        resolvedImage = node.frontmatter.image;
      } else if (isRelativePath(node.frontmatter.image)) {
        resolvedImage = converter('image', node.frontmatter.image, node, parentNode, {
          getNode,
          getNodes,
        });
      }

      createNodeField({
        node: parentNode,
        name: 'image',
        value: resolvedImage,
      });

      createNodeField({
        node: parentNode,
        name: 'author',
        value: node.frontmatter.author ? node.frontmatter.author : '',
      });
    }
  }
};
