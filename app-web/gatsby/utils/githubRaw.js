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
const { isRegistryJson } = require('./validators');
const flatten = require('lodash/flatten');

const getFilesFromRegistry = getNodes => {
  const nodes = getNodes();
  const sourceToTopicMap = {};
  // get RegistryJson nodes
  const registry = nodes.filter(isRegistryJson);

  // spit out all github sources from the registry while maintaining references to the
  // topics they belong too
  const gitsources = registry.reduce((sources, registryItem) => {
    const gitsources = registryItem.sourceProperties.sources.filter(s => s.sourceType === 'github');
    sources.push([gitsources, registryItem.name]);
    return sources;
  }, []);

  // resolve git sources into a list of uris
  // [[{source1, source2}], topic] => [[url1, url2], topic]
  const resolvedGitSources = gitsources.map(gs => {
    const [sources, topic] = gs;

    let urls = sources.map(source => {
      const {
        sourceProperties: { repo, owner, branch, file, files },
      } = source;
      const fileBranch = branch ? branch : 'master';
      // since sources can have many files we need to check to see what type of config they are using
      if (file) {
        return `https://github.com/${owner}/${repo}/blob/${fileBranch}/${file}`;
      } else if (files) {
        return files.map(f => {
          return `https://github.com/${owner}/${repo}/blob/${fileBranch}/${f}`;
        });
      }
      return [];
    });
    // flatten out all urls since a single source can produce many urls
    return [flatten(urls), topic];
  });
  // map out urls to their respective topics since this is 1 to many relationship
  // ends up with structure that is similar to this => {url1: [topicA, topicB]}
  resolvedGitSources.forEach(([urls, topic]) => {
    urls.forEach(u => {
      if (Object.prototype.hasOwnProperty.call(sourceToTopicMap, u)) {
        sourceToTopicMap[u].push(topic);
      } else {
        sourceToTopicMap[u] = [topic];
      }
    });
  });
  // convert sourceToTopicMap to an array in the expected structure for the github raw plugin
  // {url1: [topicA, topicB]} => [{url: url1, topics: [topicA, topicB]}]
  return Object.keys(sourceToTopicMap).map(url => ({ url, topics: sourceToTopicMap[url] }));
};

module.exports = { getFilesFromRegistry };
