#!/bin/bash

# Reference:
# https://www.keycloak.org/docs-api/3.3/rest-api/#_identity_providers_resource

set -Eeuo pipefail
#set -x

if [ "$1" == "" ]; then
    echo "Skip this step in test or prod enviroments"
    exit 0
fi

# install jq:
JQ=/tmp/jq
curl https://stedolan.github.io/jq/download/linux64/jq > $JQ && chmod +x $JQ
ls -la $JQ

# oc get secret for sso service account:
KEYCLOAK_CLIENT_ID=$(oc -n devhub-dev get secret/sso-dev-service-account --template={{.data.KEYCLOAK_CLIENT_ID}} | base64 --decode)
KEYCLOAK_CLIENT_SECRET=$(oc -n devhub-dev get secret/sso-dev-service-account --template={{.data.KEYCLOAK_CLIENT_SECRET}} | base64 --decode)

# get sso variables:
KEYCLOAK_URL=https://sso-dev.pathfinder.gov.bc.ca
REALM_NAME=devhub
PR_NUMBER="$1"

echo "Request to $KEYCLOAK_URL"

# get auth token:
KEYCLOAK_ACCESS_TOKEN=$(curl -sX POST -u "$KEYCLOAK_CLIENT_ID:$KEYCLOAK_CLIENT_SECRET" "$KEYCLOAK_URL/auth/realms/$REALM_NAME/protocol/openid-connect/token" -H "Content-Type: application/x-www-form-urlencoded" -d 'grant_type=client_credentials' -d 'client_id=admin-cli'| $JQ -r '.access_token')

 _curl(){
     curl -H "Authorization: Bearer $KEYCLOAK_ACCESS_TOKEN" "$@"
 }

# check if client exists:
CLIENT_ID=$(_curl -sX GET "$KEYCLOAK_URL/auth/admin/realms/$REALM_NAME/clients" -H "Accept: application/json" | $JQ -r --arg CLIENT "devhub-web-$PR_NUMBER" '.[] | select(.clientId==$CLIENT) | .id')

# Remove client:
if [ "${CLIENT_ID}" != "" ]; then
    echo "Delete 'devhub-web-$PR_NUMBER' client..."
    curl -sX DELETE -H "Accept: application/json" -H "Authorization: Bearer $KEYCLOAK_ACCESS_TOKEN" "$KEYCLOAK_URL/auth/admin/realms/$REALM_NAME/clients/${CLIENT_ID}"
fi

echo "DONE"
