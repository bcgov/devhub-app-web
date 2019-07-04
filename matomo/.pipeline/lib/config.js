'use strict';
const options= require('pipeline-cli').Util.parseArguments()
const changeId = options.pr //aka pull-request
const version = '1.0.0'
const name = 'matomo'

const phases = {
    build: {
        namespace: 'devhub-tools',
        name: `${name}`,
        phase: 'build',
        changeId: changeId,
        suffix: `-build-${changeId}`,
        instance: `${name}-build-${changeId}`,
        version: `${version}-${changeId}`,
        tag: `build-${version}-${changeId}`
    },
    dev: {
        namespace: 'devhub-tools',
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
        namespace: 'devhub-tools',
        name: `${name}`,
        phase: 'prod',
        changeId: changeId,
        suffix: `-prod`,
        instance: `${name}-prod`,
        version: `${version}`,
        tag: `prod-${version}`,
        host: 'matomo-devhub-prod.pathfinder.gov.bc.ca'
    },
};

// This callback forces the node process to exit as failure.
process.on('unhandledRejection', (reason) => {
  console.log(reason);
  process.exit(1);
});

module.exports = exports = {phases, options};
