#!/usr/bin/env sh
set -Eeuxo pipefail
# run jest with no coverage and --runInBand flag to make tests run in sequential order
exec node_modules/.bin/jest --env=jsdom --runInBand
