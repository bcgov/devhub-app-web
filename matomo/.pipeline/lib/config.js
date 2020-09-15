'use strict';
const options= require('@bcgov/pipeline-cli').Util.parseArguments()
const changeId = options.pr || options.suffix //aka pull-request
const version = '1.0.0'
const name = 'matomo'

const phases = {
    build: {
        namespace: 'pltfrm-tools',
        name: `${name}`,
        phase: 'build',
        changeId: changeId,
        suffix: `-build-${changeId}`,
        instance: `${name}-build-${changeId}`,
        version: `${version}-${changeId}`,
        tag: `build-${version}-${changeId}`
    },
    dev: {
        namespace: 'pltfrm-tools',
        name: `${name}`,
        phase: 'dev',
        changeId: changeId,
        suffix: `-dev-${changeId}`,
        instance: `${name}-dev-${changeId}`,
        version: `${version}-${changeId}`,
        tag: `dev-${version}-${changeId}`,
        host: `${name}-${changeId}.pathfinder.gov.bc.ca`
    },
    prod: {
        namespace: 'pltfrm-tools',
        name: `${name}`,
        phase: 'prod',
        changeId: changeId,
        suffix: `-prod`,
        instance: `${name}-prod`,
        version: `${version}`,
        tag: `prod-${version}`,
        host: ''
    },
};

// This callback forces the node process to exit as failure.
process.on('unhandledRejection', (reason) => {
  console.log(reason);
  process.exit(1);
});

module.exports = exports = {phases, options};
