## About

This is the API component to the BCDevOps Mobile Application Signing Service. The Signing Service is designed to be a self-serve system that enables development teams to sign and deploy build artifacts in a secure environment.

Additional component can be fond in these repos:

[](https://github.com/bcdevops/mobile-cicd-agent)

[Public Web](../app-web)

## Usage

### API Usage & Documentation

The API documentation can be built with the following command; the result of building the documentation can be found in the `public/doc/api` directory / folder and will be served out via the API.

```console
npm run build:doc
```

### From the Desktop

#### Signing iOS app:
For iOS you can re-sight IPA or sign a newly minted xcarchive. Below are the steps for each format.

_xcarchive_

To package up an xcarchive to submit for signing you need to:

1. Create a folder to hold the xcarchive and options.plist
2. Copy the xcarchive from xcode into the folder from #1.
3. Create or copy your options.plist from #1, you could update the content from sample below.
4. ZIP up the folder for submission

![alt text][export-xcarchive]

The `options.plist` contain the answers to the questions xcode normally asks you when you export or upload to the app store from the organizer window. The `doc` folder of this repository contains samples for Enterprise and iTunes Connect releases.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>method</key>
	<string>app-store</string>
	<key>signingStyle</key>
	<string>automatic</string>
	<key>stripSwiftSymbols</key>
	<true/>
	<key>uploadSymbols</key>
	<true/>
</dict>
</plist>
```

\* sample _options.plist_ for iTunes Connect release

The keys in the plist represent the questions xcode asks you when you export or upload to iTunes. The defaults should work in most cases; the only important ones that must be tweaked are the `method` and `teamID`.

*ipa*
To be documented.

#### Signing Android apk:
For Android you can sign an apk. Build the project in release mode and you are ready to upload.

Once you have your package created use the following cURL commands to submit, check the status, and download the signed artifact.
For ipa and xcarchive, specify the platform as `ios`, for apk use `android`.

**Submit for Signing**

```console
curl -X POST -F file=@"myarchive-20180629.zip" http://localhost:8080/api/v1/sign?platform=ios
```

**Check Status**

```console
curl -v http://localhost:8080/api/v1/job/73/status
```

**Retrieve Signed Artifact**

```console
curl -vL http://localhost:8080/api/v1/sign/73/download -o foo.zip
```

#### Deploying app:
For application deployment, you can use the api to upload the signed app package to the following destinations:
1. Enterprise: AirWatch
2. Public: Google Play Store, App Store

To upload the package:
1. Use the jobID from the signing job to start a deployment process.
2. Specify the platform you want to deploy, `public` (Google Play Store, App Store) or `enterprise` (internal deployment with AirWatch).

__Submit for Deployment__

```console
curl -v http://localhost:8080/api/v1/job/deploy/73?deploymentPlatform=enterprise
```


## Build

Use the OpenShift `build.json` template in this repo with the following (sample) command. The build is meant to be a CI
process to confirm that a build can happen without error, that no code quality, security or test errors occur.

```console
oc process -f openshift/templates/build.json \
-p GIT_REF=develop \
-p SLACK_SECRET='helloworld' | \
oc create -f -
```

| Parameter    | Optional | Description                       |
| ------------ | -------- | --------------------------------- |
| GIT_REF      | NO       | The branch to build from          |
| SLACK_SECRET | NO       | Slack token to post to channel(s) |

\* See the `build.json` template for other _optional_ parameters.

\*\* To build multiple branches you'll use the config file multiple times. This will create errors from the `oc` command output that can safely be ignored. For example: `Error from server (AlreadyExists): secrets "github" already exists`

## Deployment

Use the OpenShift `deploy.json` template in this repo with the following (sample) command to build an environment (namesapce) and deploy the code and dependencies:

```console
oc process -f openshift/templates/deploy.json \
-p NAMESPACE=devops-devexp-dev \
-p NODE_ENV=development \
-p POSTGRESQL_USER=app_dv_cicd
```

| Parameter       | Optional | Description                                |
| --------------- | -------- | ------------------------------------------ |
| NAMESPACE       | NO       | The environment (project) name             |
| NODE_ENV        | NO       | The node environment to build for          |
| POSTGRESQL_USER | NO       | The PostgreSQL db user name for API access |

\* See the `deploy.json` template for other _optional_ parameters.

## Local Installation for Development

There are two steps to running this project locally for development:

1. Minio

Run a local minio docker image (find them [here](https://hub.docker.com/r/minio/minio/)). The sample command below is using a docker volume named `minio_data` to store data; see the Docker documentation on how to do this if you're interested. When minio starts it will print the `MINIO_ACCESS_KEY` and `MINIO_SECRET_KEY` needed for step two.

```console
docker run -p 9000:9000 --name minio -v minio_data:/data minio/minio server /data
```

When you start minio it with the command above it won't detach. Copy the access key and secret key from the information minio displays to the `.env` file in step #3 below.

2. PostgreSQL

Run a local PostgreSQL docker image (find them [here](https://hub.docker.com/_/postgres/)). The sample command below is using a docker volume named `pgdata` to store data; see the Docker documentation on how to do this if you're interested.

```console
docker run -it --rm --name pgdev \
-e POSTGRES_PASSWORD=yourpasswd \
-v pgdata:/var/lib/postgresql/data postgres
```

Onces running connect to the running container and use `psql` to run the following SQL commands to create your application user and database. The extra `-c` arguments can be skipped if needed but I prefer to adjust column and lines.

```console
docker exec -i -t $1 /bin/bash -c "export COLUMNS=`tput cols`; export LINES=`tput lines`; exec bash";
```

Once you're connected run the following SQL to create the database, db user, and to give the new user access to the database.

```sql
DROP DATABASE cicd;
CREATE DATABASE cicd;
CREATE USER app_dv_cicd WITH PASSWORD 'PASSWD_HERE';
GRANT ALL PRIVILEGES ON DATABASE cicd TO app_dv_cicd;
ALTER DATABASE cicd OWNER TO app_dv_cicd;
```

You'll use the USER and PASSWORD from the SQL above in the `.env` file you create in step 3 below.

The final step is to run the Knex migration scripts to build the database schema; make sure you've installed all the `npm` packages with `npm install`:

```console
NODE_ENV=development ./node_modules/.bin/knex migrate:latest
```

3. API

Create a file called `.env` in the root project folder and populate it with the following environment variables; update them as needed.

```console
NODE_ENV=development
POSTGRESQL_PASSWORD=
POSTGRESQL_USER=
POSTGRESQL_HOST=localhost
MINIO_ACCESS_KEY=
MINIO_SECRET_KEY=
MINIO_HOST="localhost"
SSO_CLIENT_SECRET=
SESSION_SECRET=
API_URL="http://localhost:8080"
PORT=8080
```

Run the node application with the following command:

```console
npm run dev
```

## Project Status / Goals / Roadmap

This project is **active**.

Progress to date, known issues, or new features will be documented on our publicly available Trello board [here](https://trello.com/b/HGJpxQdS/mobile-pathfinder).

## Getting Help or Reporting an Issue

Send a note to bcdevexchange@gov.bc.ca and you'll get routed to the right person to help you out.

## How to Contribute

_If you are including a Code of Conduct, make sure that you have a [CODE_OF_CONDUCT.md](SAMPLE-CODE_OF_CONDUCT.md) file, and include the following text in here in the README:_
"Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms."

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
