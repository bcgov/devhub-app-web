'use strict';
const { OpenShiftClientX, OpenShiftClient } = require('@bcgov/pipeline-cli');
const path = require('path');

module.exports = async settings => {
  const phases = settings.phases;
  const options = settings.options;
  const ocX = new OpenShiftClientX(Object.assign({ namespace: phases.build.namespace }, options));
  const phase = 'prod';
  let objects = [];
  const templatesLocalBaseUrl = ocX.toFileUrl(path.resolve(__dirname, '../../openshift/templates'));

  // The building of your cool app goes here ▼▼▼
  objects = objects.concat(
    ocX.processDeploymentTemplate(`${templatesLocalBaseUrl}/devhub-previewer.bc.yaml`, {
      param: {
        NAME: phases[phase].name,
        VERSION: phases[phase].tag,
        SOURCE_REPOSITORY_URL: ocX.git.http_url,
        SOURCE_REPOSITORY_REF: ocX.git.ref,
        DOCKER_IMAGE: 'registry.hub.docker.com/bcgovimages/devhub-previewer:latest',
        DOCKERHUB_SECRET: 'dockerhub',
      },
    }),
  );

  objects = ocX.applyRecommendedLabels(
    objects,
    phases[phase].name,
    phase,
    phases[phase].changeId,
    phases[phase].instance,
  );
  const oc = new OpenShiftClient(Object.assign({ namespace: phases.build.namespace }, options));
  // using parent OpenshiftClient Instance since its base methods do not validate objects
  oc.apply(objects);
  console.log('building previewer');
  oc.startBuild(objects);
};
