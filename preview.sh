#!/usr/bin/env bash

#docker pull bcgovimages/devhub-previewer
rm -rf app-web/.cache
rm -rf app-web/public
docker-compose -f docker-compose.preview.yml down
docker-compose -f docker-compose.preview.yml up
docker-compose -f docker-compose.preview.yml down
