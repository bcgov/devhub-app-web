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

module.exports = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MeetupEvent') {
    // normalize meetup event data
    createNodeField({ node, name: 'name', value: node.name });
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
  } else if (node.internal.type === 'MarkdownRemark') {
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
  }
};
