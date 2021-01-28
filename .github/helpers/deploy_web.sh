#!/bin/bash

# dependancies
# - oc

# environment variables
# DEPLOY_NAMESPACE
# IMAGE_NAMESPACE
# IMAGE_TAG
# SEARCHGATE_API_URL
# DEVHUB_API_URL
# GATSBY_MATOMO_URL
# GATSBY_MATOMO_SITE_URL
# GATSBY_MATOMO_SITE_ID
# SSO_DEV_URL
# SSO_CLIENT_ID
# SSO_REALM_NAME
# MATOMO_URL
# INFRA_NAME - the name given to infrastructure components
# SUFFIX - the suffix attached to the INFRA_NAME
# ALGOLIA_INDEX_NAME

## this is assumed to be run at the root of the project

oc process -f openshift/templates/web/dc.yaml -n $DEPLOY_NAMESPACE \
  -p NAME=$INFRA_NAME \
  -p IMAGE_NAMESPACE=$IMAGE_NAMESPACE \
  -p IMAGE_TAG="$IMAGE_TAG" \
  -p SUFFIX=$SUFFIX \
  -p SEARCHGATE_API_URL="$SEARCHGATE_API_URL" \
  -p SSO_BASE_URL="$SSO_BASE_URL" \
  -p DEVHUB_API_URL="$DEVHUB_API_URL" \
  -p SSO_CLIENT_ID="$SSO_CLIENT_ID" \
  -p SSO_REALM_NAME="$SSO_REALM_NAME" \
  -p ALGOLIA_INDEX_NAME="$ALGOLIA_INDEX_NAME" | \
  oc apply -n $DEPLOY_NAMESPACE -f -

oc -n $DEPLOY_NAMESPACE rollout latest dc/$INFRA_NAME$SUFFIX
echo "Deployment started"