// JENKINS FILE REQUIREMENTS
// this jenkins file leverages environment variables such as 
// GITHUB_TOKEN: the github access token

// In order for this Jenkinsfile works, please ensure the deployment config that is responsible for
// deploying jenkins slave pods has this environment variable set. 
pipeline {
    agent none
    environment {
        COMPONENT_NAME = 'DevHub web app'
        COMPONENT_HOME = '/'
        BUILD_TRIGGER_INCLUDES = "^app-web"
    }
    options {
        disableResume()
    }
    stages {
        stage('Build') {
            agent { label 'build' }
            steps {
                script {
                    // only continue build if changes are relevant to the devhub
                    def filesInThisCommitAsString = sh(script:"git diff --name-only HEAD~1..HEAD | grep -e '$BUILD_TRIGGER_INCLUDES' || echo -n ''", returnStatus: false, returnStdout: true).trim()
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
                    timeout(time: 5, unit: 'MINUTES')  {
                        echo "updating algolia index settings and synonyms"
                        sh "cd .pipeline && ./npmw ci && ./npmw run update-algolia-index-settings -- --suffix=-build-${CHANGE_ID}"
                    }
                    timeout(time: 5, unit: 'MINUTES')  {
                        sh "cd .pipeline && ./npmw ci && ./npmw run deploy -- --pr=${CHANGE_ID} --env=dev --description='deploying to dev from devhub job'"
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
                timeout(time: 5, unit: 'MINUTES') {
                    echo "cloning algolia index ${CHANGE_ID} to test"
                    sh "cd .pipeline && ./npmw ci && ./npmw run clone-algolia-index -- --suffix=-build-${CHANGE_ID} --env=test"
                }
                script {
                    timeout(time: 5, unit: 'MINUTES') {
                        sh "cd .pipeline && ./npmw ci && ./npmw run deploy -- --pr=${CHANGE_ID} --env=test --description='deploying to test from devhub job'"
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
                        echo "cloning algolia index ${CHANGE_ID} to production"
                        sh "cd .pipeline && ./npmw ci && ./npmw run clone-algolia-index -- --suffix=-build-${CHANGE_ID} --env=prod"
                    }
                    timeout(time: 5, unit: 'MINUTES') {
                        sh "cd .pipeline && ./npmw ci && ./npmw run deploy -- --pr=${CHANGE_ID} --env=prod --description='deploying to prod from devhub job'"
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
                script {
                    echo "Deleting old algolia index ${CHANGE_ID}"
                    timeout(time: 5, unit: 'MINUTES') {
                        echo "cloning algolia index ${CHANGE_ID} to production"
                        sh "cd .pipeline && ./npmw ci && ./npmw run delete-algolia-index -- --suffix=-build-${CHANGE_ID}"
                    }
                }
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
        failure('Failing Deployment') {
            node('deploy') { 
                echo "Pipeline Failed"
            }
        }
    }
}

