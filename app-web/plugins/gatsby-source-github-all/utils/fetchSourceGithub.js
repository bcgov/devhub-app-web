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
  GITHUB_SOURCE_SCHEMA,
  PERSONAS_LIST,
} = require('./constants');
const chalk = require('chalk'); // eslint-disable-line
const { TypeCheck } = require('@bcgov/common-web-utils'); // eslint-disable-line
const { Base64 } = require('js-base64'); // eslint-disable-line
const fetch = require('node-fetch'); // eslint-disable-line
const ignore = require('ignore'); // eslint-disable-line
const { fileTransformer } = require('./transformer');
const {
  markdownFrontmatterPlugin,
  pagePathPlugin,
  markdownUnfurlPlugin,
  markdownResourceTypePlugin,
  externalLinkUnfurlPlugin,
  markdownPersonaPlugin,
  repositoryResourcePathPlugin,
} = require('./plugins');
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
 * Using the recursion param, this
 * function attempts to retrieve all directories/files from a repo
 * there is a limit on how deep it can go down a tree
 * as per https://developer.github.com/v3/git/trees/#get-a-tree-recursively
 * @param {String} repo
 * @param {String} owner
 * @param {String} token
 */
const fetchGithubTree = async (repo, owner, token, branch = 'master') => {
  const endPoint = `${GITHUB_API_ENDPOINT}/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
  try {
    const result = await fetch(endPoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await result.json();
    return data;
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
const fetchFile = async (repo, owner, path, token, branch = '') => {
  try {
    const ref = branch === '' ? '' : `?ref=${branch}`;
    const result = await fetch(
      `${GITHUB_API_ENDPOINT}/repos/${owner}/${repo}/contents/${path}${ref}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'X-GitHub-Media-Type': 'Accept: application/vnd.github.v3.raw+json',
        },
      },
    );
    const data = await result.json();
    if (result.ok) return data;
    return undefined;
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
const fetchIgnoreFile = async (repo, owner, token, branch) => {
  const ignoreFile = await fetchFile(repo, owner, '.devhubignore', token, branch);
  return ignoreFile ? Base64.decode(ignoreFile.content).split('\n') : [];
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
 * applies base meta data to file
 * @param {Object} file
 * @param {Array} labels
 * @param {String} owner
 * @param {String} source
 * @param {String} sourceName
 * @param {String} sourceURL
 * @param {String} resourceType
 */
const applyBaseMetadata = (
  file,
  labels,
  owner,
  source,
  sourceName,
  sourceURL,
  sourceType,
  globalResourceType,
  originalResourceLocation,
  globalPersona,
  collection,
) => {
  const extension = getExtensionFromName(file.name);
  return {
    ...file,
    content: Base64.decode(file.content),
    metadata: {
      labels,
      sourceName,
      source,
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
      globalPersona,
      collection,
    },
  };
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
 * filters files by processable extensions as well as the devhubignores
 * @param {Array} files the files
 * @param {Object} ignoreObj the ignore module object
 * @param {Object} contextDir a path or array of paths for get files in a repo
 */
const filterFiles = (files, ignoreObj, contextDir) => {
  // filter out files that are not in the context path
  const fileInContext = contextDir ? filterFilesByContext(files, contextDir) : files;
  // filter out files that aren't markdown
  const filteredFiles = filterFilesByExtensions(fileInContext, PROCESSABLE_EXTENSIONS);
  // filter out files that are apart of ignore
  const filesToFetch = filteredFiles.filter(file => !ignoreObj.ignores(file.path));
  return filesToFetch;
};

/**
 * returns a flattened array of all files in a repository
 * accomplished by fetching the github tree for a repo and filter files
 * to be fetched by a configuration. Fetch the filtered files and
 * append metadata before returning
 * @param {Object} repo the repo data (comes from the registry)
 * is deconstructed into its components
 * {String} repo.repo name of repository
 * {String} repo.url path to repository
 * {String} repo.owner owner of repository
 * {String} repo.name used as a 'pretty' name for the repository (also considered the source)
 * {String} repo.branch branch to fetch tree/files from, when undefined this defaults to master
 * {Object} repo.attributes extra attributes to bind as metadata to files
 * @param {String} token
 * @returns {Array} The array of files
 */
// eslint-disable-next-line
const getFilesFromRepo = async (
  {
    sourceType,
    resourceType,
    name,
    sourceProperties: { repo, url, owner, branch, context },
    attributes: { labels, persona },
    collection,
  },
  token,
) => {
  try {
    // ignore filtering
    const ig = ignore().add(DEFUALT_IGNORES);
    // create graphql string for finding all files in a directory
    const data = await fetchGithubTree(repo, owner, token, branch);
    // filter out files by extensions
    if (!data.tree) return [];
    let files = filterFilesFromDirectories(data.tree);

    // fetch ignore file if exists
    const repoIgnores = await fetchIgnoreFile(repo, owner, token, branch);
    // add repo ignores to ignore object
    ig.add(repoIgnores);
    // pass files to filter routine with ignore object and specified context paths
    const filesToFetch = filterFiles(files, ig, context);
    // retrieve contents for each file
    const filesWithContents = filesToFetch.map(file =>
      fetchFile(repo, owner, file.path, token, branch),
    );
    const filesResponse = await Promise.all(filesWithContents);
    // for some reason the accept header is not returning with raw content so we will decode
    // the default base 64 encoded content
    // also adding some additional params
    const processedFiles = filesResponse
      .filter(f => f !== undefined) // filter out any files that weren't fetched
      .map(f =>
        applyBaseMetadata(
          f,
          labels,
          owner,
          repo,
          name,
          url,
          sourceType,
          resourceType,
          f.html_url,
          persona,
          collection,
        ),
      )
      .map(async f => {
        const ft = fileTransformer(f.metadata.extension, f);
        try {
          return await ft
            .use(markdownFrontmatterPlugin)
            .use(pagePathPlugin)
            .use(markdownUnfurlPlugin)
            .use(markdownResourceTypePlugin)
            .use(externalLinkUnfurlPlugin)
            .use(markdownPersonaPlugin, { personas: PERSONAS_LIST })
            .use(repositoryResourcePathPlugin)
            .resolve();
        } catch (e) {
          console.error(chalk.yellow(e.message));
          // return undefined and skip file
          // at this point we could apply a hook to post a gh issue if needed
          return undefined;
        }
      });
    const postProcessedFiles = await Promise.all(processedFiles);
    // any promises that return undefined are filtered out
    return postProcessedFiles.filter(f => f !== undefined);
  } catch (e) {
    console.error(e);
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
    // post issue for repo if possible
    return [];
  }
};

const validateSourceGithub = source => {
  return Object.keys(GITHUB_SOURCE_SCHEMA).every(key => {
    const schemaItem = GITHUB_SOURCE_SCHEMA[key];
    return (
      schemaItem.required &&
      Object.prototype.hasOwnProperty.call(source.sourceProperties, key) &&
      TypeCheck.isA(schemaItem.type, source.sourceProperties[key])
    );
  });
};

module.exports = {
  getFilesFromRepo,
  getExtensionFromName,
  getNameWithoutExtension,
  getNameOfExtensionVerbose,
  fetchGithubTree,
  fetchFile,
  fetchIgnoreFile,
  filterFiles,
  filterFilesFromDirectories,
  filterFilesByExtensions,
  filterFilesByContext,
  applyBaseMetadata,
  validateSourceGithub,
};
