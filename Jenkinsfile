def APP_NAME = 'devhub-web'
def POD_LABEL = "${APP_NAME}-${UUID.randomUUID().toString()}"
pipeline {
    agent none
    options {
        disableResume()
    }
    environment {
        OCP_PIPELINE_CLI_URL = 'https://raw.githubusercontent.com/BCDevOps/ocp-cd-pipeline/v0.0.4/src/main/resources/pipeline-cli'
        OCP_PIPELINE_VERSION = '0.0.4'
    }
    stages {
        stage('Test:CI') {
            // See https://github.com/jenkinsci/kubernetes-plugin
            podTemplate(label: "${POD_LABEL}", name: "${POD_LABEL}", serviceAccount: 'jenkins', cloud: 'openshift', containers: [
            containerTemplate(
                name: 'jnlp',
                image: 'docker-registry.default.svc:5000/openshift/jenkins-slave-nodejs:8',
                resourceRequestCpu: '1500m',
                resourceLimitCpu: '2000m',
                resourceRequestMemory: '1Gi',
                resourceLimitMemory: '2Gi',
                workingDir: '/tmp',
                command: '',
                args: '${computer.jnlpmac} ${computer.name}',
                alwaysPullImage: false
                // envVars: [
                //     secretEnvVar(key: 'BDD_DEVICE_FARM_USER', secretName: 'bdd-credentials', secretKey: 'username'),
                //     secretEnvVar(key: 'BDD_DEVICE_FARM_PASSWD', secretName: 'bdd-credentials', secretKey: 'password'),
                //     secretEnvVar(key: 'ANDROID_DECRYPT_KEY', secretName: 'android-decrypt-key', secretKey: 'decryptKey')
                //   ]
            )
            ]) node("${POD_LABEL}") {
                steps {
                    echo "Setup: ${BUILD_ID}"
                    sh "npm ci"
                    sh "npm -v"
                    sh "node -v"
                    echo "Running Unit Tests"
                    //check build
                    try {
                        echo "Checking Build"
                        sh "npm run build"
                    } catch (error) {
                        def attachment = [:]
                        attachment.fallback = 'See build log for more details'
                        attachment.title = "API Build ${BUILD_ID} FAILED! :face_with_head_bandage: :hankey:"
                        attachment.color = '#CD0000' // Red
                        attachment.text = "The code does not build.\ncommit ${GIT_COMMIT_SHORT_HASH} by ${GIT_COMMIT_AUTHOR}"
                        // attachment.title_link = "${env.BUILD_URL}"
                        // notifySlack("${APP_NAME}, Build #${BUILD_ID}", "${SLACK_CHANNEL}", "https://hooks.slack.com/services/${SLACK_TOKEN}", [attachment], JENKINS_ICO)
                        sh "exit 1001"
                    }
                    // check unit tests
                    try {
                        echo "Running Unit Tests"
                        sh "npm run test:ci"
                    } catch (error) {
                        def attachment = [:]
                        attachment.fallback = 'See build log for more details'
                        attachment.title = "API Build ${BUILD_ID} FAILED! :face_with_head_bandage: :hankey:"
                        attachment.color = '#CD0000' // Red
                        attachment.text = "There are issues with the unit tests.\ncommit ${GIT_COMMIT_SHORT_HASH} by ${GIT_COMMIT_AUTHOR}"
                        // attachment.title_link = "${env.BUILD_URL}"
                        // notifySlack("${APP_NAME}, Build #${BUILD_ID}", "${SLACK_CHANNEL}", "https://hooks.slack.com/services/${SLACK_TOKEN}", [attachment], JENKINS_ICO)
                        sh "exit 1001"
                    }
                }
            }
        }
        stage('Build') {
            agent { label 'build' }
            steps {
                echo "Aborting all running jobs ..."
                script {
                    abortAllPreviousBuildInProgress(currentBuild)
                }
                echo "Building ..."
                sh "curl -sSL '${OCP_PIPELINE_CLI_URL}' | bash -s build --config=openshift/config.groovy --pr=${CHANGE_ID}"
            }
        }
        stage('Deploy (DEV)') {
            agent { label 'deploy' }
            steps {
                echo "Deploying ..."
                sh "curl -sSL '${OCP_PIPELINE_CLI_URL}' | bash -s deploy --config=openshift/config.groovy --pr=${CHANGE_ID} --env=dev"
            }
        }
        stage('Deploy (TEST)') {
            agent { label 'deploy' }
            when {
              environment name: 'CHANGE_TARGET', value: 'master'
            }
            steps {
                script {
                    def IS_APPROVED = input(message: "Deploy to TEST?", ok: "yes", parameters: [string(name: 'IS_APPROVED', defaultValue: 'yes', description: 'Deploy to TEST?')])
                    if (IS_APPROVED != 'yes') {
                        currentBuild.result = "ABORTED"
                        error "User cancelled"
                    }
                }
                echo "Deploying ..."
                sh "curl -sSL '${OCP_PIPELINE_CLI_URL}' | bash -s deploy --config=openshift/config.groovy --pr=${CHANGE_ID} --env=test"
            }
        }
        
        stage('Deploy (PROD)') {
            agent { label 'deploy' }
            when {
              environment name: 'CHANGE_TARGET', value: 'master'
            }
            steps {
                script {
                    def IS_APPROVED = input(message: "Deploy to PROD?", ok: "yes", parameters: [string(name: 'IS_APPROVED', defaultValue: 'yes', description: 'Deploy to PROD?')])
                    if (IS_APPROVED != 'yes') {
                        currentBuild.result = "ABORTED"
                        error "User cancelled"
                    }
                }
                echo "Deploying ..."
                sh "curl -sSL '${OCP_PIPELINE_CLI_URL}' | bash -s deploy --config=openshift/config.groovy --pr=${CHANGE_ID} --env=prod"
            }
        }
        stage('Verification/Cleanup') {
            agent { label 'deploy' }
            input {
                message "Should we continue with cleanup, merge, and close PR?"
                ok "Yes!"
            }
            steps {
                echo "Cleaning ..."
                sh "curl -sSL '${OCP_PIPELINE_CLI_URL}' | bash -s cleanup --config=openshift/config.groovy --pr=${CHANGE_ID}"
                script {
                    String mergeMethod=("master".equalsIgnoreCase(env.CHANGE_TARGET))?'merge':'squash'
                    echo "Merging (using '${mergeMethod}' method) and closing PR"
                    bcgov.GitHubHelper.mergeAndClosePullRequest(this, mergeMethod)
                }
            }
        }
    }
}