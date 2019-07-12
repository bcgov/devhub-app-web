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
const htmlToFormattedText = require('html-to-formatted-text');
const { isArray, isString } = require('lodash');
const visit = require('unist-util-visit');
const remark = require('remark');
const { RESOURCE_TYPES, PERSONAS_LIST } = require('../src/constants/ui');
const {
  isDevhubTopic,
  isDevhubSiphon,
  isMarkdownRemark,
  isGithubRaw,
  isEventbriteEvents,
  isMeetupEvent,
  getClosestResourceType,
  getClosestPersona,
  isRegistryJson,
} = require('./utils/validators.js');
const { flattenExpandedRegistry, expandRegistry } = require('./utils/githubRaw');
const slugify = require('slugify');

/**
 * on create node for many source/transformer plugins there are a set of fields that are created
 * which are normalized. This allows a set of cards to be produced from different datastructures
 * using a common interface.
 * NORMALIZED FIELDS
 * title: <String> the card title
 * description: <String> short summary
 * slug: <String> the page path if not pointing to an external resource
 * standalonePagePath: <String>
 * author: <String>
 * personas: [<String>]
 * labels: [<String>]
 * topics: if not already a topic [<String>]
 * image: <String>
 * 
 */

module.exports = ({ node, actions, getNode, getNodes }) => {
  const { createNodeField } = actions;


  if (isGithubRaw(node)) {
    createNodeField({node, name: 'topics', value: node.___boundProperties.topics});
    createNodeField({node, name: 'position', value: node.___boundProperties.position});
  }

  if (isDevhubTopic(node)) {
    // add a content field that the markdown topics will map too
    createNodeField({ node, name: 'content', value: node.name });
    // to help with page path creation, we adapt a slug from the collection/topic name
    // because collections/topics are held within this repo they SHOULD be unique
    createNodeField({ node, name: 'slug', value: slugify(node.name) });

    const ghRawNodes = getNodes().filter(isGithubRaw);

    // bind gh raw nodes that match this topic
    const nodesThatHaveTopic = ghRawNodes
      .filter(n => n.___boundProperties.topics.includes(node.name))
      .map(n => n.id);

    createNodeField({ node, name: 'githubRaw', value: nodesThatHaveTopic });
  }

  if (isDevhubSiphon(node)) {
    createNodeField({ node, name: 'personas', value: node.attributes.personas || [] });
    createNodeField({ node, name: 'resourceType', value: node.resource.type || [] });
    createNodeField({node, name: 'position', value: node._metadata.position});
    // bind all topics that reference this node, this can only be found by looking up the registry
    const registry = getNodes().filter(isRegistryJson);

    const flattenedSources = flattenExpandedRegistry(expandRegistry(registry));
    // find topics that reference this node
    const topics = flattenedSources.filter(s => s.source.sourceProperties.url === node.resource.path).map(s => s.topic)

    createNodeField({
      node,
      name: 'topics',
      value: topics,
    });

    createNodeField({
      node,
      name: 'title',
      value: node.unfurl.title
    });
  
    createNodeField({
      node,
      name: 'description',
      value: node.unfurl.description,
    });

    createNodeField({
      node,
      name: 'image',
      value: node.unfurl.image,
    });

    createNodeField({
      node,
      name: 'author',
      value: node.unfurl.author
    });

    // no labels applied to siphon nodes, siphon nodes are filtered to only show 'source' type web
    // this is because siphon is getting deprecated, and eventaully source type web SHOULD be replaced
    // by a source plugin specifically made for that source type
    createNodeField({
      node,
      name: 'labels',
      value: ['website'] // stubbing in a static label to preserve this field from being created
    });
  }
  
  if (isEventbriteEvents(node)) {
    createNodeField({node, name: 'topics', value: ['Community and Events']});
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
  }

  if (isMeetupEvent(node)) {
    // normalize meetup event data
    createNodeField({node, name: 'topics', value: ['Community and Events']});
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
      name: 'location',
      value: node.venue ? node.venue.address_1 : '',
    });
    createNodeField({
      node,
      name: 'resourceType',
      value: RESOURCE_TYPES.EVENTS,
    });
  }

  if (isMarkdownRemark(node)) {
    const parentNode = getNode(node.parent);

    let title = node.frontmatter.title;
    const ast = remark.parse(node.internal.content);
    //if our title is blank, visit will search through the content for a usable and reasonable title
    visit(ast, 'heading', node => {
      // is title blank and is node on first line and a h1 or h2?
      if (title === '' && (node.depth === 1 || node.depth === 2)) {
        // accept headers up to 3rd line of markdown file
        if (node.position.start.line < 3) {
          title = node.children[0].value;
        }
      }
    });

    let labels = [];
    // assert the shape of labels in frontmatter
    if (Object.prototype.hasOwnProperty(node.frontmatter, 'labels')) {
      if (isArray(node.frontmatter.labels) && node.frontmatter.every(isString)) {
        labels = node.frontmatter.labels;
      } else if (isString(node.frontmatter.labels)) {
        // split by any commas and trim
        labels = node.frontmatter.labels.split().map(text => text.trim());
      }
    }

    createNodeField({
      node,
      name: 'title',
      value: node.frontmatter.title ? node.frontmatter.title : title,
    });

    createNodeField({
      node,
      name: 'description',
      value: node.frontmatter.description ? node.frontmatter.description : '',
    });

    createNodeField({
      node,
      name: 'image',
      value: node.frontmatter.image ? node.frontmatter.image : '',
    });

    createNodeField({
      node,
      name: 'labels',
      value: labels,
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
    
    if (isGithubRaw(parentNode)) {
      const slug = node.frontmatter.title ? node.frontmatter.title : title;
      // const resourceType = node.frontmatter.resourceType ? getClosest
      // add a slug for page paths if exists
      createNodeField({
        node: parentNode,
        name: 'slug',
        value: slugify(slug),
      });

      const topics = parentNode.___boundProperties.topics;
      const pagePaths = topics.map(t => `${slugify(t)}/${slugify(slug)}`);
      // all github raw nodes have a page path that is just the individual resource
      // the others are based off of the topics it belongs too
      createNodeField({
        node: parentNode,
        name: 'pagePaths',
        value: [slugify(slug)].concat(pagePaths),
      });

      
      // add resource type, initially it is set to the topic resource type
      let resourceType = parentNode.___boundProperties.topicResourceType;

      // if frontmatter resourcetype is valid we set it
      if (node.frontmatter.resourceType) {
        resourceType = getClosestResourceType(node.frontmatter.resourceType);
      }
      // there is a chance tthe front matter resource type is invalid in the sense that it is mispelled/or not apart of the
      // resource types list
      if (!resourceType) {
        resourceType = RESOURCE_TYPES.DOCUMENTATION;
      }

      createNodeField({
        node: parentNode,
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
  
      createNodeField({
        node: parentNode,
        name: 'image',
        value: node.frontmatter.image ? node.frontmatter.image : '',
      });
  
      createNodeField({
        node: parentNode,
        name: 'labels',
        value: labels,
      });
  
      createNodeField({
        node: parentNode,
        name: 'author',
        value: node.frontmatter.author ? node.frontmatter.author : '',
      });
    }
  }
};
 