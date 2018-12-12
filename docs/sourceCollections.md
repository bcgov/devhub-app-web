---
description: Create curated Collections of Resources within Devhub. 
title: Registering a Collection in Devhub
author: patricksimonian
image: ./images/story.png
resourceType: Documentation
---
# Collections

With Collections you can **combine multiple sources under the same name** in the devhub.

## What does that mean?

Let's say you wanted to create a 'story' on how to start off as a mobile app developer in gov. There
are **many** resources scattered among a few repositories that may help a new comer to mobile app developing.

If you would like these scattered resources to be more **connected** together, you can use the ***collections***
configuration settings to point to these many repos at the same time in the devhub registry file.

> Remember that you may register multiple sources (repos) in a collection all day till the cows come home, but if they don't contain the correct configurations (such as the proper markdown front matter) it will be ignored by the devhub

So we have identified 2 repositories that can help a mobile app developer. They are:
- https://github.com/awesomeOwner/mobileRepo1
- https://github.com/awesomeOwner/signing-ios-app

In the registry file you may register these repos as a **collection** like so:

```yaml
# ... = more registrations above
sources:
    # ...
    - name: Starting Out as a Mobile App Dev In Gov # this is the title of your collection
      attributes: 
        persona: 'Developer'
      sourceProperties:
        sources:
         - sourceType: 'github'
           resourceType: 'Documentation'
           sourceProperties:
            repo: mobileRepo1
            owner: awesomeOwner
            url: https://github.com/awesomeOwner/mobileRepo1
         - sourceType: 'github'
           resourceType: 'Self-Service Tools'
           sourceProperties:
            repo: signing-os-app
            owner: awesomeOwner
            url: https://github.com/awesomeOwner/signing-ios-app
         - sourceType: 'github'
           resourceType: 'Component'
           sourceProperties:
            repo: common-web-utils
            owner: 'bcgov'
            files: 
             - docs/implicitAuthManager.md
             - docs/TypeCheck.md
             - README.md
         - sourceType: 'github'
           resourceType: 'Component'
           sourceProperties:
            repo: common-nodejs-utils
            owner: 'bcgov'
            file: README.md
```
The collection can have metadata applied to it such as **attributes** just like a regular source can.
It can even have a **resourceType**. If there are any sources within the collection that **do not have a resourceType**,
they will inherit the **Collection's resourceType**
