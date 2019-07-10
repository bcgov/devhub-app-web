# Devhub Previewer Image CD Setup

The devhub previewer image is pushed to the Dockerhub registry so that users do not need access the cluster
in order to preview devhub content. The CD process for this is fairly simple. It consists of the stage
___ found within the web `Jenkinsfile`. 

This stage triggers the `bcdk .pipeline` script which _processes_ and _applies_ the `devhub-previewer.bc.yaml`
file. 

What happens is the image for the devhub is built that contains the application code plus Node JS. This
image is then pushed to Dockerhub under the _bcgovimages_ namespace.

## How To Get This Stage Working

There are a few things that need to be sorted in order to push images to external registries. The guideline
that was followed is [here](https://blog.openshift.com/pushing-application-images-to-an-external-registry/).

To Summarize you require:
- create a secret within your tools name space that contains the docker registry secret
  `oc create secret docker-registry dockerhub --docker-server=DOCKER_REGISTRY_SERVER --docker-username=DOCKER_USER --docker-password=DOCKER_PASSWORD --docker-email=DOCKER_EMAIL`
- then the `<tools namespace>/builder` service account will need a reference to this secret
```yaml
# builder sa yaml
apiVersion: v1
imagePullSecrets:
- name: builder-dockercfg-dfsdfsd
kind: ServiceAccount
metadata:
  creationTimestamp: 2018-07-17T18:53:23Z
  name: builder
  namespace: devhub-tools
  resourceVersion: "857494024"
  selfLink: /api/v1/namespaces/devhub-tools/serviceaccounts/builder
  uid: ae8f88f3-89f2-11e8-9dd8-0050568379a2
secrets:
- name: builder-token-adsfasd
- name: builder-dockercfg-fsadfasdfasd
- name: #<secret name here> 
```

- The build config output strategy must reference `DockerImage` and point to the correct image in Dockerhub
in addition the push secret must also be referenced
```yaml
output:
  to:
    kind: DockerImage
    name: bcgovimages/devhub-previewer
  pushSecret:
    name: #<secret name here>
```