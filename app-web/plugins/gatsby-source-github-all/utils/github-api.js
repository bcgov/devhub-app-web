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
const {
  GITHUB_API_ENDPOINT,
  FILETYPES,
  PROCESSABLE_EXTENSIONS,
  MEDIATYPES,
  DEFUALT_IGNORES,
} = require('./constants');
const chalk = require('chalk'); // eslint-disable-line
const { TypeCheck } = require('@bcgov/common-web-utils'); // eslint-disable-line
const { Base64 } = require('js-base64'); // eslint-disable-line
const fetch = require('node-fetch'); // eslint-disable-line
const ignore = require('ignore'); // eslint-disable-line
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
const getMediaTypeByExtension = extension =>
  MEDIATYPES[extension] ? MEDIATYPES[extension] : '';
/**
 * Using the recursion param, this
 * function attempts to retrieve all directories/files from a repo
 * there is a limit on how deep it can go down a tree
 * as per https://developer.github.com/v3/git/trees/#get-a-tree-recursively
 * @param {String} repo
 * @param {String} owner
 * @param {String} token
 */
const fetchGithubTree = async (repo, owner, token) => {
  try {
    const result = await fetch(
      `${GITHUB_API_ENDPOINT}/repos/${owner}/${repo}/git/trees/master?recursive=1`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await result.json();
  } catch (e) {
    throw e;
  }
};
/**
 * Fetches contents from file
 * note the media type header, it converts what would have been a
 * b64 encoded string of the file contents into either raw string data or json
 * @param {String} repo 
 * @param {String} owner 
 * @param {String} path 
 * @param {String} token 
 */
const fetchFile = async (repo, owner, path, token) => {
  try {
    const result = await fetch(
      `${GITHUB_API_ENDPOINT}/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'X-GitHub-Media-Type': 'Accept: application/vnd.github.v3.raw+json',
        },
      }
    );
    return await result.json();
  } catch (e) {
    throw e;
  }
};
/**
 * fetches .devhubignore file from a repo
 * @param { String } repo 
 * @param { String } owner 
 * @param { String } token 
 */
const fetchIgnoreFile = async (repo, owner, token) => {
  const ignoreFile = await fetchFile(repo, owner, '/.devhubignore', token);
  return ignoreFile.content
    ? Base64.decode(ignoreFile.content).split('\n')
    : [];
};
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
 * returns a flattened array of all files in a repository
 * by recursive graphql query to each directory in repo (accomplished via breadth first-search)
 * @param {String} repo 
 * @param {String} owner 
 * @param {String} name // name of repo as per registry 
 * @param {String} token 
 */
// eslint-disable-next-line
const getFilesFromRepo = async (repo, owner, name, token) => {
  try {
    // ignore filtering
    const ig = ignore().add(DEFUALT_IGNORES);
    // create graphql string for finding all files in a directory
    const data = await fetchGithubTree(repo, owner, token);
    // filter out files by extensions
    let filesToFetch = filterFilesFromDirectories(data.tree);
    // filter out files that aren't markdown
    filesToFetch = filterFilesByExtensions(
      filesToFetch,
      PROCESSABLE_EXTENSIONS
    );
    // fetch ignore file if exists
    const repoIgnores = await fetchIgnoreFile(repo, owner, token);
    ig.add(repoIgnores);
    // filter out files that are apart of ignore
    filesToFetch = filesToFetch.filter(file => !ig.ignores(file.path));
    // retrieve contents for each file
    const filesWithContents = filesToFetch.map(file =>
      fetchFile(repo, owner, file.path, token)
    );
    const filesResponse = await Promise.all(filesWithContents);
    // for some reason the accept header is not returning with raw content so we will decode
    // the default base 64 encoded content
    // also adding some additional params
    const files = filesResponse.map(f => {
      const ext = getExtensionFromName(f.name);
      return {
        ...f,
        content: Base64.decode(f.content),
        metadata: {
          sourceName: name,
          source: repo,
          owner,
          name: getNameWithoutExtension(f.name),
          fileType: getNameOfExtensionVerbose(f.name),
          fileName: f.name,
          mediaType: getMediaTypeByExtension(ext),
          extension: ext,
        },
      };
    });
    return files;
  } catch (e) {
    // eslint-disable-next-line
    console.error(chalk`
      {red.bold ERROR!! in Gatsby Source Github All} 

      unable to fetch files from repo ${repo}.

      Perhaps you should check spelling of repo parameters..

      {green.underline repo}: ${repo}
      {green.underline owner}: ${owner}

      {yellow if this doesn't resolve the issue either the api token is invalid
      or the build is failing to connect to the github api}
    `);
    throw e;
  }
};

module.exports = {
  getFilesFromRepo,
  getExtensionFromName,
  getNameWithoutExtension,
  getNameOfExtensionVerbose,
  fetchGithubTree,
  fetchFile,
  filterFilesFromDirectories,
  filterFilesByExtensions,
};
