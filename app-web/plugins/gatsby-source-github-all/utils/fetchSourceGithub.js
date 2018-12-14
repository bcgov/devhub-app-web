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
const fetchFile = async (path, token) => {
  try {
    const result = await fetch(path, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-GitHub-Media-Type': 'Accept: application/vnd.github.v3.raw+json',
      },
    });
    const data = await result.json();
    if (result.ok) return data;
    return undefined;
  } catch (e) {
    throw e;
  }
};

/**
 * returns array of fetch file promises
 * @param {Array} files array of github api contents api uri strings
 * @param {*} token github token
 */
const fetchFiles = (files, token) => {
  return files.map(f => fetchFile(f, token));
};
/**
 * fetches .devhubignore file from a repo
 * @param { String } repo
 * @param { String } owner
 * @param { String } token
 */
const fetchIgnoreFile = async (repo, owner, token, branch) => {
  const ignoreRoute = createFetchFileRoute(repo, owner, '.devhubignore', branch);
  const ignoreFile = await fetchFile(ignoreRoute, token);
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
 * returns the list of files to be fetched
 * @param {Object} repo the repo data (comes from the registry)
 * is deconstructed into its components
 * {String} repo.repo name of repository
 * {String} repo.owner owner of repository
 * {String} repo.name used as a 'pretty' name for the repository (also considered the source)
 * {String} repo.branch branch to fetch tree/files from, when undefined this defaults to master
 * {String} repo.context the context directory to work off of when filtering through the github tree
 * @param {String} token
 * @returns {Array} an array of Github Contents API v3 uri strings for the files
 */
const getFilesFromRepo = async ({ repo, owner, branch, context, ignores }, token) => {
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
    ig.add(repoIgnores);
    // if ignores was passed into source params add them into the ignores list
    if (ignores) {
      ig.add(ignores);
    }
    // pass files to filter routine with ignore object and specified context paths
    const filesToFetch = filterFiles(files, ig, context);
    return filesToFetch.map(f => createFetchFileRoute(repo, owner, f.path, branch));
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

/**
 * validates source properties against schema
 * @param {Object} source
 * @returns {Boolean}
 */
const validateSourceGithub = source => {
  return Object.keys(GITHUB_SOURCE_SCHEMA).every(key => {
    const schemaItem = GITHUB_SOURCE_SCHEMA[key];
    let isValid = true;

    if (schemaItem.required) {
      isValid =
        Object.prototype.hasOwnProperty.call(source.sourceProperties, key) &&
        TypeCheck.isA(schemaItem.type, source.sourceProperties[key]);
      // does this source property have it anyways?
    } else if (Object.prototype.hasOwnProperty.call(source.sourceProperties, key)) {
      isValid = TypeCheck.isA(schemaItem.type, source.sourceProperties[key]);
    }

    if (!isValid) {
      console.error(
        chalk`{red.bold \nError Validating Source type github} 

       Source failed on validation on source property {yellow.bold ${key}}
       received value {yellow.bold ${source.sourceProperties[key]}}`,
      );
    }

    return isValid;
  });
};

/**
 * returns a flattened array of github files from a repository
 * based on the configuration passed into the routine
 * the files have the siphon required meta data appended to it before being returned
 * append metadata before returning
 * @param {Object} source the source configuration (comes from the registry)
 * is deconstructed into its components
 * @param {String} token github api token
 * @returns {Array} The array of files
 */
const fetchSourceGithub = async (
  { sourceType, resourceType, name, sourceProperties, attributes: { labels, persona }, collection },
  token,
) => {
  const { repo, owner, branch, url } = sourceProperties;
  let filesToFetch = [];
  // how are we sourcing this?
  if (isConfigForFetchingAFile(sourceProperties)) {
    const { file } = sourceProperties;
    filesToFetch = [createFetchFileRoute(repo, owner, file, branch)];
  } else if (isConfigForFetchingFiles(sourceProperties)) {
    // map files list to get fetch file uris
    filesToFetch = sourceProperties.files.map(f => createFetchFileRoute(repo, owner, f, branch));
  } else if (isConfigForFetchingRepo(sourceProperties)) {
    // get files based on the github tree and other configs
    filesToFetch = await getFilesFromRepo(sourceProperties, token);
  }
  // actually fetch file contents and transform
  const filesWithContents = fetchFiles(filesToFetch, token);
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
};
module.exports = {
  createFetchFileRoute,
  getFilesFromRepo,
  fetchSourceGithub,
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
  isConfigForFetchingAFile,
  isConfigForFetchingRepo,
  isConfigForFetchingFiles,
  applyBaseMetadata,
  validateSourceGithub,
};
