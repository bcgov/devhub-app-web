#!/bin/bash

# returns the last commit used during a build or 'No Builds Found' if no build exists
# environment variables
# INFRA_NAME
# SUFFIX
# TOOLS_NAMESPACE

LATEST_BUILD=$(oc get -n $TOOLS_NAMESPACE build -l buildconfig=$INFRA_NAME$SUFFIX --sort-by='{.metadata.creationTimestamp}' -o name | tail -n 1)

if [ "$LATEST_BUILD" = "No resources found" ] || [  -z "$LATEST_BUILD" ]; then
  echo "No Builds Found"
  exit 0
fi

LATEST_COMMIT=$(oc get -n $TOOLS_NAMESPACE ${LATEST_BUILD} -o json | jq '.spec.revision.git.commit')

echo $LATEST_COMMIT