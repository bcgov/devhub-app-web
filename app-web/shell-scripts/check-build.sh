#!/usr/bin/env sh
set -Eeuxo pipefail
# pre end to end ci testing with cypress check

# checks to see if the public directory exists
# if not build the gatsby project
ls ../public || cd ../ && npx gatsby build