'use strict';
const task = require('./lib/build-previewer.js');
const settings = require('./lib/config.js');

task(Object.assign(settings, { phase: 'prod' }));
