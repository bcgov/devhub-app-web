'use strict';
const {OpenShiftClientX} = require('@bcgov/pipeline-cli')
const path = require('path');

module.exports = (settings) => {
    const phases = settings.phases
    const options = settings.options
    const oc = new OpenShiftClientX(Object.assign({'namespace': phases.build.namespace}, options));
    const phase = 'build'
    let objects = []
    const templatesLocalBaseUrl = oc.toFileUrl(path.resolve(__dirname, '../../openshift'))

    // The building of your cool app goes here ▼▼▼
    objects = objects.concat(oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/mariadb/mariadb-build.json`, {
        'param': {
            'NAME': phases[phase].name,
            'VERSION': phases[phase].tag
        }
    }));

    objects = objects.concat(oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/matomo-proxy/matomo-proxy-build.json`, {
        'param': {
            'NAME': phases[phase].name,
            'VERSION': phases[phase].tag
        }
    }));

    objects = objects.concat(oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/matomo/matomo-build.json`, {
        'param': {
            'NAME': phases[phase].name,
            'VERSION': phases[phase].tag
        }
    }));

    oc.applyRecommendedLabels(objects, phases[phase].name, phase, phases[phase].changeId, phases[phase].instance)
    oc.applyAndBuild(objects)
}
