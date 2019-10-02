### Disaster Recovery Instructions



## Deploy Devhub on OpenShift
Learning from build.js in pipeline/lib file about its’ deploying process, here’s my approach of manually deploy Devhub. 
 
**prerequisite：**
Have a nodejs version 10 and s2i-caddy image from Redhat in ‘openshift’ namespace.

Have Openshift Cli knowledge.

Have all required API token.(Github, matomo, eventbrite)

Assuming we start in a empty namespace
 
 
In OpenShift: namespace: BC developer Hub(tools)


**Step 1, add following secrete objects to this namespace**
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
We are currently not using meetup, but meetup token has to be there, so create one with any API token:

```cmd
oc process -n devhub-tools -f meetup.secret.yaml -p MEETUP_API_KEY=<anything> | oc apply -f –
```
 
**Step 2, add build config：**

Get all required environment variable for bc.yaml and put them in a file, in this case, I use bash as my source of my build configure parameters as parameter.sh
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
 
## Guessing:

**Step 3, add Router:**

**Last step, deploy into a pod**
we need to deploy image into pod by using dc.yaml in dev/test/prod name space

```cmd
oc process -f dc.yaml -n devhub-dev process | oc apply -f –
```

manually select resource you want to use and should be good to go.
 
 
 
 