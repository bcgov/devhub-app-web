'use strict';
const task = require('./lib/build.js');
const settings = require('./lib/config.js');
console.log(settings);
task(Object.assign(settings, { phase: 'build' }));
