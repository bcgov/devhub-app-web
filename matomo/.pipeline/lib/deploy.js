'use strict';
const {OpenShiftClientX} = require('@bcgov/pipeline-cli')
const path = require('path');

module.exports = (settings) => {
    const phases = settings.phases
    const options = settings.options
    const phase = options.env
    const changeId = phases[phase].changeId
    const oc = new OpenShiftClientX(Object.assign({'namespace': phases[phase].namespace}, options));
    const templatesLocalBaseUrl = oc.toFileUrl(path.resolve(__dirname, '../../openshift'))
    var objects = []

    // The deployment of your cool app goes here ▼▼▼
    objects = objects.concat(oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/matomo-db/matomo-db-deploy.json`, {
        'param': {
            'NAME': phases[phase].name,
            'SUFFIX': phases[phase].suffix,
            'VERSION': phases[phase].tag,
            'IMAGE_NAMESPACE': phases[phase].namespace,
            'PERSISTENT_VOLUME_SIZE': '10Gi'
        }
    }));

    objects = objects.concat(oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/matomo/matomo-deploy.json`, {
        'param': {
            'NAME': phases[phase].name,
            'SUFFIX': phases[phase].suffix,
            'VERSION': phases[phase].tag,
            'IMAGE_NAMESPACE': phases[phase].namespace,
            'MATOMO_URL': phases[phase].host
        }
    }));

    oc.applyRecommendedLabels(objects, phases[phase].name, phase, `${changeId}`, phases[phase].instance)
    oc.importImageStreams(objects, phases[phase].tag, phases.build.namespace, phases.build.tag)
    oc.applyAndDeploy(objects, phases[phase].instance)
}
