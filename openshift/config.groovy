
app {
    name = 'devhub'
    namespaces {
        'build'{
            namespace = 'devhub-tools'
            disposable = true
        }
        'dev' {
            namespace = 'devhub-dev'
            disposable = true
        }
        'test' {
            namespace = 'devhub-test'
            disposable = false
        }
        'prod' {
            namespace = 'devhub-prod'
            disposable = false
        }
    }

    git {
        workDir = ['git', 'rev-parse', '--show-toplevel'].execute().text.trim()
        uri = ['git', 'config', '--get', 'remote.origin.url'].execute().text.trim()
        ref = opt.'branch'?:"refs/pull/${opt.'pr'}/head"
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
        matomoURL = "https://matomo-devops-sandbox-dev.pathfinder.gov.bc.ca"
        matomoSiteURL = "https://developer.gov.bc.ca"
        matomoSiteId = "1"
        templates = [
            [
                'file':'openshift/bc.yaml',
                'params':[
                    'NAME': app.build.name,
                    'SUFFIX': app.build.suffix,
                    'VERSION': app.build.version,
                    'SOURCE_REPOSITORY_URL': app.git.uri,
                    'SOURCE_REPOSITORY_REF': app.git.ref,
                    'MATOMO_URL' : app.build.matomoURL,
                    'MATOMO_SITE_URL' : app.build.matomoSiteURL,
                    'MATOMO_SITE_ID' : app.build.matomoSiteId
                ]
            ], [
                'file':'openshift/bddstack.bc.json',
                'params':[
                    'NAME':"bdd-stack",
                    'SUFFIX': app.build.suffix,
                    'VERSION': app.build.version,
                    'SOURCE_CONTEXT_DIR': "functional-tests",
                    'SOURCE_REPOSITORY_URL': app.git.uri,
                    'SOURCE_REPOSITORY_REF': app.git.ref
                ]
            ], [
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
        id = "${app.deployment.name}${app.deployment.suffix}" // app (unique name across all deployments int he namespace)
        namespace = "${vars.deployment.namespace}"
        host = "${vars.deployment.host}"
        ssoURL = "${vars.deployment.ssoURL}"
        ssoClient = "${vars.deployment.ssoClient}"
        ssoRealm = "${vars.deployment.ssoRealm}"



        // @todo make these work - they are currently ignored because the code that uses them runs at build-time only
        // values used at runtime by client code to talk to Matomo analytics service
        matomoURL = "${vars.deployment.matomoURL}"
        matomoSiteURL = "${vars.deployment.matomoSiteURL}"
        matomoSiteId = "${vars.deployment.matomoSiteId}"



        timeoutInSeconds = 60*20 // 20 minutes
        templates = [
                [
                    'file':'openshift/dc.yaml',
                    'params':[
                        'NAME':app.deployment.name,
                        'SUFFIX':app.deployment.suffix,
                        'VERSION': app.deployment.version,
                        'HOST': app.deployment.host,
                        'SSO_BASE_URL_VALUE': app.deployment.ssoURL,
                        'SSO_CLIENT_ID_VALUE': app.deployment.ssoClient,
                        'SSO_REALM_NAME_VALUE': app.deployment.ssoRealm,
                        'MATOMO_URL' : app.deployment.matomoURL,
                        'MATOMO_SITE_URL' : app.deployment.matomoSiteURL,
                        'MATOMO_SITE_ID' : app.deployment.matomoSiteId
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
                host = ""
                suffix = "-dev-${opt.'pr'}"
                name = "${opt.'deployment-name'?:app.name}"
                namespace = app.namespaces[env.name].namespace
                version = "${vars.deployment.name}-${vars.deployment.env.name}-v${opt.'pr'}"
                ssoURL = "https://sso-dev.pathfinder.gov.bc.ca"
                ssoClient = "devhub-web-${opt.'pr'}"
                ssoRealm = "devhub"
                matomoURL = "https://matomo-devhub-prod.pathfinder.gov.bc.ca"
                matomoSiteURL = "https://dev-devhub.pathfinder.gov.bc.ca" // todo probably should make this dynamic based on PR
                matomoSiteId = '1' // events from all dev deployments will appear under the same site id, which we will have to pre-provision
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
                host = ""
                suffix = '-test'
                name = "${opt.'deployment-name'?:app.name}"
                namespace = app.namespaces[env.name].namespace
                version = "${vars.deployment.name}-${vars.deployment.env.name}" //app-version  and tag
                ssoURL = "https://sso-test.pathfinder.gov.bc.ca"
                ssoClient = "devhub-web"
                ssoRealm = "devhub"
                matomoURL = "https://matomo-devhub-prod.pathfinder.gov.bc.ca"
                matomoSiteURL = "https://devhub-static-test-devhub-test.pathfinder.gov.bc.ca"
                matomoSiteId = '1' // events from all test deployments will appear under the same site id, which we will have to pre-provision
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
                host = "developer.gov.bc.ca"
                suffix = ''
                id = "${app.name}${vars.deployment.suffix}"
                name = "${opt.'deployment-name'?:app.name}"
                namespace = app.namespaces[env.name].namespace
                version = "${vars.deployment.name}-${vars.deployment.env.name}" //app-version  and tag
                ssoURL = "https://sso.pathfinder.gov.bc.ca"
                ssoClient = "devhub-web"
                ssoRealm = "devhub"
                matomoURL = "https://matomo-devhub-prod.pathfinder.gov.bc.ca" // todo do we want another name like "analytics.developer.gov.bc.ca"?
                matomoSiteURL = "https://developer.gov.bc.ca"
                matomoSiteId = '1' // events from all test deployments will appear under the same site id, which we will have to pre-provision
            }
        }
    }
}
