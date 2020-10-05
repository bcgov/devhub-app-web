'use strict';
const options = require('@bcgov/pipeline-cli').Util.parseArguments();
const changeId = options.pr; //aka pull-request
const version = '1.0.0';
const name = 'devhub-api';

const phases = {
  build: {
    namespace: 'pltfrm-tools',
    name,
    phase: 'build',
    changeId,
    suffix: `build-${changeId}`,
    instance: `${name}-build-${changeId}`,
    version: `${version}-${changeId}`,
    tag: `${version}-${changeId}`,
  },
  dev: {
    namespace: 'pltfrm-dev',
    name,
    phase: 'dev',
    changeId,
    suffix: `dev-${changeId}`,
    instance: `${name}-dev-${changeId}`,
    version: `dev-${version}-${changeId}`,
    tag: `dev-${version}-${changeId}`,
  },
  test: {
    namespace: 'pltfrm-test',
    name,
    phase: 'test',
    changeId,
    suffix: `test`,
    instance: `${name}-test`,
    version: `${version}`,
    tag: `test`,
  },
  prod: {
    namespace: 'pltfrm-prod',
    name,
    phase: 'prod',
    changeId,
    suffix: `prod`,
    instance: `${name}-prod`,
    version: `${version}`,
    tag: `prod`,
  },
};

// This callback forces the node process to exit as failure.
process.on('unhandledRejection', (reason) => {
  console.log(reason);
  process.exit(1);
});

module.exports = exports = { phases, options };
