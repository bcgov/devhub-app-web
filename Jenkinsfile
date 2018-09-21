pipeline {
    agent none
    options {
        disableResume()
    }
    environment {
        OCP_PIPELINE_CLI_URL = 'https://raw.githubusercontent.com/BCDevOps/ocp-cd-pipeline/v0.0.4/src/main/resources/pipeline-cli'
        OCP_PIPELINE_VERSION = '0.0.4'
        BDDSTACK_URL = "https://devhub-static-dev-${CHANGE_ID}-devhub-dev.pathfinder.gov.bc.ca"
    }
    stages {
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

        stage('Funtional Test (DEV)') {
            agent { label 'deploy' }
            steps{
                // try using dynamic pod for bddstack:
                podTemplate(
                    label: "bddstack-pr-${CHANGE_ID}",
                    name: "bddstack-pr-${CHANGE_ID}",
                    serviceAccount: 'jenkins',
                    cloud: 'openshift',
                    containers: [
                    containerTemplate(
                        name: 'jnlp',
                        image: 'docker-registry.default.svc:5000/openshift/jenkins-slave-bddstack',
                        resourceRequestCpu: '800m',
                        resourceLimitCpu: '800m',
                        resourceRequestMemory: '3Gi',
                        resourceLimitMemory: '3Gi',
                        workingDir: '/home/jenkins',
                        command: '',
                        args: '${computer.jnlpmac} ${computer.name}',
                        envVars: [
                            envVar(key:'BASEURL', value: "${BDDSTACK_URL}"),
                            envVar(key:'GRADLE_USER_HOME', value: '/var/cache/artifacts/gradle')
                        ]
                    )
                    ],
                    // volumes: [
                    //     persistentVolumeClaim(
                    //         mountPath: '/var/cache/artifacts',
                    //         claimName: 'cache',
                    //         readOnly: false
                    //     )
                    // ]
                ){
                    node("bddstack-pr-${CHANGE_ID}") {
                        echo "Build: ${BUILD_ID}"
                        echo "baseURL: ${BDDSTACK_URL}"
                        checkout scm
                        echo "Finishing functional testing"
                    } //end node
                } //end podTemplate
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