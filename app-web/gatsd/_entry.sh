#!/usr/bin/env bash
# Entry point into container
# Load environmental variables before container commands

set -a
. /.bashrc
set +a

if [[ "${@}" =~ bash && "${@: -1}" == -* ]]; then
    cat <<_WELCOME_
  _                 _   ____             _           _ 
 | |__   ___   ___ | |_|___ \ __ _  __ _| |_ ___  __| |
 | '_ \ / _ \ / _ \| __| __) / _' |/ _' | __/ __|/ _' |
 | |_) | (_) | (_) | |_ / __/ (_| | (_| | |_\__ \ (_| |
 |_,__/ \___/ \___/ \__|_____\__, |\__,_|\__|___/\__,_|
                             |___/                     

Dev Environment Loaded
_WELCOME_
fi

exec "$@"