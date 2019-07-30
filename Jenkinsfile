pipeline {
    agent none
    environment {
        COMPONENT_NAME = 'DevHub web app'
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
                sh "cd .pipeline && ./npmw ci && ./npmw run deploy -- --pr=${CHANGE_ID} --env=dev"
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
                sh "cd .pipeline && ./npmw ci && ./npmw run deploy -- --pr=${CHANGE_ID} --env=test"
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
                sh "cd .pipeline && ./npmw ci && ./npmw run deploy -- --pr=${CHANGE_ID} --env=prod"
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
}
