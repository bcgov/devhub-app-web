app {
    name = 'matomo'
    namespaces {
        'build' {
            namespace = 'devhub-tools'
            disposable = true
        }
        'prod' {
            namespace = 'devhub-tools'
            disposable = false
        }
    }

    git {
        workDir = ['git', 'rev-parse', '--show-toplevel'].execute().text.trim()
        uri = ['git', 'config', '--get', 'remote.origin.url'].execute().text.trim()
        ref = opt.'branch' ?: "refs/pull/${opt.'pr'}/head"
        commit = ['git', 'rev-parse', 'HEAD'].execute().text.trim()
    }

    build {
        env {
            name = "build"
            id = "pr-${opt.'pr'}"
        }
        version = "${app.build.env.name}-v${opt.'pr'}"
        name = "${opt.'build-name'?:app.name}"
        suffix = "-pr-${opt.'pr'}"
        id = "${app.name}${app.build.suffix}"
        namespace = app.namespaces.'build'.namespace
        timeoutInSeconds = 60*20 // 20 minutes
        // as an initial step, these will be set statically at build time.  @todo make them dynamic per-environment
        matomoURL = "https://matomo-devhub-prod.pathfinder.gov.bc.ca"
        matomoSiteURL = "https://developer.gov.bc.ca"
        matomoSiteId = "1"
        templates = [
                [
                        'file':'openshift/matomo/mariadb/mariadb-build.json',
                        'params': [
                                'SUFFIX': app.build.suffix,
                                'OUTPUT_IMAGE_TAG': app.build.version
                        ]
                ], [
                        'file': 'openshift/matomo/matomo/matomo-build.json',
                        'params': [
                                'SUFFIX': app.build.suffix,
                                'OUTPUT_IMAGE_TAG': app.build.version
                        ]
                ] // todo re-introduce managed matomo-proxy - or at least imagestream.
        ]
    }


    deployment {
        env {
            name = vars.deployment.env.name // env-name
            id = vars.deployment.env.id
        }
        version = "${vars.deployment.version}" //app-version  and tag
        name = "${vars.deployment.name}" //app-name   (same name accross all deployments)
        suffix = "${vars.deployment.suffix}"
        id = "${app.deployment.name}${app.deployment.suffix}"
        // app (unique name across all deployments int he namespace)
        namespace = "${vars.deployment.namespace}"
        host = "${vars.deployment.host}"

        timeoutInSeconds = 60 * 20 // 20 minutes
        templates = [
                [
                        'file'  : 'openshift/matomo/matomo-db/matomo-db-deploy.json',
                        'params': [
                                'NAME'                : 'matomo-db',
                                'IMAGE_NAMESPACE': app.deployment.namespace,
                                'TAG_NAME': app.deployment.version,
                                'PERSISTENT_VOLUME_SIZE': '10Gi'
                        ]
                ],
                [
                        'file': 'openshift/matomo/matomo/matomo-deploy.json',
                        'params': [
                                'NAME'             : 'matomo',
                                'IMAGE_NAMESPACE': app.deployment.namespace,
                                'TAG_NAME': app.deployment.version,
                                'MATOMO_URL' :                     'matomo-devhub-prod.pathfinder.gov.bc.ca'

                        ]
                ]
        ]
    }
}

environments {
    'prod' {
        vars {
            deployment {
                env {
                    name = 'prod'
                    id = "pr-${opt.'pr'}"
                }
//                matomo { //todo how to make this work?
//                    host = "matomo-devhub-prod.pathfinder.gov.bc.ca"
//                }
                suffix = "-tools-${opt.'pr'}"
                name = "${opt.'deployment-name' ?: app.name}"
                namespace = app.namespaces[env.name].namespace
                version = "build-v${opt.'pr'}"
            }
        }
    }
}
