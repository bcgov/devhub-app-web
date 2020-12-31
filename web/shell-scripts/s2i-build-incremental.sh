#!/usr/bin/env bash

# utility script to perform an incremental s2i build locally.  this was created to test/validate the behavour of incremental builds, but is useful for verification of any s2i functionality.

read -n1 -r -p "Welcome to the the DevHub s2i builder.  Note: You must have the s2i binary installed and the Red Hat nodejs builder image from registry.redhat.io in your local docker image cache. Continue? [yY/nN]" key

if [ `echo $key | tr [:upper:] [:lower:]` =  'y' ]; then
    echo -e "\nBuilding..."
    #assumes presence of builder image
    s2i build --scripts-url file://$(pwd)/../.s2i/bin --incremental -E $(pwd)/../.env.production --pull-policy never . registry.redhat.io/rhoar-nodejs/nodejs-10 devhub-app
else
    echo -e "\nNot building. Thanks for playing."
fi



