'use strict';
const {OpenShiftClientX} = require('@bcgov/pipeline-cli')
const path = require('path');

module.exports = (settings)=>{
  const phases = settings.phases
  const options = settings.options
  const oc=new OpenShiftClientX(Object.assign({'namespace':phases.build.namespace}, options));
  const phase='build'
  let objects = []
  const templatesLocalBaseUrl =oc.toFileUrl(path.resolve(__dirname, '../../openshift'))

  // The building of your cool app goes here ▼▼▼
    objects = objects.concat(oc.processBuidTemplate(`${templatesLocalBaseUrl}/bc.yaml`, {
        'param': {
            'NAME': phases[phase].name,
            'VERSION': phases[phase].tag,
            'SOURCE_REPOSITORY_URL': oc.git.http_url,
            'SOURCE_REPOSITORY_REF': oc.git.ref
        }
    }));

  oc.applyRecommendedLabels(objects, phases[phase].name, phase, phases[phase].changeId, phases[phase].instance)
  oc.applyAndBuild(objects)
}