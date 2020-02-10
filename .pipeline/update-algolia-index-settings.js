'use strict';
const task = require('./lib/update-algolia-index-settings');
const settings = require('./lib/config.js');

task(settings);
