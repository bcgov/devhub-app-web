#!/usr/bin/env bash

# GatsD CLI
# Handles all GatsD commands and passes through any unused options


##### CONSTANTS #####
GATSD_VERSION=${GATSD_VERSION}
SITE_NAME=${SITE_NAME}
WORK_DIR=${WORK_DIR}
GATSBY_PORT=${GATSBY_PORT}
DOWNLOAD_URL_BASE=https://api.github.com/repos


##### VARIABLES #####
download_url=""
pass=()


##### FLAGS #####
host=${GATSBY_HOST}				# flag -H --host
port=${GATSBY_PORT}				# flag -p --port


##### FUNCTIONS #####
_help() {
	cat << HELP

########################################################
#                                                      #
#                     GatsD CLI                        # 
#                                                      #
########################################################

Run GatsbyJS commands inside a Docker container.

Flags:

-h --help	Print GatsD help commands
		to console
-v --version	Print GatsD version
-H --host	Set host for standard GatsD
		command [develop|build|serve|stage]
-p --port	Set port for standard GatsD
		command [develop|build|serve|stage]

Commands:

develop		Start hot-reloading dev environment
		inside Docker container.
		Defaults: host=0.0.0.0
build		Invoke 'gatsby build' inside container
		to generate production build of site.
serve		Start a local html server from inside
		container to serve local build of site.
		Defaults: host=0.0.0.0 port=8000
stage		Build and serve production build of site
		locally using 'gatsd build' and 
		'gatsd serve' defaults

Ex: gatsd stage -H 0.0.0.0 --port 8000

HELP
}

_pars_args() {
	while getopts ":H:p:-:" flag; do
		case "${flag}" in
			-) 
				case "${OPTARG}" in
					host)
						host="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
						;;
					host=*)
						host=${OPTARG#*=}
						opt=${OPTARG%=$host}
						;;
					port)
						port="${!OPTIND}"; OPTIND=$(( $OPTIND + 1 ))
						;;
					port=*)
						port=${OPTARG#*=}
						opt=${OPTARG%=$port}
						;;
					*)
						pass+=( "--$OPTARG" )
						if [[ ${@: OPTIND:1} != -* ]]; then
							pass+=( "${@: OPTIND:1}" )
							(( ++OPTIND ))
						fi
						;;
				esac
				;;
			H) 
				host="${OPTARG}"
				;;
			p) 
				port="${OPTARG}"
				;;
			*) 
				pass+=( "-$OPTARG" )
				if [[ ${@: OPTIND:1} != -* ]]; then
					pass+=( "${@: OPTIND:1}" )
					(( ++OPTIND ))
				fi
				;;
		esac
	done
	shift $((OPTIND - 1))
	pass+=( "$@" )	
}

_new_site() {
	echo "STARTING NEW SITE: $@"
	if [[ -z "$1" ]]; then
		IFS="="
		while read -r key val; do
			[[ "${key}" == "STARTER_URL" ]] && set "${val//\"/}"
		done < $(dirname $0)/_default.conf
	fi

	if [[ "$1" != http?(s)://github.com/* ]]; then
		cat <<- WARN
			To create a new site, please use 'new <site>'. For example:
			new https://github.com/gatsbyjs/gatsby-starter-default
			Site-name argument isn't needed. Current dir will be used.
		WARN
		return 1
	fi

	download_url=${DOWNLOAD_URL_BASE}/${1#*.com/}
	echo "DOWNLOAD_URL: $download_url"

	cd "${WORK_DIR}" || { echo "Error on change to ${WORK_DIR}"; exit 1; }
    echo "Downloading from ${download_url} to $(pwd)"
    curl -L ${download_url}/tarball | tar xz --strip=1

	if [[ ! -e "package.json" ]]; then
		echo "Site creation error: No package.json found."
		return 1
	fi
}

_new_project() {
	[[ "$1" == "${SITE_NAME}" ]] && shift

	if [[ ! -e "package.json" ]]; then
		echo "No package.json. Downloading new site."
		_new_site $@ || return 1
	else
		echo "Found package.json. Project already installed."
	fi

	[[ -e "package-lock.json" ]] && rm package-lock.json
	
	echo "Installing local yarn packages"
	yarn install --force
}


##### MAIN #####
case "$1" in
	-v|-V|--version|--Version|version)
		echo "GatsD Version: ${GATSD_VERSION}"
		exit 0
		;;
	-*|help)
		_help && exit 0
		;;
    new)
    	shift
		_pars_args "$@"
        _new_project "${pass[@]}" || { echo "Exiting"; exit 1; }
        ;;
	build)
		shift
		_pars_args "$@"
		gatsby build "${pass[@]}"
		;;
	develop)
		shift
		_pars_args "$@"
		gatsby develop -H ${host} -p ${port} "${pass[@]}"
		;;
	serve)
		shift
		_pars_args "$@"
		gatsby serve -H ${host} -p ${port} "${pass[@]}"
		;;
	stage)
		shift
		_pars_args "$@"
		gatsby build && gatsby serve -H ${host} -p ${port} "${pass[@]}"
		;;
    *)
		exec "$@"
		;;
esac
