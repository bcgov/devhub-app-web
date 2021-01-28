#!/bin/bash

# map a github environment to a relevant image tag
GH_ENV=$1



if [ "$GH_ENV" = 'qa' ]; then
  echo 'test'
fi

if [ "$GH_ENV" = 'staging' ]; then
  echo 'test'
fi

if [ "$GH_ENV" = 'production' ]; then
  echo 'prod'
fi


