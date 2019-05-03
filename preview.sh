#!/usr/bin/env bash

read -n1 -r -p "Press 'P' to retrieve image from DockerHub. Any other key to continue with local image." key

if [ "$key" = 'P' ]; then
    echo "Pulling image from DockerHub..."
    docker pull bcgovimages/devhub-previewer
else
    echo "Using local image."
fi


docker-compose down
docker-compose up
docker-compose down
