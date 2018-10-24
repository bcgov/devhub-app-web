#!/usr/bin/env sh
set -Eeuxo pipefail
exec node_modules/.bin/jest --env=jsdom --coverage
