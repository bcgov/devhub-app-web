'use strict';
require('dotenv').config();
const { OpenShiftClientX } = require('@bcgov/pipeline-cli');
const path = require('path');
const { postRocketChatMessage } = require('../utils');
const { createDeployment, createDeploymentStatus } = require('@bcgov/gh-deploy');
const ENVS = {
  TEST: 'test',
  PROD: 'prod',
  DEV: 'dev',
};

// our nomenclature for environments is mapped to what github's nomenclature is to keep them
// separate and consistent
const githubEnvironmentMapping = {
  prod: 'production',
  dev: 'development',
  test: 'test',
};

const getParamsByEnv = (env, pr) => {
  const params = {
    SSO_BASE_URL_VALUE: 'https://sso.pathfinder.gov.bc.ca',
    SSO_CLIENT_ID_VALUE: 'devhub-web',
    SSO_REALM_NAME_VALUE: 'devhub',
    ALGOLIA_INDEX_NAME_SUFFIX: 'prod',
    // for the time being we only have a dev instance, this will change as the api is developed
    SEARCHGATE_API_URL: 'https://searchgate.pathfinder.gov.bc.ca/',
    DEVHUB_API_URL: 'https://devhub-api-prod-devhub-prod.pathfinder.gov.bc.ca',
  };
  switch (env) {
    case ENVS.PROD:
      return {...params, CPU_REQUEST: '100m', CPU_LIMIT: '150m', MEMORY_REQUEST: '75Mi', MEMORY_LIMIT: '125Mi'};
    case ENVS.TEST:
      return {
        ...params,
        SSO_BASE_URL_VALUE: 'https://sso-test.pathfinder.gov.bc.ca',
        ALGOLIA_INDEX_NAME_SUFFIX: 'test',
      };
    case ENVS.DEV:
      return {
        ...params,
        SSO_BASE_URL_VALUE: 'https://sso-dev.pathfinder.gov.bc.ca',
        SSO_CLIENT_ID_VALUE: `devhub-web-${pr}`,
        ALGOLIA_INDEX_NAME_SUFFIX: `-build-${pr}`,
      };
    default:
      return {
        ...params,
        SSO_BASE_URL_VALUE: 'https://sso-dev.pathfinder.gov.bc.ca',
        SSO_CLIENT_ID_VALUE: `devhub-web-${pr}`,
      };
  }
};

module.exports = async settings => {
  const phases = settings.phases;
  const options = settings.options;
  const phase = options.env;
  const changeId = phases[phase].changeId;
  const oc = new OpenShiftClientX(Object.assign({ namespace: phases[phase].namespace }, options));
  const templatesLocalBaseUrl = oc.toFileUrl(path.resolve(__dirname, '../../openshift/templates'));
  let objects = [];

  const chatUrl =
    process.env.CHAT_WEBHOOK_URL ||
    'https://chat.pathfinder.gov.bc.ca/hooks/ScLeYnDzyKN3hbBob/F84wsFWxmpkguyDN9ZQ8BAyHRrLT3c2yF6DPoNoFbnitqxES';
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

  const { repository, owner, ref } = options.git;
  // create a pending deployment
  const deployment = await createDeployment(
    {
      ref: ref,
      auto_merge: false,
      required_contexts: [], // create deployment even if status checks fail
      description: options.description,
      environment: githubEnvironmentMapping[phase],
      log_url: `https://devhub-static-dev-${changeId}-devhub-dev.pathfinder.gov.bc.ca`,
      environment_url: `https://devhub-static-dev-${changeId}-devhub-dev.pathfinder.gov.bc.ca`,
    },
    repository,
    owner,
    process.env.GITHUB_TOKEN,
  );

  // add pending status to deployment
  console.log('Creating pending deployment status');

  await createDeploymentStatus(
    { state: 'pending', deployment_id: deployment.data.id },
    repository,
    owner,
    process.env.GITHUB_TOKEN,
  );

  try {
    await oc.applyAndDeploy(objects, phases[phase].instance);
    // create successful deploy status
    console.log('Deployment succeeded');
    await createDeploymentStatus(
      { state: 'success', deployment_id: deployment.data.id },
      repository,
      owner,
      process.env.GITHUB_TOKEN,
    );
    if (ref === 'master') {
      await postRocketChatMessage(chatUrl, {
        icon_emoji: ':smile_cat:',
        text: `Scheduled deployment to Devhub Succeeded! Deployment ID: ${deployment.data.id}`,
      });
    }
  } catch (e) {
    // if deploy fails, create a failure status
    console.error('Deployment Failed');
    console.error(e);
    await createDeploymentStatus(
      { state: 'failure', deployment_id: deployment.data.id },
      repository,
      owner,
      process.env.GITHUB_TOKEN,
    );
    if (ref === 'master') {
      postRocketChatMessage(chatUrl, {
        icon_emoji: ':crying_cat_face:',
        text: 'Scheduled deployment to Devhub Failed :(',
      });
    }
    throw e;
  }
};
