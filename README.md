---
description: This is the primary repository for the BC Gov DevHub application
author: sheaphillips
image: https://github.com/bcgov/devhub-app-web/blob/master/docs/images/book.png?raw=true
---

# DevHub App Web
 
 This is the primary repository for the BC Gov DevHub application.  The code contained mostly relates to the web application specifically, but other content may relate to the DevHub more generally.     
 
## DevHub Intro

DevHub aims to become the "Central Nervous System" for the growing gov developer community.

It will provide a comprehensive inventory of relevant internal and external documentation, open source components, services, APIs and data for internal and external developers who are building government products, or want to build their own products

It will also be a platform through which government teams can share their developer resources for discovery and use by internal and external developers.

It will provide an inventory of ongoing open product development products, components and teams

The resources will be collected into curated various focused kits/collections of resources needed to build particular types of systems, assist teams at a point in their lifecycle, support persona specific-workflows, etc. 

It will also provide a aeans to seed “prosumer”/community behaviours. For example, it will be possible to view source/fork/comment/PR on many of the elements in the DevHub.

## Resource Types
 
The currently imagined resource types are as follows:

* Documentation 
* Repositories
* Components
* Self-Service Tools 
* People
* Projects

There is also the concept of a set of potentially heterogeneous resources that we are calling a "Collection". For example, a   

### Documentation

Documentation is the most straightforward type of resource.  

Documentation would include any type of guide, how-to, reference, manual, or FAQ relevant to designers or developers.  
Documentation may exist in Markdown, HTML, PDF, and Word/Office formats, among others.  
Documentation may be sourced from GitHub, other government websites, or external websites.
Documentation would be presented in the DevHub top-level UI as a "Card" with some "preview" or summary view, and "clicking through" would present the documentation itself, which may reside in the DevHub site (based on source and format), or an external site.
Documentation is added to the DevHub via registration of a "documentation source" (most commonly pointing to a GitHub repository) with the DevHub, at which point supported documentation found in the repository will be pulled into the DevHub.  There will be a mechanism to manage included/excluded files as well as providing metadata, etc.  
     

### Repositories

Repositories correspond directly to code repositories on GitHub.com (or potentially other source code repository systems in the future).

Repositories in the DevHub would include code repositories containing source code for government-related systems or software libraries.  Most commonly, these will reside in the BCGov GitHub org.  
Repositories  would be presented in the DevHub top-level UI as a "Card" with some "preview" or summary view, and "clicking through" would navigate to the repo in GitHub.com (or other repository site in the future).       
Repositories would be added to the DevHub via registration of a "repository source" (most commonly pointing to a GitHub org) with the DevHub, at which point repos found in the org would be displayed in the DevHub. There will be a mechanism to manage included/excluded repos as well as providing metadata, etc.

### Components

Components represent are the reusable building blocks for systems. Designers and developers and will leverage these components as they design and build new systems to reduce the efofrt required, imrpvode consistency, and ensure compliance.

Components in the DevHub would include visual components, code libraries, microservices, and code snippets or templates, produced and managed by or for government.
Components would be presented in the DevHub top-level UI as a "Card" with some "preview" or summary view, and "clicking through" would present details about the component (essnetially a special case of a Documentation resource), which may reside in the DevHub site (based on source and format), or an external site.   
Components would be added to the DevHub via registration of a "component source" with the DevHub (implementation TBD), at which point components found in the source would be displayed in the DevHub.

### Self-Service Tools

Self-Service Tools provide the means for developers to provision, configure, and track the shared services (operated by the DevOps Platform Services Team and others) that they leverage as part of their development processes or production applications.

Self-Service Tools in the DevHub would include OpenShift, Keycloak/SSO, GitHub repositories, platform security tools, mobile publishing tools, API Gateway, and cloud/SaaS services (future).
Self-Service Tools would be presented in the DevHub top-level UI as a "Card" with some "preview" or summary view, and "clicking through" would present an interactive application for provisioning a Self-Service Tool.  There will also be a means to access and interact with existing Self-Service Tools that a developer has already provisioned. Details of that are TBD ATM.
Self-Service Tools would be added to the DevHub via registration of a "tool source" with the DevHub (possibly an Open Service Broker API instance), at which point components found in the source would be displayed in the DevHub.

### People

The People resource represents members of the gov development community, users of the DevHub, and creators/collaborators of the resources presented in the DevHub.

### Projects

This resource is a little tricky and the definition/scope is evolving.  However, it is intended to be a "connection point" for several of the other resource types that together represent some group of people working together on the development/lifecycle of a software product.  

## Technical Details

This application was scaffolded using [GatsbyJS](https://github.com/gatsbyjs/gatsby).

Here are some of the other components/technologies used by DevHub: 

- ReactJS
- GraphQL

## Third-Party Products/Libraries used and the the License they are covered by

- GatsbyJS  
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/gatsbyjs/gatsby/blob/master/LICENSE)


