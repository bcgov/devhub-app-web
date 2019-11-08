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
                sh "cd .pipeline && ./npmw ci && ./npmw run build -- --ref=master --suffix=scheduled --description='deploying to prod from devhub-scheduled job'"
            }
        }
        
        stage('Deploy (PROD)') {
            agent { label 'deploy' }
            steps {
                echo "Deploying ..."
                script {
                    timeout(time: 5, unit: 'MINUTES') {     
                        sh "cd .pipeline && ./npmw ci && ./npmw run deploy -- --suffix=scheduled --env=prod"

                        sh "curl -X POST -H 'Content-Type: application/json' --data '{\"icon_emoji\":\":smile_cat:\",\"text\":\"'\"Scheduled deployment to Devhub Complete!\"'\"}' https://chat.pathfinder.gov.bc.ca/hooks/ScLeYnDzyKN3hbBob/F84wsFWxmpkguyDN9ZQ8BAyHRrLT3c2yF6DPoNoFbnitqxES"
                    }

                }
            }
        }
    }
    post {
        failure('Failing Deployment') {
            node('deploy') { 
                echo "Pipeline Failed"
                sh "curl -X POST -H 'Content-Type: application/json' --data '{\"icon_emoji\":\":crying_cat_face:\",\"text\":\"'\"Scheduled deployment to Devhub Failed :(\"'\"}' https://chat.pathfinder.gov.bc.ca/hooks/ScLeYnDzyKN3hbBob/F84wsFWxmpkguyDN9ZQ8BAyHRrLT3c2yF6DPoNoFbnitqxES"
                echo "Failing Deployment "
                
            }
        }
     }
}
