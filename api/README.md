## About

This is the API component to the BCDevOps Mobile Application Signing Service. The Signing Service is designed to be a self-serve system that enables development teams to sign and deploy build artifacts in a secure environment.

Additional component can be fond in these repos:

[](https://github.com/bcdevops/mobile-cicd-agent)

[Public Web](../app-web)

## Running Locally
> requires Node 10.15.3 or higher
1. change into this directory from the root `cd api`
2. install packages `npm i`
3. add env variables `cp .env.example .env` and fill out the details
4. to run in dev mode `npm run dev`
5. to run in production mode run `npm run build` and then `npm run start`

6. to test `npm run test`

## Deploying To Openshift

> this is not the recommended way to deploy the application onto the platform. There is a Jenkinsfile in conjunction with the `.pipeline` scripts to build and deploy this application

1. Create the github token secren `oc process -f openshift/secret.yaml -p GITHUB_TOKEN=... | oc apply -f -`
2. Create the build `oc process -f openshift/bc.yaml -p ... | oc apply -f -`
3. Create  the deployment `oc process  -f openshift/dc.yaml -p ... | oc apply -f -`
### API Usage & Documentation

The API documentation can be built with the following command; the result of building the documentation can be found in the `public/doc/api` directory / folder and will be served out via the API.

```console
npm run build:doc
```




## Getting Help or Reporting an Issue

Create an [issue in our repository](https://github.com/bcgov/devhub-app-web/issues/choose). By participating in this project you agree to abide by its terms."

## License

Detailed guidance around licenses is available
[here](/BC-Open-Source-Development-Employee-Guide/Licenses.md)

Attach the appropriate LICENSE file directly into your repository before you do anything else!

The default license For code repositories is: Apache 2.0

Here is the boiler-plate you should put into the comments header of every source code file as well as the bottom of your README.md:

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

For repos that are made up of docs, wikis and non-code stuff it's Creative Commons Attribution 4.0 International, and should look like this at the bottom of your README.md:

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons Licence" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/80x15.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">YOUR REPO NAME HERE</span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">the Province of Britich Columbia</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.

and the code for the cc 4.0 footer looks like this:

    <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons Licence"
    style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/80x15.png" /></a><br /><span
    xmlns:dct="http://purl.org/dc/terms/" property="dct:title">YOUR REPO NAME HERE</span> by <span
    xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">the Province of Britich Columbia
    </span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
    Creative Commons Attribution 4.0 International License</a>.

[export-xcarchive]: https://github.com/bcdevops/mobile-cicd-api/raw/develop/doc/images/export-xcarchive.gif 'Prepare & Export xcarchive'
