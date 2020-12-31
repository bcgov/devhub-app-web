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
const fetch = require('node-fetch');
const { GITHUB_API_ENDPOINT } = require('../../constants');

const fetchRepo = async (repo, owner, token) => {
  const endPoint = `${GITHUB_API_ENDPOINT}/repos/${owner}/${repo}`;
  try {
    const result = await fetch(endPoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await result.json();
    return result.ok ? data : {};
  } catch (e) {
    return {};
  }
};

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
 * @param {String} path
 * @param {String} token
 * @param {Object} boundProperties and object properties you want to bind to returned json
 */
const fetchFile = async (path, token, boundProperties) => {
  try {
    const result = await fetch(path, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-GitHub-Media-Type': 'Accept: application/vnd.github.v3.raw+json',
      },
    });
    const data = await result.json();
    if (result.ok) return { ...data, ___metadata: { ...boundProperties } };
    return undefined;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  fetchRepo,
  fetchFile,
  fetchGithubTree,
};
