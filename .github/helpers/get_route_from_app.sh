#!/bin/bash

# returns the host name from a route
# environment variables
# INFRA_NAME
# SUFFIX
# NAMESPACE

# usage get_route_from_app.sh

_ROUTE=$(oc -n $NAMESPACE get route/$INFRA_NAME$SUFFIX -o json)
_HOST=$(echo $_ROUTE | jq '.spec.host')
# remove leading and trailing quotes
_HOST="${HOST%\"}"
_HOST="${HOST#\"}"
echo $_HOST