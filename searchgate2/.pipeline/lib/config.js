'use strict';
const options = require('@bcgov/pipeline-cli').Util.parseArguments()
const changeId = options.pr //aka pull-request
const version = '1.0.0'
const name = 'searchgate'

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
        namespace: 'pltfrm-dev',
        name: `${name}`,
        phase: 'dev',
        changeId: changeId,
        suffix: `-dev-${changeId}`,
        instance: `${name}-dev-${changeId}`,
        version: `${version}-${changeId}`,
        tag: `dev-${version}-${changeId}`
    },
    test: {
        namespace: 'pltfrm-test',
        name: `${name}`,
        phase: 'test',
        changeId: changeId,
        suffix: `-test`,
        instance: `${name}-test`,
        version: `${version}`,
        tag: `test-${version}`,
        host: `${name}-test.apps.pathfinder.aro.devops.gov.bc.ca`
    },
    prod: {
        namespace: 'pltfrm-prod',
        name: `${name}`,
        phase: 'prod',
        changeId: changeId,
        suffix: `-prod`,
        instance: `${name}-prod`,
        version: `${version}`,
        tag: `prod-${version}`,
        host: `${name}.apps.pathfinder.aro.devops.gov.bc.ca`
    },
};

// This callback forces the node process to exit as failure.
process.on('unhandledRejection', (reason) => {
    console.log(reason);
    process.exit(1);
});

module.exports = exports = {phases, options};