## Project Status
In Development
## Documentation
- [Internal Docs](./docs/README.md)
- [Authoring Plugins for Remark](https://www.huynguyen.io/2018-05-remark-gatsby-plugin-part-2/)
## Security

### Authentication, Authorization, Policies, etc

Currently, DevHub is a statically generated site (generated using GatsbyJS) and served using [Caddy Server](https://caddyserver.com/) and has no concept of users, authentication, or authorization. This will likely change in the future at which point this documentation will be updated to reflect details in those areas.

## Code Management

### Workflow

This project follows the [GitHub Flow workflow](https://guides.github.com/introduction/flow/) for managing code branches and releases.  Details and more specifics of how features are developed and rolled out are described below.

#### Feature Lifecycle and Release Process

As indicated above, the team follows the GitHub approach for managing code and releases.  Accompanying this general approach the team has implemented some specific structures, tools and practices that are described in this section.

##### Branch Structure

In the repo, at any given time, several to many branches may exist, and these can be categorized into a few "types" of branches, used for specific purposes.  Each is outlined below.

* `master` branch: code that has been deployed an accepted in production ends up here.  It is the source from which new feature branches are created.
* `feature/<#>-<issue-or-user-story-description>` branch: branches named following a similar format to the one shown are "feature branches" and created for the purpose of capturing work related to a single feature, often corresponding to a single, specific user story or issue.  This type of branch is created based on the lastest contents of `master`.
* `hotfix/<#>-<issue-description>`: a "hotfix" branch for a change required to remediate an urgent problem found in the production instance of the application.  This type of branch would be based on the state of the master branch at the point the code in production was merged into it.

##### Lifecycle

Feature lifecycle is as follows: 

* developer syncs local git repo with latest from `mster` in GitHub
* developer creates local feature branch following the naming scheme `feature/<#>-<issue-or-user-story-description>` or similar
* developer implements feature locally and commits new and modified code to feature branch in local repo
* at any point during their feature development process, the developer may push their feature branch to GitHub
* throughout their feature development process, developer should rebase or merge from master to ensure a more streamlined experience when the feature is complete or close to completion
* when the feature is ready to be deployed in the development environment for testing and review by others, the developer pushes their feature branch and creates a GitHub pull request with the feature branch as the source, targeting `master`. 
* when the pull request is created, the Jenkins pipeline will "kick in", triggering a build of the application incorporating the feature changes. Jenkins will create a "check" in the pull request, corresponding to the executing pipeline.  A link to the pipeline in Jenkins will be included as part of the check displayed in the pull request. 
* if the build stage completes successfully, a new "dev" instance of the application will be deployed in OpenShift with a unique URL. This URL can be derived based on the pull request number and the following convention: `https://devhub-static-dev-<pull request number>-devhub-dev.pathfinder.gov.bc.ca/`.  At the appropriate time, the pipeline and/or Git will also execute any configured automated checks or tests (code scans; unit, functional, or accessibility tests).
* if it is determined that the feature is acceptable based on reviewing the feature at the new dev URL, it can be deployed to test or prod using the Jenkins pipeline.
* once deployed to prod, the feature should be reviewed again at the prod URL.  If accepted, the "cleanup" stage   


 

### Integration with Taiga via commit messages

This repository has been configured to send webhooks to a self-hosted Taiga instance as outlined [here](https://tree.taiga.io/support/integrations/github-integration/).  This allows a couple of useful things:

* close issues and user stories via commit messages as described [here](https://tree.taiga.io/support/integrations/changing-elements-status-via-commit-message/)
* associate commits with user stories and issues via commits as described [here](https://tree.taiga.io/support/integrations/attach-commits-to-elements-via-commit-message/)
* create issues in Taiga when created in GitHub 

         

## Files in this repository
> cmd to update tree (from project root) `tree -I 'node_modules|coverage|.cache|app-web/public' -d -L 3`
```
├── app-web
│   ├── __fixtures__
│   ├── __mocks__
│   │   └── @bcgov
│   ├── __tests__
│   │   ├── components
│   │   ├── gatsby-plugins
│   │   ├── pages
│   │   └── utils
│   ├── config
│   │   └── jest
│   ├── gatsby
│   ├── plugins
│   │   ├── gatsby-remark-path-transform
│   │   └── gatsby-source-github-all
│   ├── public
│   │   └── static
│   ├── shell-scripts
│   ├── source-registry
│   └── src
│       ├── assets
│       ├── components
│       ├── constants
│       ├── hoc
│       ├── pages
│       ├── store
│       ├── templates
│       └── utils
├── docs
│   ├── gatsby-custom-plugins
│   └── images
├── functional-tests
│   ├── gradle
│   │   └── wrapper
│   └── src
│       └── test
├── openshift
└── pipeline
    ├── gradle
    │   └── wrapper
    └── src
        └── groovy
```

## Getting Started

* change into app-web project directory
* copy and update your env file
* `cp .env.production.example .env.production`

## Deployment (Local Development For App-Web)

* Requires **Node 8** and **npm 6**
* Clone this repo
* Change into app-web project directory
* run: `npm install`
* replace relevant environment variables (for local dev only)
* *it may be* beneficial to have the gatsby cli package `npm install -g gatsby-cli`
* to start development server run: `npm run dev`
* to build a production version run: `npm run build`
* to view production build run (requires gatsby-cli to be installed globally): `gatsby serve`
* to run prettier: `npm run prettify`
* to run test suites: `npm test`

## Deployment (Docker Compose for Local Development)

* Requires **Docker**
* move into the root directory for the project (if your are in app-web `cd ../`)
* run `docker-compose up`
> if you make changes that do not reflect into the container, you will need to rebuild the image by ending the current container session and running `docker-compose up --build`,
alternatively if things like node_modules aren't showing up try
> 1. `docker-compose up --build`
> 2. `docker-compose down`
> 3. `docker-compose up` 
> credits to: https://stackoverflow.com/a/49357239

## Deployment (OpenShift)

See (openshift/Readme.md)

## Getting Help or Reporting an Issue

To report bugs/issues/feature requests, please file an [issue](https://github.com/bcgov/devhub-app-web/issues/).

## How to Contribute

If you would like to contribute, please see our [CONTRIBUTING](CONTRIBUTING.md) guidelines.

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). 
By participating in this project you agree to abide by its terms.

## Issues/Suggestions
Make Suggestions/Issues [here!](https://github.com/bcgov/devhub-app-web/issues/new)
Issues are [markdown supported](https://guides.github.com/features/mastering-markdown/).

## License

    Copyright 2018 Province of British Columbia

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
