#! /bin/bash

# inputs:
# the qualified deployment name: ie dc/<name> statefulset/<name>

# environment variables:
# NAMESPACE <string>


# returns 'success' or 'failure' based on the rollout status
# these values coorespond to valid github deployment statuses

_RESULT=$(oc -n $NAMESPACE rollout status -w $1 || echo 'Uhoh!')

if [[ "$_RESULT" = 'Uhoh!' || "$_RESULT" == *"error:"* ]]; then
  echo 'failure' 
else
  echo 'success'
fi

