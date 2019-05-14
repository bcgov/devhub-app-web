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
const transformer = require('./githubFileTransformer');
const { GITHUB_SOURCE_SCHEMA, SOURCE_TYPES } = require('../../constants');
const {
  isConfigForFetchingAFile,
  isConfigForFetchingFiles,
  createFetchFileRoute,
  filterFilesFromDirectories,
  applyBaseMetadata,
} = require('./helpers');
const { fetchFile, fetchGithubTree } = require('./api');
const { validateSourcePropertiesAgainstSchema } = require('../../helpers');

/**
 * returns array of fetch file promises
 * @param {Array} files array of github api contents api uri strings
 * @param {*} token github token
 */
const fetchFiles = (files, token) => {
  return files.map(f => fetchFile(f.path, token, f.metadata));
};

/**
 * validates source properties against schema
 * @param {Object} source
 * @returns {Boolean}
 */
const validateSourceGithub = source =>
  validateSourcePropertiesAgainstSchema(source, GITHUB_SOURCE_SCHEMA);

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
  { sourceType, resourceType, name, sourceProperties, attributes, collection, id },
  token,
) => {
  const { repo, owner, branch, url } = sourceProperties;

  const { labels, personas } = attributes ? attributes : { labels: null, personas: null };
  let filesToFetch = [];
  // how are we sourcing this?
  if (isConfigForFetchingAFile(sourceProperties)) {
    const { file } = sourceProperties;
    filesToFetch = [{ path: createFetchFileRoute(repo, owner, file, branch) }];
  } else if (isConfigForFetchingFiles(sourceProperties)) {
    // map files list to get fetch file uris
    filesToFetch = sourceProperties.files.map(f => ({
      path: createFetchFileRoute(repo, owner, f, branch),
    }));
  }

  // filesToFetch = filesToFetch.map((file, index) => assignPosToResourceBySource(file, index));
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
        { branch: 'master', ...sourceProperties }, // by default no branch means master, we are setting it explicitly so it exists in ql schema
        id,
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

/**
 * registry items that have the.files attribute need to be flatted to individual sources
 * so individual ids can be inferred
 */
const flattenGithubFilesToRegistryItems = ({
  sourceProperties: { repo, owner, files = [] },
  ...rest
}) =>
  files.map(file => {
    return {
      ...rest,
      ...SourceGithub({ repo, owner, file }),
    };
  });
/**
 * creates a github source item
 * @param {Object} sourceProperties
 * @param {String} sourceProperties.repo the repo
 * @param {String} sourceProperties.owner the repo owner
 * @param {String} sourceProperties.file the path to a file
 */
const SourceGithub = ({ repo, owner, file }) => ({
  sourceType: SOURCE_TYPES.GITHUB,
  sourceProperties: {
    repo,
    owner,
    file,
  },
});

module.exports = {
  fetchSourceGithub,
  fetchGithubTree,
  fetchFile,
  filterFilesFromDirectories,
  validateSourceGithub,
  SourceGithub,
  flattenGithubFilesToRegistryItems,
};
