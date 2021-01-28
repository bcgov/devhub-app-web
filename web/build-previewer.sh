#!/usr/bin/env bash

docker-compose -f docker-compose.yml build --build-arg GIT_REF=$(git rev-parse --short HEAD) --no-cache

read -n1 -r -p "Press 'P' to push image to DockerHub. Any other key to exit." key

if [ "$key" = 'P' ]; then
    echo "Pushing image..."
    #assumes successful docker login prior to execution
    docker push bcgovimages/devhub-previewer
else
    echo "Not pushing image. Thanks for playing"
fi
