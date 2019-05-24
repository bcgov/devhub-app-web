/*
Copyright 2018 Province of British Columbia

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
const slugify = require('slugify');
const matter = require('gray-matter');
const visit = require('unist-util-visit');
const remark = require('remark');
const url = require('url');
const validUrl = require('valid-url');
const path = require('path');
const { TypeCheck } = require('@bcgov/common-web-utils');
const Store = require('./Store');
const {
  // createPathWithDigest,
  createUnfurlObj,
  getClosestResourceType,
  getClosestPersona,
  mergeUnfurls,
  unfurlWebURI,
  withUnfurlWarning,
} = require('./helpers'); // eslint-disable-line
const { MARKDOWN_FRONTMATTER_SCHEMA, UNFURL_TYPES, RESOURCE_TYPES } = require('./constants');
const siphonMessenger = require('./console');
const slugStore = new Store([], {
  throwOnConflict: true,
});

/**
 * applys default front matter properties
 * @param {String} extension
 * @param {Object} file
 * @returns {Object} the modified file
 */
const markdownFrontmatterPlugin = (extension, file) => {
  // only modify markdown files
  if (extension === 'md') {
    // parse front matter
    const data = matter(file.content, { delimiters: '---' });
    const frontmatter = data.data;
    const DEFAULTS = {
      title: () => {
        // attempt to generate a title by finding the first h1 in markdown content
        // if none title should be fileName
        const ast = remark.parse(data.content);
        // make title file name by default
        let title = file.metadata.fileName;
        // visit heading
        visit(ast, 'heading', node => {
          // is node on first line and a h1 or h2?
          if (title === file.metadata.fileName && (node.depth === 1 || node.depth === 2)) {
            // accept headers up to 3rd line of markdown file
            if (node.position.start.line < 3) {
              title = node.children[0].value;
            }
          }
        });
        return title;
      },
      ignore: () => false, // should this markdown siphon node be ignored
      resourcePath: () => '', // apply empty string as a default, tells gatsby to treate this node as a dynamic page
      label1: () => '', // unfurl metadata
      data1: () => '', // unfurl metadata
      label2: () => '', // unfurl metadata
      data2: () => '', // unfurl metadata
      image: () => '', // unfurl metadata
      author: () => '', // unfurl metadata
      pageOnly: () => false, // in the use case where we want this node to not be presented as a card in the home page
      // provide default resource type to be blank
      resourceType: () => '',
      persona: () => '',
    };
    // check front matter against defaults
    Object.keys(MARKDOWN_FRONTMATTER_SCHEMA).forEach(key => {
      const property = MARKDOWN_FRONTMATTER_SCHEMA[key];
      const value = frontmatter[key];
      const valueIsInvalid = !value || !TypeCheck.isA(property.type, value) || value === '';
      // if propery required and frontmatter doesn't have it
      if (property.required && valueIsInvalid) {
        throw new Error(
          `\nFrontmatter key '${key}' is required but ${file.metadata.fileName} for source ${
            file.metadata.source
          } is missing it and will be ignored`,
        );
        // is there a defaultable value we can provide
      } else if (valueIsInvalid && DEFAULTS[key]) {
        frontmatter[key] = DEFAULTS[key]();
      }
    });
    // attach front matter properties to metadata
    file.metadata = {
      ...file.metadata,
      resourceTitle: frontmatter.title,
      resourceDescription: frontmatter.description,
      ignore: frontmatter.ignore,
    };
    // create 'new' md string with updated front matter
    file.content = matter.stringify(data.content, frontmatter);
    return file;
  }
  return file;
};

/**
 * assigns the metadata page path property
 * @param {String} extension
 * @param {Object} file
 * @returns {Object} the modified file
 */
