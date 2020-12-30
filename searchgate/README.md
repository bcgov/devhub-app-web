# Search Gate
A graphql search federation api

## Technology Stack Used

- Apollo

## Project Status
Active

## Structure
```
.
├── config
├── constants
├── datasources
├── docs
└── openshift
```
## Interacting with the API

To test this api locally it is beneficial to have a graphql playground which visualizes queries (much better than running inline curl commands. [Graphql Playground](https://github.com/prisma-labs/graphql-playground)


## Run Locally
1. git clone project
2. cd into working directory and run `npm install`
3. copy env vars `cp .env.example .env` and fill in with appropriate credentials
4. npm install


## Deployment (OpenShift)

This application was built using the [bcdk](https://github.com/bcdevop/bcdk) and the [pipeline cli](https://github.com/bcdevops/pipeline-cli).

Prior to running any builds or deploys, ensure you have generated a github auth secret for each respective namepspace you are deploying search gate too. `oc process -f openshift/secret-template.yaml -p GITHUB_AUTH_TOKEN=<token> | oc apply -f - -n <namespace>`

The application is built using a __PR based workflow__. Every PR kicks off a job in Jenkins that produces a new developer environment that you may subsequently promote into production. 

To create this pipeline you may take a look at bcdk and more specifically,  the jenkins and jenkins-job script generators. 

To trigger builds or deploys from your machine:
- ensure your have a PR made in github
- `cd .pipeline && npm install`

To Build: `npm run build -- --pr=<prNum>`

To Deploy: `npm run deploy -- --pr=<prNum> --env=<dev|test|prod>

If you require clarity on what is actually happening during these npm scripts take a look at the build and deploy files found in `lib`


## How to Contribute

If you would like to contribute, please see our [CONTRIBUTING](CONTRIBUTING.md) guidelines.

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). 
By participating in this project you agree to abide by its terms.

## License

    Copyright 2019 Province of British Columbia

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
