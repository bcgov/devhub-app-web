'use strict';
require('dotenv').config();
const algoliasearch = require('algoliasearch');
const {
  setSettings,
  setSettingsArgs,
  synonyms,
  synonymsArgs,
} = require('../../algolia/index.json');

module.exports = async settings => {
  const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
  const { suffix } = settings.options;
  const indexName = `Devhub-Algolia-${suffix}`;
  const index = client.initIndex(indexName);

  console.log(`Updating Searchable Attributes for ${indexName}`);
  await index.setSettings(setSettings, setSettingsArgs);

  console.log(`Updating Synonyms for ${indexName}`);
  await index.saveSynonyms(synonyms, synonymsArgs);
};
