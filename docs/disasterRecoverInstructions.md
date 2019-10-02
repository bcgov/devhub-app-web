### Disaster Recovery Instructions


## Deploy Devhub on OpenShift
These instructions are to get the Devhub stood up in a prompt fashion. This will get the application running but it will not standup supporting infrastructure such as jenkins. It is HIGHLY recommended you follow instructions for the pipeline-cli/bcdk to stand up a pipeline to manage the deployment/builds of Devhub.

As another tip, use the __--dry-run__ flag with any __oc apply__ command to ensure that your cli commands are working as expected.
 
 
**prerequisite：**
Have a nodejs version 10 and s2i-caddy image from Redhat in ‘openshift’ namespace.

Have Openshift Cli knowledge.

Have all required API token.(Github, matomo, eventbrite)

Assuming we start in a empty namespace
 
In OpenShift: namespace: BC developer Hub(tools)  


- **Step 1, add following secret objects to this namespace** 
  * devhub-eventbrite-token
  * devhub-gh-token
  * devhub-meetup-token
  * matomo-api-key

 we can add by using the corresponding template in the project file: openshift/template:

```cmd
oc process -n devhub-tools -f gh.secret.yaml -p GITHUB_TOKEN=<token that you get from github> | oc apply -f –
 
oc process -n devhub-tools -f matomo.secret.yaml -p MATOMO_API_KEY=<Matomo access token> | oc apply -f -

oc process -n devhub-tools -f eventbrite.secret.yaml -p EVENT_BRITE_API_KEY=<Event brite api key if you have> |oc apply -f –
```
>At this time it is NOT possible to get a Meetups token. They have disabled access tokens and so this step can be skipped 

```cmd
oc process -n devhub-tools -f meetup.secret.yaml -p MEETUP_API_KEY=<anything> | oc apply -f –
```
 
 
- **Step 2, add build config：**

Get all required environment variable for bc.yaml and put them in a file, in this case, I use bash as my source of my build configure parameters as `parameter.sh`
```sh
NAME=devhub
SUFFIX=-build
VERSION=1.0.0
SOURCE_REPOSITORY_URL=https://github.com/bcgov/devhub-app-web.git
SOURCE_REPOSITORY_REF=master
DOCKER_IMAGE_DIRECTORY=docker-images/nodejs-base
MATOMO_URL=https://matomo-devhub-prod.pathfinder.gov.bc.ca
MATOMO_SITE_URL=https://developer.gov.bc.ca
MATOMO_SITE_ID=1
```

Then, use bc.yaml by:
```cmd
oc process -f bc.yaml --param-file parameter.sh | oc apply -f –
```

devhub-build in build should start build and hopefully will succeed.
 
## Deploying:
`TODO:`

- **Step 3, add Router:**


- **Last step, deploy into a pod**
we need to deploy image into pod by using dc.yaml in dev/test/prod name space

```cmd
oc process -f dc.yaml -n <namespace> | oc apply -f -
```

There are some parameter that you will need to fill in to select resources you want to use.
 
 
 