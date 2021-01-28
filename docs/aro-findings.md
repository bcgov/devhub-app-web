## ARO Findings

- Applications may require more memory to operate.
- As of now, the implicity docker registry used when referencing images is ___docker.io___ instead of the internal registry
- By default DeploymentConfig ImagePullPolicy is __ifNotPresent__ instead of __Always__
- It appears overall network performance is faster for downloading npm packages
- Rhel based images can have a lot of issues if they are trying to download packages from licenced repositories
- it is easier to use UBI base images
  - ubi base images allow you to customize them since they come with `yum`