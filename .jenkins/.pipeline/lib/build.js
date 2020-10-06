'use strict';
const { OpenShiftClientX } = require('pipeline-cli');
const path = require('path');

module.exports = settings => {
  const phases = settings.phases;
  const options = settings.options;
  const oc = new OpenShiftClientX(Object.assign({ namespace: phases.build.namespace }, options));
  const phase = 'build';
  var objects = [];

  const templatesLocalBaseUrl = oc.toFileUrl(path.resolve(__dirname, '../../openshift'));

  objects.push(
    ...oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/build-master.yaml`, {
      param: {
        NAME: phases[phase].name,
        SUFFIX: phases[phase].suffix,
        VERSION: phases[phase].tag,
        SOURCE_REPOSITORY_URL: 'https://github.com/patricksimonian/openshift-components/',
        SOURCE_REPOSITORY_REF: 'jenkins-basic/aro',
      },
    }),
  );

  objects.push(
    ...oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/build-slave.yaml`, {
      param: {
        NAME: phases[phase].name,
        SUFFIX: phases[phase].suffix,
        VERSION: phases[phase].tag,
        SOURCE_IMAGE_STREAM_TAG: `jenkins-basic:aro-latest`,
        SLAVE_NAME: 'main',
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
