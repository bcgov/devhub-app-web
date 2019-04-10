#!/usr/bin/env bash

docker pull bcgovimages/devhub-previewer
docker-compose -f docker-compose.preview.yml down
docker-compose -f docker-compose.preview.yml up
docker-compose -f docker-compose.preview.yml down