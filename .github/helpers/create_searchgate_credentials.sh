#! /bin/bash
# variables
# GITHUB_TOKEN string
# NAMESPACE string

oc process -n $NAMESPACE -f openshift/templates/searchgate/secret-template.yaml -p GITHUB_TOKEN=$GITHUB_TOKEN | 
oc apply -f - -n $NAMESPACE
