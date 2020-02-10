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
const algoliasearch = require('algoliasearch');

const postRocketChatMessage = (url, payload) =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });

const promisifiedCopyIndex = (src, dest) => {
  const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
  return new Promise((resolve, reject) => {
    client.copyIndex(src, dest, (err, content) => {
      if (err) reject(err);
      resolve(content);
    });
  });
};

const cloneIndexTo = (src, destination) => {
  return promisifiedCopyIndex(src, destination);
};

module.exports = { postRocketChatMessage, cloneIndexTo };
