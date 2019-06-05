#!/usr/bin/env sh
set -Eeuxo pipefail
# pre end to end ci testing with cypress check

# checks to see if the public directory exists
# if not build the gatsby
ls public || npx gatsby build
# npx gatsby build works because the command is called relative from the caller which is the 
# package.json file