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

    // process deplyoment template using values provided from config
    objects = oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/dc.yaml`, {
        param: {
            NAME: phases[phase].name,
            SUFFIX: phases[phase].suffix,
            VERSION: phases[phase].tag,
            HOST: phases[phase].host ? phases[phase].host : '',
            ROCKETGATE_BASE_URL: 'https://rocketgate-prod-pltfrm-prod.apps.pathfinder.aro.devops.gov.bc.ca/',
            DOCUGATE_BASE_URL: 'https://docugate-prod-pltfrm-prod.apps.pathfinder.aro.devops.gov.bc.ca/',
        },
    });

    oc.applyRecommendedLabels(objects, phases[phase].name, phase, `${changeId}`, phases[phase].instance)
    oc.importImageStreams(objects, phases[phase].tag, phases.build.namespace, phases.build.tag)
    oc.applyAndDeploy(objects, phases[phase].instance)
}
