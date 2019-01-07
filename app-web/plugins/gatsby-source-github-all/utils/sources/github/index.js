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
const chalk = require('chalk'); // eslint-disable-line
const { TypeCheck } = require('@bcgov/common-web-utils'); // eslint-disable-line
const { Base64 } = require('js-base64'); // eslint-disable-line
const fetch = require('node-fetch'); // eslint-disable-line
const ignore = require('ignore'); // eslint-disable-line
const transformer = require('./githubFileTransformer');
const { GITHUB_API_ENDPOINT, DEFUALT_IGNORES, GITHUB_SOURCE_SCHEMA } = require('../../constants');
const {
  isConfigForFetchingAFile,
  isConfigForFetchingFiles,
  isConfigForFetchingRepo,
  createFetchFileRoute,
  filterFiles,
  filterFilesFromDirectories,
  applyBaseMetadata,
} = require('./helpers');
const { validateSourceAgainstSchema } = require('../../helpers');

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
const validateSourceGithub = source => validateSourceAgainstSchema(source, GITHUB_SOURCE_SCHEMA);

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
  {
    sourceType,
    resourceType,
    name,
    sourceProperties,
    attributes: { labels, personas },
    collection,
  },
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
        personas,
        collection,
        sourceProperties,
      ),
    )
    .map(async f => {
      try {
        return await transformer(f.metadata.extension, f).resolve();
      } catch (e) {
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
  getFilesFromRepo,
  fetchSourceGithub,
  fetchGithubTree,
  fetchFile,
  fetchIgnoreFile,
  filterFilesFromDirectories,
  validateSourceGithub,
};
