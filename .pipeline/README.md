## Pipeline Wrapper Scripts

Our pipeline utilities are a set of __Node JS__ scripts which are abstracted away from specific CI/CD tools so that they can be more easily ported. The main utility behind these scripts are around a package called `@bcgov/pipeline-cli` which
has methods that wrap Openshift `oc cli` functions and apply __bcgov best practices__. 

## How it works

It is fairly straight forward to get started. Running any of the npm scripts firstly goes through a routine
that parses command line arguments and returns them as an `Object` which can than be leveraged in any of the
script files. 

The script files are __frameworkless__. You leverage `@bcgov/pipeline-cli` and other utilities to form your
logic and run your continuous deployments/delivery.

## Prerequisites

- login to oc cli
- npm install
- fill environment variables

## Running Builds and Deploys Locally

Although not recommended, it is possible to run builds and deploys locally.

## Build

The build creates the devhub image and stores it in the tools name space. 

1. npm install if you haven't already
2. `cp .env.example .env` and fill enter your __GITHUB_TOKEN__ (this token must be able to create deployments)

3. 
  - To create a build from a PR `npm run build -- --pr=<prnum>` 
  > this requires you have code pushed up and __a pull request made__
  - To create a build against a specific branch `npm run build -- --ref=master --suffix=<a good suffix for your image tags>`

## Deploying

Deploying is slightly more involved:

- It creates a __Pending Github Deployment__ 
- Starts the Openshift Deployment
- Creates a __Success Github Status__ against a deployment when successful and a failure status when there are errors

1. npm install if you haven't already
2. `cp .env.example .env` and fill enter your __GITHUB_TOKEN__ (this token must be able to create deployments)
3. 
  - To create a deployment against a PR `npm run deploy -- --pr=<prnum> --env=<dev|test|prod>`
  > the `env` flag will deploy the application to a respective openshift namespace
  - To create a deployment against a branch or ref that __you have built and image for__ 
  `npm run deploy -- --ref=<branch> --suffix=<same suffix you used for build>` --env=<dev|test|prod>