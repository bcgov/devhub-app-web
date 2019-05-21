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
                                'NAME'                : app.deployment.name,
                                'SUFFIX'              : app.deployment.suffix,
                                'VERSION'             : app.deployment.version,
                                'IMAGE_NAMESPACE': app.deployment.namespace,
                                'TAG_NAME': 'prod',
                                'PERSISTENT_VOLUME_SIZE': '10Gi'
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
                    name = 'tools'
                    id = "pr-${opt.'pr'}"
                }
                host = ""
                suffix = "-tools-${opt.'pr'}"
                name = "${opt.'deployment-name' ?: app.name}"
                namespace = app.namespaces[env.name].namespace
                version = "${vars.deployment.name}-${vars.deployment.env.name}-v${opt.'pr'}"
            }
        }
    }
}
