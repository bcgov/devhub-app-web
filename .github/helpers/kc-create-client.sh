#!/bin/bash

# Reference:
# https://www.keycloak.org/docs-api/3.3/rest-api/#_identity_providers_resource
# dependancies
# - jq
# environment variables
# NAMESPACE <string>
# KC_URL <string>
# KC_CLIENT_ID <string>
# KC_CLIENT_SECRET <string>
# REDIRECT_URI <string>
set -Eeuo pipefail
# set -x

if [ "$1" == "" ]; then
    echo "Skip this step in test or prod enviroments"
    exit 0
fi

# get sso variables:
KEYCLOAK_URL=https://dev.oidc.gov.bc.ca
REALM_NAME=devhub
PR_NUMBER="$1"
REDIRECT_URI="$2"

echo "Request to $KEYCLOAK_URL"

# get auth token:
KEYCLOAK_ACCESS_TOKEN=$(curl -sX POST -u "$KEYCLOAK_CLIENT_ID:$KEYCLOAK_CLIENT_SECRET" "$KEYCLOAK_URL/auth/realms/$REALM_NAME/protocol/openid-connect/token" -H "Content-Type: application/x-www-form-urlencoded" -d 'grant_type=client_credentials' | jq -r '.access_token')


 _curl(){
     curl -H "Authorization: Bearer $KEYCLOAK_ACCESS_TOKEN" "$@"
 }

# check if client exists:
CLIENT_ID=$(_curl -sX GET "$KEYCLOAK_URL/auth/admin/realms/$REALM_NAME/clients" -H "Accept: application/json" | jq -r --arg CLIENT "devhub-web-$PR_NUMBER" '.[] | select(.clientId==$CLIENT) | .id' || '') || 

# Create client:
if [ "${CLIENT_ID}" == "" ]; then
    echo "Creating 'devhub-web-$PR_NUMBER' client..."
    cat openshift/keycloak-scripts/new-client.json | sed -e "s|#{PR}|${PR_NUMBER}|g" | \
    sed -e "s|#{REDIRECT_URI}|${REDIRECT_URI}|g" | \
    _curl -sX POST -d '@-' -H 'Content-Type: application/json' "$KEYCLOAK_URL/auth/admin/realms/$REALM_NAME/clients"
fi

# return the client-id:
echo "devhub-web-$PR_NUMBER"
