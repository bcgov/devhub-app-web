# OpenShift configuration files

See https://github.com/BCDevOps/openshift-templates

# OpenShift environment configuration

This project uses OpenShift container platform (v3.10) for hosting the application and deploying/running any services required by it.

## Environments

There are 4 environments setup in OpenShift Platform.
- Tools : Contains all the tools/external services required by the application
- Dev : Contains a running application instance of an open pull request branch.
- Test : Contains a running application instance of the current release branch.
    - release branches are currently based on the sprint number ie sprint-1, sprint-2 etc
- Prod : Contains a running application instance of the current state of master.

## Build Process

The build process is a chain build.

### Step 1 

Create a base image of the nodejs run time

### Step 2a

Create image from base image and source code and build

### Step 2b

Post Commit build hook is run to run jest unit tests

### Step 3

Source build artifacts into a Caddy Image which is used for deployment


## Getting Started

This application is hooked into [ocp-cd-pipeline](https://github.com/BCDevOps/ocp-cd-pipeline).
As explained in [Environments](#Environments), application instances are generated based on pull requests.