const pagePathPlugin = (extension, file) => {
  if (extension !== 'md' && extension !== 'html') {
    return file;
  }
  // check front matter for a resourcePath
  if (extension === 'md') {
    const data = matter(file.content, { delimiters: '---' });
    const frontmatter = data.data;
    if (frontmatter.resourcePath) {
      file.metadata.resourcePath = frontmatter.resourcePath;
      return file;
    }
  }

  let pagePath = file.metadata.source;

  if (file.metadata.collection && file.metadata.collection.slug) {
    pagePath = file.metadata.collection.slug;
  }

  if (file.metadata.slug) {
    pagePath += `/${file.metadata.slug}`;
  }
  // no resource path, this file is destined to be turned into a page,
  // the page page is composed of the source name, the title of the file plus an id
  // file.metadata.resourcePath = createPathWithDigest(
  //   path,
  //   file.metadata.source,
  //   file.metadata.name,
  //   file.html_url,
  // );

  // new implementation under going testing is a page path based on collection slug / resource slug
  file.metadata.resourcePath = `/${pagePath}`;
  return file;
};

/**
 * unfurls markdown by frontmatter and appends the .unfurl metadata property
 * @param {String} extension
 * @param {String} file
 * @returns the modified file
 */
const markdownUnfurlPlugin = (extension, file) => {
  if (extension !== 'md') {
    return file;
  }
  // grab front matter from md file
  const data = matter(file.content, { delims: '---' });
  const frontmatter = data.data;
  const unfurl = createUnfurlObj(UNFURL_TYPES.MARKDOWN, frontmatter);
  // check image path and see if its relative, if it is we need to create the absolute path from
  // apply unfurl metadata
  file.metadata.unfurl = unfurl;
  return file;
};

/**
 * modifies a file objects file.metadata.unfurl.image property
 * if this is a relative path is converts it to absolute
 * if it is an absolute path minus the host, it appends the host
 * @param {String} extension
 * @param {Object} file the github api contents file object
 */
const markDownUnfurlImagePlugin = (extension, file) => {
  if (extension !== 'md' || !Object.prototype.hasOwnProperty.call(file.metadata, 'unfurl')) {
    return file;
  }

  const unfurl = file.metadata.unfurl;
  // if the image paramater is relative, it will be correctly mapped to an absolute path
  if (
    TypeCheck.isString(unfurl.image) &&
    unfurl.image.trim().length > 0 &&
    !validUrl.isWebUri(unfurl.image)
  ) {
    if (path.isAbsolute(unfurl.image)) {
      // if the path is absolute we need to map the path based of the sourcePath to the repo
      // this plus the absolute path cannot just be joined as the github api follows a convention
      // for reaching a file
      const urlObject = new url.URL(file.url);
      const branch = urlObject.searchParams.get('ref');
      const path = `${file.metadata.owner}/${file.metadata.source}/blob/${branch}${unfurl.image}`;
      const absPath = url.resolve('https://github.com', path);

      const absPathObj = new url.URL(absPath);
      absPathObj.searchParams.set('raw', true);
      unfurl.image = absPathObj.toString();
    } else {
      // if path is relative
      const absPath = url.resolve(file.html_url, unfurl.image);
      // since these files are from github we need to ensure the raw query paramter is passed into it
      const urlObj = new url.URL(absPath);
      urlObj.searchParams.set('raw', true);
      unfurl.image = urlObj.toString();
    }
  }
  return file;
};

/**
 * Applies the resourceType metadata property
 * @param {String} extension
 * @param {Object} file
 */
const markdownResourceTypePlugin = (extension, file) => {
  if (extension !== 'md') {
    return file;
  }
  // grab front matter from md file
  const data = matter(file.content, { delims: '---' });
  const frontmatter = data.data;
  // is front matter resource type valid?
  if (frontmatter.resourceType) {
    file.metadata.resourceType = getClosestResourceType(frontmatter.resourceType);
    // is there a global resource type this file can inherit?
  } else if (file.metadata.globalResourceType) {
    file.metadata.resourceType = getClosestResourceType(file.metadata.globalResourceType);
  } else {
    file.metadata.resourceType = '';
  }
  return file;
};

/**
 * unfurls from an HTTP request and appends .unfurl metadata property
 * @param {String} extension
 * @param {String} file
 * @returns the modified file
 */
