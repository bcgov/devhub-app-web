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
KEYCLOAK_ACCESS_TOKEN=$(curl --fail -sX POST -u "$KEYCLOAK_CLIENT_ID:$KEYCLOAK_CLIENT_SECRET" "$KEYCLOAK_URL/auth/realms/$REALM_NAME/protocol/openid-connect/token" -H "Content-Type: application/x-www-form-urlencoded" -d 'grant_type=client_credentials' | jq -r '.access_token')

 _curl(){
     curl -H "Authorization: Bearer $KEYCLOAK_ACCESS_TOKEN" "$@"
 }

# check if client exists:
CLIENT_ID=$(curl --fail -sX GET "$KEYCLOAK_URL/auth/admin/realms/$REALM_NAME/clients" -H "Accept: application/json" -H "Authorization: Bearer $KEYCLOAK_ACCESS_TOKEN" | jq -r --arg CLIENT "devhub-web-$PR_NUMBER" '.[] | select(.clientId==$CLIENT) | .id')
# Create client:
if [ "${CLIENT_ID}" == "" ]; then
    echo "Creating 'devhub-web-$PR_NUMBER' client..."
    payload=$(cat .github/helpers/new-client.json | sed -e "s|#{PR}|${PR_NUMBER}|g")

    echo $payload |  sed -e "s|#{REDIRECT_URI}|${REDIRECT_URI}|g" | \
   
    curl --fail -i -sX POST -d '@-' -H 'Content-Type: application/json' -H "Authorization: Bearer $KEYCLOAK_ACCESS_TOKEN" "$KEYCLOAK_URL/auth/admin/realms/$REALM_NAME/clients"
fi

# return the client-id:
echo "devhub-web-$PR_NUMBER"
