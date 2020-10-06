'use strict';
const options = require('pipeline-cli').Util.parseArguments();
const changeId = options.pr; //aka pull-request
const version = '1.0.0';
const name = 'jenkins';

const phases = {
  build: {
    namespace: 'pltfrm-tools',
    name: `${name}`,
    phase: 'build',
    changeId: changeId,
    suffix: `-build-${changeId}`,
    instance: `${name}-build-${changeId}`,
    version: `${version}-${changeId}`,
    tag: `aro-latest`,
  },
  dev: {
    namespace: 'pltfrm-tools',
    name: `${name}`,
    phase: 'dev',
    changeId: changeId,
    suffix: `-dev-${changeId}`,
    instance: `${name}-dev-${changeId}`,
    version: `${version}-${changeId}`,
    tag: `aro-latest`,
  },
  test: {
    namespace: 'pltfrm-tools',
    name: `${name}`,
    phase: 'test',
    changeId: changeId,
    suffix: `-test`,
    instance: `${name}-test`,
    version: `${version}`,
    tag: `aro-latest`,
  },
  prod: {
    namespace: 'pltfrm-tools',
    name: `${name}`,
    phase: 'prod',
    changeId: changeId,
    suffix: `-prod`,
    instance: `${name}`,
    version: `${version}`,
    tag: `aro-latest`,
  },
};

// This callback forces the node process to exit as failure.
process.on('unhandledRejection', reason => {
  console.log(reason);
  process.exit(1);
});

module.exports = exports = { phases, options };