const externalLinkUnfurlPlugin = async (extension, file) => {
  try {
    let unfurl = await unfurlWebURI(file.metadata.resourcePath);
    if (Object.prototype.hasOwnProperty.call(file.metadata, 'unfurl') && file.metadata.unfurl) {
      // if unfurl exists in file already merge the results with the prexsisting unfurl taking priority
      unfurl = mergeUnfurls(file.metadata.unfurls, unfurl);
    }

    file.metadata.unfurl = withUnfurlWarning(file.metadata.resourcePath, unfurl);
    return file;
  } catch (e) {
    return file;
  }
};

/**
 * Applies the persona metadata property
 * @param {String} extension
 * @param {Object} file
 */
const markdownPersonaPlugin = async (extension, file, { personas }) => {
  if (extension !== 'md') {
    return file;
  }
  // grab front matter from md file
  const data = matter(file.content, { delims: '---' });
  const frontmatter = data.data;
  // is front matter personas type valid?
  if (frontmatter.personas && TypeCheck.isArrayOf(String, frontmatter.personas)) {
    file.metadata.personas = getClosestPersona(frontmatter.personas, personas);
  } else if (frontmatter.persona && TypeCheck.isString(frontmatter.persona)) {
    file.metadata.personas = getClosestPersona([frontmatter.persona], personas);
    // is there a global persona type this file can inherit?
  } else if (file.metadata.globalPersonas) {
    file.metadata.personas = getClosestPersona(file.metadata.globalPersonas, personas);
  } else {
    file.metadata.personas = [];
  }
  return file;
};

/**
 * sets resource path to be path to file in repo if resource type is repo
 * @param {String} extension
 * @param {Object} file
 * @returns {Object} the modified file
 */
// returns a promise only because the .use() method in file transformer expects one
// this fileTransformer will be refactored to allow sync and async functions to run
// serially at another time
const repositoryResourcePathPlugin = async (extension, file) => {
  if (file.metadata.resourceType === RESOURCE_TYPES.REPOSITORIES) {
    file.metadata.resourcePath = file.metadata.originalResourceLocation;
  }
  return file;
};

/**
 * creates the slug metadata property which is used by the pagePathPlugin
 * @param {String} extension
 * @param {Object} file
 */
const markdownSlugPlugin = (extension, file) => {
  if (extension === 'md') {
    // parse front matter
    const data = matter(file.content, { delimiters: '---' });
    const frontmatter = data.data;
    let slug = frontmatter.slug || frontmatter.title;
    slug = slugify(slug);
    let topicTitle = file.metadata.sourceName; //Get the name of the topic
    // get the current resource for the store if it exists
    const currentResource = slugStore.get(topicTitle + slug);
    try {
      // if there is a conflict, slugstore has been configd to throw
      slugStore.checkConflict(topicTitle + slug); //Check by topic and slug
    } catch (e) {
      // throwing allows for a more detailed message.
      const produceSummary = metadata =>
        `Source: ${metadata.sourceName}, fileName: ${metadata.fileName}, title: ${
          metadata.resourceTitle
        }`;

      const currentSummary = produceSummary(currentResource);
      const conflictingSummary = produceSummary(file.metadata);
      const warning = siphonMessenger.markdownSlugConflict(
        slug,
        conflictingSummary,
        currentSummary,
      );

      // eslint-disable-next-line no-console
      console.error(warning);
      // eslint-disable-next-line no-console
      console.error(e);
    }
    // continue to set new slug in store
    slugStore.set(topicTitle + slug, file.metadata);
    file.metadata.slug = slug;
  }
  return file;
};

module.exports = {
  markdownFrontmatterPlugin,
  markdownUnfurlPlugin,
  markDownUnfurlImagePlugin,
  pagePathPlugin,
  markdownResourceTypePlugin,
  externalLinkUnfurlPlugin,
  markdownPersonaPlugin,
  repositoryResourcePathPlugin,
  markdownSlugPlugin,
};
