#!/usr/bin/env bash

docker-compose -f docker-compose.yml build --build-arg GIT_REF=$(git rev-parse --short HEAD) --no-cache
#assumes successful docker login prior to execution
docker push bcgovimages/devhub-previewer
