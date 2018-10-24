#!/bin/bash

# Reference:
# https://www.keycloak.org/docs-api/3.3/rest-api/#_identity_providers_resource

set -Eeuo pipefail
#set -x

if [ "$PR_NUMBER" == "" ]; then
    echo "Skip this step in test or prod enviroments"
    exit 0
fi

# read variables
# source "setenv-$1.sh"

# get auth token:
export KEYCLOAK_ACCESS_TOKEN=$(curl -sX POST -u "$KEYCLOAK_CLIENT_ID:$KEYCLOAK_CLIENT_SECRET" "$KEYCLOAK_URL/auth/realms/$REALM_NAME/protocol/openid-connect/token" -H "Content-Type: application/x-www-form-urlencoded" -d 'grant_type=client_credentials' -d 'client_id=admin-cli'| jq -r '.access_token')

 _curl(){
     curl -H "Authorization: Bearer $KEYCLOAK_ACCESS_TOKEN" "$@"
 }

# check if client exists:
CLIENT_ID=$(_curl -sX GET "$KEYCLOAK_URL/auth/admin/realms/$REALM_NAME/clients" -H "Accept: application/json" | jq -r --arg CLIENT "devhub-web-$PR_NUMBER" '.[] | select(.clientId==$CLIENT) | .id')

echo "$CLIENT_ID"

if [ "${CLIENT_ID}" != "" ]; then
    echo "Delete 'devhub-web-$PR_NUMBER' client..."
    curl -sX DELETE -H "Accept: application/json" -H "Authorization: Bearer $KEYCLOAK_ACCESS_TOKEN" "$KEYCLOAK_URL/auth/admin/realms/$REALM_NAME/clients/${CLIENT_ID}"
fi

echo "DONE"