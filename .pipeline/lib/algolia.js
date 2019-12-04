'use strict';
require('dotenv').config();
const { cloneIndexTo } = require('../utils');

module.exports = async settings => {
  const { env, suffix } = settings.options;

  return await cloneIndexTo(`Devhub-Algolia-${suffix}`, `Devhub-Algolia-${env}`);
};
