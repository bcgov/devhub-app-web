#!/usr/bin/env bash

docker-compose -f docker-compose.preview.yml build --no-cache
#todo push to docker hub