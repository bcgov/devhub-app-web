#!/bin/bash

# github deployment environments don't 100% map to our openshift namespaces
# this will provide the namespace name against a github deployment environment
GH_ENV=$1

if [ "$GH_ENV" == 'development' ]; then
  echo $DEV_NAMESPACE
fi

if [ "$GH_ENV" == 'qa' ]; then
  echo $TEST_NAMESPACE
fi

if [ "$GH_ENV" == 'staging' ]; then
  echo $TEST_NAMESPACE
fi

if [ "$GH_ENV" = 'production' ]; then
  echo $PROD_NAMESPACE
fi


