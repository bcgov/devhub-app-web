'use strict';
const { OpenShiftClientX } = require('pipeline-cli');
const path = require('path');

const ENVS = {
  TEST: 'test',
  PROD: 'prod',
  DEV: 'dev',
};

const getParamsByEnv = (env, pr) => {
  const params = {
    SSO_BASE_URL_VALUE: 'https://sso.pathfinder.gov.bc.ca',
    SSO_CLIENT_ID_VALUE: 'devhub-web',
    SSO_REALM_NAME_VALUE: 'devhub',
    // for the time being we only have a dev instance, this will change as the api is developed
    SEARCHGATE_API_URL: 'https://searchgate.pathfinder.gov.bc.ca/',
  };
  switch (env) {
    case ENVS.PROD:
      return params;
    case ENVS.TEST:
      return { ...params, SSO_BASE_URL_VALUE: 'https://sso-test.pathfinder.gov.bc.ca' };
    case ENVS.DEV:
      return {
        ...params,
        SSO_BASE_URL_VALUE: 'https://sso-dev.pathfinder.gov.bc.ca',
        SSO_CLIENT_ID_VALUE: `devhub-web-${pr}`,
      };
    default:
      return {
        ...params,
        SSO_BASE_URL_VALUE: 'https://sso-dev.pathfinder.gov.bc.ca',
        SSO_CLIENT_ID_VALUE: `devhub-web-${pr}`,
      };
  }
};

module.exports = settings => {
  const phases = settings.phases;
  const options = settings.options;
  const phase = options.env;
  const changeId = phases[phase].changeId;
  const oc = new OpenShiftClientX(Object.assign({ namespace: phases[phase].namespace }, options));
  const templatesLocalBaseUrl = oc.toFileUrl(path.resolve(__dirname, '../../openshift/templates'));
  let objects = [];

  // The deployment of your cool app goes here ▼▼▼
  objects = oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/dc.yaml`, {
    param: {
      NAME: phases[phase].name,
      SUFFIX: phases[phase].suffix,
      VERSION: phases[phase].tag,
      CADDY_VOLUME_NAME: 'web-caddy-config',
      ...getParamsByEnv(phase, changeId),
    },
  });
  // if you want to add more objects from other templates than contact them to objects
  // objects should be a flat array
  oc.applyRecommendedLabels(
    objects,
    phases[phase].name,
    phase,
    `${changeId}`,
    phases[phase].instance,
  );
  oc.importImageStreams(objects, phases[phase].tag, phases.build.namespace, phases.build.tag);
  oc.applyAndDeploy(objects, phases[phase].instance);
};
