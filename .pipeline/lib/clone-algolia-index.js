'use strict';
require('dotenv').config();
const { cloneIndexTo } = require('../utils');

module.exports = async settings => {
  const { env, suffix } = settings.options;
  const fromIndex = `Devhub-Algolia-${suffix}`;
  const toIndex = `Devhub-Algolia-${env}`;
  console.log(`Cloning Algolia Index from ${fromIndex} to ${toIndex}`);
  return await cloneIndexTo(fromIndex, toIndex);
};
