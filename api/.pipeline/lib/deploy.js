'use strict';
const { OpenShiftClientX } = require('@bcgov/pipeline-cli');
const path = require('path');
const ENVS = {
  TEST: 'test',
  PROD: 'prod',
  DEV: 'dev',
};

/**
 * custom params based on our github flow like environments 
 * a new dev instance is deployed from a pr and subsequently promoted to test/prod
 * @param {String} env 
 * @param {String} pr 
 */
const getParamsByEnv = (env, pr) => {
  const params = {
    SSO_BASE_URL_VALUE: 'https://sso.pathfinder.gov.bc.ca',
    SSO_CLIENT_ID_VALUE: 'devhub-api',
    SSO_REALM_NAME_VALUE: 'devhub',
    CORS_ORIGIN: 'https://developer.gov.bc.ca',
    CORS_PATTERN: 'https:\/\/devhub-static-dev-[0-9]+-devhub-dev\.pathfinder\.gov\.bc\.ca',
  };
  switch (env) {
    case ENVS.PROD:
      return {...params,VERSION: 'prod', CPU_REQUEST: '100m', CPU_LIMIT: '150m', MEMORY_REQUEST: '75Mi', MEMORY_LIMIT: '125Mi'};
    case ENVS.TEST:
      return {
        ...params,
        VERSION: 'test',
        SSO_BASE_URL_VALUE: 'https://sso-test.pathfinder.gov.bc.ca',
        CORS_ORIGIN: 'https://devhub-static-test-devhub-test.pathfinder.gov.bc.ca/',
      };
    case ENVS.DEV:
      return {
        ...params,
        SSO_BASE_URL_VALUE: 'https://sso-dev.pathfinder.gov.bc.ca',
        SSO_CLIENT_ID_VALUE: `devhub-api-${pr}`,
      };
    default:
      return {
        ...params,
        SSO_BASE_URL_VALUE: 'https://sso-dev.pathfinder.gov.bc.ca',
        SSO_CLIENT_ID_VALUE: `devhub-api-${pr}`,
      };
  }
};


module.exports = (settings) => {
  const phases = settings.phases;
  const options = settings.options;
  const phase = options.env;
  const changeId = phases[phase].changeId;
  const oc = new OpenShiftClientX(Object.assign({ namespace: phases[phase].namespace }, options));

  const templatesLocalBaseUrl = oc.toFileUrl(path.resolve(__dirname, '../../openshift'));
  var objects = [];
  // The deployment of your cool app goes here ▼▼▼
  objects = objects.concat(
    oc.processDeploymentTemplate(`${templatesLocalBaseUrl}/dc.yaml`, {
      param: {
        NAME: phases[phase].name,
        SUFFIX: phases[phase].suffix,
        VERSION: phases[phase].version,
        ...getParamsByEnv(phase, changeId),
      },
    }),
  );

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
