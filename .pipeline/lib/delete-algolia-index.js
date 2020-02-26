'use strict';
require('dotenv').config();
const algoliasearch = require('algoliasearch');

module.exports = async settings => {
  const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
  const { suffix } = settings.options;
  const index = client.initIndex(`Devhub-Algolia-${suffix}`);

  console.log(`Deleting Algolia Index ${suffix}`);

  return await index.delete();
};
