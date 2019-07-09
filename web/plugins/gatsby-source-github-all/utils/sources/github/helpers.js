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
const { TypeCheck } = require('@bcgov/common-web-utils'); // eslint-disable-line
const { FILETYPES, MEDIATYPES, GITHUB_API_ENDPOINT } = require('../../constants');
const { Base64 } = require('js-base64'); // eslint-disable-line

/**
 * checks if the sourceProperties that are passed in are for siphoning
 * a repository
 * @param {Object} sourceProperties
 * @returns {Boolean}
 */
const isConfigForFetchingRepo = sourceProperties =>
  Object.prototype.hasOwnProperty.call(sourceProperties, 'repo') &&
  Object.prototype.hasOwnProperty.call(sourceProperties, 'owner');

/**
 * checks if the sourceProperties that are passed in are for siphoning
 * a singular file
 * @param {Object} sourceProperties
 * @returns {Boolean}
 */
const isConfigForFetchingAFile = sourceProperties =>
  Object.prototype.hasOwnProperty.call(sourceProperties, 'file') &&
  isConfigForFetchingRepo(sourceProperties);

/**
 * checks if the sourceProperties that are passed in are for siphoning
 * a list of files
 * @param {Object} sourceProperties
 * @returns {Boolean}
 */
const isConfigForFetchingFiles = sourceProperties =>
  Object.prototype.hasOwnProperty.call(sourceProperties, 'files') &&
  isConfigForFetchingRepo(sourceProperties);

/**
 * creates the GITHUB v3 contents api endpoint for a file
 * @param {String} repo
 * @param {String} owner
 * @param {String} path
 * @param {String} branch
 */
const createFetchFileRoute = (repo, owner, path, branch = '') => {
  const ref = branch === '' ? '' : `?ref=${branch}`;
  return `${GITHUB_API_ENDPOINT}/repos/${owner}/${repo}/contents/${path}${ref}`;
};

/**
 * returns extension of a file name
 * can handle linux type files (which require no extension)
 * @param {String} name
 * @returns {String} 'readme.md' => md, '.gitignore' => ''
 */
const getExtensionFromName = name =>
  name.slice((Math.max(0, name.lastIndexOf('.')) || Infinity) + 1);
/**
 *
 * @param {String} name
 * @returns name without extension
 * .gitignore => .gitignore, readme.md => readme
 */
const getNameWithoutExtension = name => {
  const ext = getExtensionFromName(name);
  if (ext !== '') {
    const re = new RegExp(`.${ext}$`);
    return name.replace(re, '');
  }
  return name;
};
/** returns the name of the file type by its extension
 * if it is an extensionless file, returns ''
 * @param {String} fileName
 * @returns {String} 'the more verbose name'.. 'md' => 'Markdown'
 */

const getNameOfExtensionVerbose = fileName => {
  const ext = getExtensionFromName(fileName);
  return FILETYPES[ext] ? FILETYPES[ext] : '';
};
/**
 * returns media type from extension
 * @param {String} extension
 */
const getMediaTypeByExtension = extension => (MEDIATYPES[extension] ? MEDIATYPES[extension] : '');

/**
 * filters an array of github graphql entries by their extensions
 * the filtering compares the object.name property with a regex test
 * @param {Array} entries
 * @param {Array} extensions (defaults to [.md])
 */
const filterFilesByExtensions = (entries, extensions = ['.md']) => {
  // ensure entries is an array of objects
  if (!TypeCheck.isArray(entries) || !entries.every(TypeCheck.isObject)) {
    throw new Error('entries are invalid');
  }

  if (!TypeCheck.isArray(extensions) || !extensions.every(TypeCheck.isString)) {
    throw new Error('extensions must be an array of strings');
  }
  // ensure extensions are of correct pattern
  if (!extensions.every(ext => /\.\w+$/.test(ext))) {
    throw new Error('extensions must have shape /\\.w+$/');
  }
  // convert extensions into a regex expression
  const re = new RegExp(`(${extensions.join('|')})$`);
  // would have shape like /(.md|.txt)$/
  // filter entries
  return entries.filter(entry => re.test(entry.path));
};

/**
 * filters files by the context directories from source
 * @param {Array} files the files
 * @param {Object} contextDir a path or array of paths to get files in a repo
 */
const filterFilesByContext = (files, contextDir) => {
  const contextDirArray = TypeCheck.isArray(contextDir) ? contextDir : new Array(contextDir);
  // Use relative paths to root:
  const targetPaths = contextDirArray.map(dir => {
    return dir.charAt(0) === '/' ? dir.substring(1) : dir;
  });
  // now only return files in the target context dir array
  const contextFiles = files.filter(file => {
    return targetPaths.some(path => file.path.indexOf(path) === 0);
  });
  return contextFiles;
};

/**
 * filters out directories from array of github graph ql entries
 * directories have type of 'tree'
 * @param {Array} entries
 */
const filterFilesFromDirectories = entries => {
  // ensure entries is an array of objects
  if (!TypeCheck.isArray(entries) || !entries.every(TypeCheck.isObject)) {
    throw new Error('entries are invalid');
  }
  // only tree type entries that don't start with a . (ignore hidden folders)
  return entries.filter(entry => entry.type === 'blob');
};

/**
 * applies base meta data to file which is used to create a siphon node
 * @param {Object} file // the github file object
 * @param {Array} labels // any labels passed in from registry item.attributes.labels
 * @param {String} owner // the repo owner
 * @param {String} repo // the name of the repository
 * @param {String} sourceName // the 'name' given to the source
 * @param {String} sourceURL // the path to the source (ie github url)
 * @param {String} globalResourceType // the global resource type assigned frmo the registry item.resourceType
 * @param {String} originalResourceLocation // the original path to the resource (ie path to file in repository)
 * @param {Array} globalPersonas // the global personas assigned from the regsitry item.attributes.personas
 * @param {Object} collection // the collection details including props like collection.type, collection.name etc
 * @param {Object} sourceProperties // the source properties inherited by the file describing what arguments were used to
 * obtain the file
 */
const applyBaseMetadata = (
  file,
  labels,
  owner,
  repo,
  sourceName,
  sourceURL,
  sourceType,
  globalResourceType,
  originalResourceLocation,
  globalPersonas,
  collection,
  sourceProperties,
  id,
) => {
  const extension = getExtensionFromName(file.name);
  return {
    ...file,
    content: Base64.decode(file.content),
    metadata: {
      ...file.___metadata,
      labels,
      sourceName,
      source: repo,
      owner,
      name: getNameWithoutExtension(file.name),
      fileType: getNameOfExtensionVerbose(file.name),
      fileName: file.name,
      mediaType: getMediaTypeByExtension(extension),
      extension,
      sourceURL,
      sourceType,
      globalResourceType,
      originalResourceLocation,
      globalPersonas,
      collection,
      sourceProperties,
      id,
    },
  };
};

module.exports = {
  isConfigForFetchingAFile,
  isConfigForFetchingFiles,
  isConfigForFetchingRepo,
  createFetchFileRoute,
  getExtensionFromName,
  getNameWithoutExtension,
  getNameOfExtensionVerbose,
  getMediaTypeByExtension,
  filterFilesByContext,
  filterFilesByExtensions,
  filterFilesFromDirectories,
  applyBaseMetadata,
};
