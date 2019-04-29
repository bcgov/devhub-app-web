#!/usr/bin/env bash

docker pull bcgovimages/devhub-previewer
docker-compose down
docker-compose up
docker-compose down
