
app {
    name = 'jenkins-devhub'
    namespaces {
        'build'{
            namespace = 'csnr-devops-lab-tools'
            disposable = true
        }
        'dev' {
            namespace = app.namespaces.'build'.namespace
            disposable = true
        }
        'test' {
            namespace = app.namespaces.'build'.namespace
            disposable = true
        }
        'prod' {
            namespace = app.namespaces.'build'.namespace
            disposable = false
        }
    }

    git {
        workDir = ['git', 'rev-parse', '--show-toplevel'].execute().text.trim()
        uri = ['git', 'config', '--get', 'remote.origin.url'].execute().text.trim()
        ref = ['bash','-c', 'git config branch.`git name-rev --name-only HEAD`.merge'].execute().text.trim()
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
        templates = [
            [
                'file':'https://raw.githubusercontent.com/cvarjao-o/openshift-templates/stable/jenkins/jenkins.bc.yaml',
                'params':[
                    'NAME': "${app.build.name}",
                    'SUFFIX': "${app.build.suffix}",
                    'VERSION': app.build.version,
                    'CONTEXT_DIR': 'base'
                ]
            ]
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
        id = "${app.deployment.name}${app.deployment.suffix}" // app (unique name across all deployments int he namespace)
        namespace = "${vars.deployment.namespace}"
        

        timeoutInSeconds = 60*20 // 20 minutes
        templates = [
                [
                    'file':'https://raw.githubusercontent.com/cvarjao-o/openshift-templates/stable/jenkins/jenkins.dc.yaml',
                    'params':[
                        'NAME':app.deployment.name,
                        'BC_NAME':app.build.name,
                        'SUFFIX':app.deployment.suffix,
                        'VERSION': app.deployment.version,
                        'ROUTE_HOST': "${app.deployment.id}-${app.deployment.namespace}.pathfinder.gov.bc.ca",
                        'MASTER_CPU_REQUEST': '1000m',
                        'MASTER_CPU_LIMIT': '2000m',
                        'SLAVE_CPU_REQUEST': '500m',
                        'SLAVE_CPU_LIMIT': '1000m'
                    ]
                ]
        ]
    }
}

environments {
    'dev' {
        vars {
            deployment {
                env {
                    name ="dev"
                    id = "pr-${opt.'pr'}"
                }
                suffix = "-dev-${opt.'pr'}"
                name = "${opt.'deployment-name'?:app.name}"
                namespace = app.namespaces[env.name].namespace
                version = "${vars.deployment.name}-${vars.deployment.env.name}-v${opt.'pr'}" //app-version  and tag
            }
        }
    }
    'test' {
        vars {
            deployment {
                env {
                    name ="test"
                    id = "pr-${opt.'pr'}"
                }
                suffix = '-test'
                name = "${opt.'deployment-name'?:app.name}"
                namespace = app.namespaces[env.name].namespace
                version = "${vars.deployment.name}-${vars.deployment.env.name}" //app-version  and tag
            }
        }
    }
    'prod' {
        vars {
            deployment {
                env {
                    name ="prod"
                    id = "pr-${opt.'pr'}"
                }
                suffix = ''
                id = "${app.name}${vars.deployment.suffix}"
                name = "${opt.'deployment-name'?:app.name}"
                namespace = app.namespaces[env.name].namespace
                version = "${vars.deployment.name}-${vars.deployment.env.name}" //app-version  and tag
            }
        }
    }
}

