#!/usr/bin/env bash

docker-compose -f docker-compose.preview.yml build --build-arg GIT_REF=$(git rev-parse --short HEAD) --no-cache
#todo push to docker hub
