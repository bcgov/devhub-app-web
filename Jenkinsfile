// JENKINS FILE REQUIREMENTS
// this jenkins file leverages environment variables such as 
// GITHUB_TOKEN: the github access token

// In order for this Jenkinsfile works, please ensure the deployment config that is responsible for
// deploying jenkins slave pods has this environment variable set. 
pipeline {
    agent none
    environment {
        COMPONENT_NAME = 'DevHub web app'
        CURRENT_PIPELINE_ID = ''
        COMPONENT_HOME = '/'
        BUILD_TRIGGER_EXCLUDES = "^.jenkins/\\|^matomo/"
    }
    options {
        disableResume()
    }
    stages {
        stage('Build') {
            agent { label 'build' }
            steps {
                script {
                    def deploymentId = sh(returnStdout: true, script: "cd .pipeline && ./npxw @bcgov/gh-deploy deployment --ref=pull/${CHANGE_ID}/head -d='Deploying to dev' -e=development -o=bcgov --repo=devhub-app-web -t=${env.GITHUB_TOKEN} --required-contexts=[]").trim()
                    CURRENT_PIPELINE_ID = deploymentId
                    echo "throwing"
                    throw new Exception("Throw to stop pipeline") 
                    // only continue build if changes are relevant to the devhub
                    def filesInThisCommitAsString = sh(script:"git diff --name-only HEAD~1..HEAD | grep -v '$BUILD_TRIGGER_EXCLUDES' || echo -n ''", returnStatus: false, returnStdout: true).trim()
                    def hasChangesInPath = (filesInThisCommitAsString.length() > 0)
                    echo "${filesInThisCommitAsString}"
                    if (!currentBuild.rawBuild.getCauses()[0].toString().contains('UserIdCause') && !hasChangesInPath){
                        currentBuild.rawBuild.delete()
                        error("No changes detected in the component path for $COMPONENT_NAME.")
                    }
                }
                echo "Aborting all running jobs for $COMPONENT_NAME..."
                script {
                    abortAllPreviousBuildInProgress(currentBuild)
                }
                echo "Building ..."
                sh "cd .pipeline && ./npmw ci && ./npmw run build -- --pr=${CHANGE_ID}"
            }
        }
        stage('Deploy (DEV)') {
            agent { label 'deploy' }
            steps {
                echo "Deploying ..."
                sh "openshift/keycloak-scripts/kc-create-client.sh ${CHANGE_ID}"
                script {
                    timeout(time: 3, unit: 'MINUTES') {
                        // please note the required-contexts=[] parameter
                        // github will not create deployments if status checks are pending or failed
                        // this is to bypass and github action checks that we are currently doing
                        def deploymentId = sh(returnStdout: true, script: "cd .pipeline && ./npxw @bcgov/gh-deploy deployment --ref=pull/${CHANGE_ID}/head -d='Deploying to dev' -e=development -o=bcgov --repo=devhub-app-web -t=${env.GITHUB_TOKEN} --required-contexts=[]").trim()
                        CURRENT_PIPELINE_ID = deploymentId
                        throw new Exception("Throw to stop pipeline")
                        sh "cd .pipeline && ./npmw ci && ./npmw run deploy -- --pr=${CHANGE_ID} --env=dev"
                        sh "cd .pipeline && ./npxw @bcgov/gh-deploy status --state=success --deployment=${deploymentId} -o=bcgov --repo=devhub-app-web -t=${env.GITHUB_TOKEN}"
                    }
                }
            }
        }
        stage('Deploy (TEST)') {
            agent { label 'deploy' }
            input {
                message "Should we continue with deployment to TEST?"
                ok "Yes!"
            }
            steps {
                echo "Deploying ..."
                script {
                    timeout(time: 5, unit: 'MINUTES') {
                        def deploymentId = sh(returnStdout: true, script: "cd .pipeline && ./npxw @bcgov/gh-deploy deployment --ref=pull/${CHANGE_ID}/head -d='Deploying to test' -e=test -o=bcgov --repo=devhub-app-web -t=${env.GITHUB_TOKEN} --required-contexts=[]").trim()
                        CURRENT_PIPELINE_ID = deploymentId
                        sh "cd .pipeline && ./npmw ci && ./npmw run deploy -- --pr=${CHANGE_ID} --env=test"
                        sh "cd .pipeline && ./npxw @bcgov/gh-deploy status --state=success --deployment=${deploymentId} -o=bcgov --repo=devhub-app-web -t=${env.GITHUB_TOKEN}"
                    }

                }
            }
        }
        stage('Deploy (PROD)') {
            agent { label 'deploy' }
            input {
                message "Should we continue with deployment to PROD?"
                ok "Yes!"
            }
            steps {
                echo "Deploying ..."
                script {
                    timeout(time: 5, unit: 'MINUTES') {
                        def deploymentId = sh(returnStdout: true, script: "cd .pipeline && ./npxw @bcgov/gh-deploy deployment --ref=pull/${CHANGE_ID}/head -d='Deploying to prod' -e=production -o=bcgov --repo=devhub-app-web -t=${env.GITHUB_TOKEN} --required-contexts=[]").trim()
                        CURRENT_PIPELINE_ID = deploymentId
                        sh "cd .pipeline && ./npmw ci && ./npmw run deploy -- --pr=${CHANGE_ID} --env=prod"
                        sh "cd .pipeline && ./npxw @bcgov/gh-deploy status --state=success --deployment=${deploymentId} -o=bcgov --repo=devhub-app-web -t=${env.GITHUB_TOKEN}"
                    }
                }
            }
        }

        stage('Cleanup') {
            agent { label 'deploy' }
            input {
                message "Should we cleanup and merge this pr?"
                ok "Yes!"
            }
            steps {
                echo "Cleaning ..."
                sh "cd .pipeline && ./npmw ci && ./npmw run clean -- --pr=${CHANGE_ID} --env=dev"
                echo "deleteing key cloak client"
                sh "openshift/keycloak-scripts/kc-delete-client.sh ${CHANGE_ID}"
            }
        }

        stage('Push Preview Image to Docker Hub') {
            agent { label 'deploy' }
            steps {
                echo "Pushing a 'development' version of the app to dockerhub ..."
                sh "cd .pipeline && ./npmw ci && ./npmw run build-previewer -- --pr=${CHANGE_ID}"
            }
        }
    }
    post {
        failure {
            echo "Failed Pipeline"
            sh "cd .pipeline && ./npxw @bcgov/gh-deploy status --state=failure --deployment=${CURRENT_PIPELINE_ID} -o=bcgov --repo=devhub-app-web -t=${env.GITHUB_TOKEN}"
        }
     }
}
