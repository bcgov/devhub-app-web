'use strict';
const { OpenShiftClientX } = require('@bcgov/pipeline-cli');
const path = require('path');

module.exports = settings => {
  const phases = settings.phases;
  const options = settings.options;
  const oc = new OpenShiftClientX(Object.assign({ namespace: phases.build.namespace }, options));
  const phase = 'build';
  let objects = [];
  const templatesLocalBaseUrl = oc.toFileUrl(path.resolve(__dirname, '../../openshift/templates'));

  // The building of your cool app goes here ▼▼▼
  objects = objects.concat(
    oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/bc.yaml`, {
      param: {
        NAME: phases[phase].name,
        SUFFIX: phases[phase].suffix,
        VERSION: phases[phase].tag,
        SOURCE_REPOSITORY_URL: oc.git.http_url,
        SOURCE_REPOSITORY_REF: oc.git.ref,
        DOCKER_IMAGE_DIRECTORY: 'docker-images/nodejs-base',
        MATOMO_URL: 'https://matomo-devhub-prod.pathfinder.gov.bc.ca',
        MATOMO_SITE_URL: 'https://developer.gov.bc.ca',
        MATOMO_SITE_ID: '1',
      },
    }),
  );

  oc.applyRecommendedLabels(
    objects,
    phases[phase].name,
    phase,
    phases[phase].changeId,
    phases[phase].instance,
  );
  oc.applyAndBuild(objects);
};
