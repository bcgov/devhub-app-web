---
resourceType: Documentation
personas: 
  - Developer
  - Product Owner
  - Designer
tags:
  - devhub
  - content
  - add content
  - new content
  - contribute
  - contribution
  - new topic
  - new journey
  - edit content
description: Learn how to make requests for new content in the Devhub by making a Pull Request or an Issue.
---
# Contributing To The Devhub

The Devhub's content contribution model allows it to source content from a variety of sources and stitch them together. 
The way it achieves this is through a set of loosely coupled files called __registries__. 

The two ways you may get content into the Devhub is by either _making a pull request_ or _[creating a new github issue](https://github.com/bcgov/devhub-app-web/issues/new/choose)_. 
Both require a working Github Account. 

There are automated __[validations](https://github.com/bcgov/devhub-app-web/issues/1287)__ that run during the Application Runtime as well as when there are code-changes.
These validations help contributors (as well as developers of the Devhub) maintain the user experience.

## How The Devhub Works
>  [Want to dive right in?](#before-you-contribute) 

The Devhub has a ton of information. How does it get there?

Devhub is a [__JAM__](https://jamstack.wtf/) stack. Our primary source of content is through __Github Repositories__.

In a nutshell we source content through various sources of data, markdown files within github repositories, eventbrite data, and even static links to websites. All of this is composed and built into static HTML sites at every build of the application. Devhub is 100% static.

## Rationale

The Devhub content is de-centralized. It allows owners of content to manage their content without
having to know too much of the Devhub application life cycle. In fact, once their content has been 'registered',
they can update their content without having to notify the Devhub. On the next deployment of the Devhub it will be updated. This is similar to how __craigslist__ works. 

### Why We Chose To Go Static

As explained in the JAM stack article above, going 100% static has huge performance benefits. Also, our model of content being distributed through __BC GOV__ Github repositories means that you are in control of your content. When you have registered to the Devhub, there is no special process to update your content. Just edit your markdown flies and on the next build of Devhub it will be up!


### Before You Contribute
Please take a quick read of the [Service Level Agreement](https://github.com/bcgov/devhub-app-web/blob/master/docs/content_contribution_sla.md) before getting started. 

Some of the things you should consider before contributing are:

1. __Is my content appropriate for the Devhub?__
This application is geared towards developers working on digital products within the B.C. Government (with a focus on Agile Development), however there is useful information for anyone interested in the B.C. Government digital landscape.

2. __Where should my content live?__
Content must be registered within topics or registries. They can be registered to __more than one__ topic or journey.

3. __Who will manage the content?__
The content is not managed by the Devhub. It is up to the original contributors to make sure to keep it up to date
as well as address any issues that may be opened up against the content._

## Prerequisites

In order to add content to the Devhub a few things needs to be in order.

- You must have a [Github Account](https://github.com/)

If you would like to suggest a direct contribution (preferred) you will also require:
- Some knowledge of how to Fork and Pull Request (Also known as a PR)
- Some knowledge of editing `JSON` configuration files
- Some knowledge of editing `Markdown` files

If you would like to __suggest content__ you can also make a [New Issue](https://github.com/bcgov/devhub-app-web/issues/new/choose) on the devhub. 


## Suggesting a Direct Contribution

Registration of content to the Devhub is done via `JSON` format configuration files.

> The Devhub assumes you have some knowledge of `JSON` format files. If you are unfamiliar with JSON, it is best to familiarize your self [here](https://www.digitalocean.com/community/tutorials/an-introduction-to-json).

These files are also known as __registry__ files. In a nutshell, the registry is like a subscription for the Devhub. Just like subscribing to magazines in real life, instead of receiving a new magazine at the end of the month, whenever the Devhub rebuilds it grabs the latest version of your content as found within its repository.

> If you have contributed to the Devhub in the past, you may have encountered `YAML` formatted configuration files instead of `JSON`.
We found `YAML` to be more error prone for content contributes because it is spacing/indent sensitive. `JSON` files, although more 'codey' looking, is more forgiving in this aspect.

## Where are these configuration files?

The location of the __configuration files__ can be found within the [devhub repo](https://github.com/bcgov/devhub-app-web) under two directories. 

They are located within `app-web/topicRegistry/` and `app-web/journeyRegistry`.

## How it is organized

The registry directory/folder contains a series of `JSON` files. Each of these files represent a ___topic___ and a __journey__ respectively within the devhub. 

## High Level Overview For Contributing to the Devhub

There is essentially two steps to get content into the Devhub.

1. Modify or add to the __`JSON` configuration files__ found within `app-web/topicRegistry` or `app-web/journeyRegistry` via a Github Pull Request
2. Ensure the markdown files your are pointing to from within the `JSON` configuration files are ready for the __Devhub__

## Adding Content to Existing Topics

We are happy to receive any contributions for our __curated set of topics__. Just fork and pr!

Our current list of topics include:

- Information and Application Security
  
  Resources to help teams ensure their applications appropriately design for and manage security in the their code, tools, and processes.
- Getting Started on the DevOps Platform

  Resources to help product team become productive as quickly and effectively as possible when using the BC Gov DevOps OpenShift platform.
- Data Privacy

  Resources to help teams ensure their applications handle personal information in a manner compliant with BC Gov policies and regulations.
- Authentication and Authorization

  Technical resources related to implementing authentication and authorization in government applications.
- Developer Tools

  Tools to assist software developers in building, deploying, and running applications for BC Gov.
- Community Enablers and Events

  Tools that foster collaboration and communication across the BC Gov developer community.
- Code Management

  Resources related to source code control, GitHub, and open source in BC Gov.
- Developer Toy Box

  A trove of apps/components/stuff/things that are usable by anyone running OpenShift - in particular BC Gov teams "doing" Agile/DevOps.

### Have an idea for a new Topic?

Please @mention patricksimonian or sheaphillips with your PR or even better, contact the Devhub Team in [Rocket Chat](https://chat.pathfinder.gov.bc.ca)



### Modifying or Adding to the `JSON` registry files

The basic unit of configuration within any __registry__ file is a __source__
and it looks like this.

```json
{
  "sourceType": "github",
  "sourceProperties": {
    "url": "https://github.com/bcdevops/openshift-wiki",
    "owner": "bcdevops",
    "repo": "openshift-wiki",
    "files": [
      "docs/OCP/RequestSSORealm.md"
    ]
  }
}
```

In the grander scheme of things this is how a single __source__ fits within a registry file.

for example this is the configuration for the 'Authentication and Authorization' Topic. Towards the middle of the file you can see the example __source__ from above. 
```json
{
  "name": "Authentication and Authorization",
  "description": "Technical resources related to implementing authentication and authorization in government applications.",
  "resourceType": "Documentation",
  "attributes": {
    "personas": [
      "Developer"
    ]
  },
  "template": "overview",
  "sourceProperties": {
    "sources": [
      {
        "sourceType": "web",
        "sourceProperties": {
          "url": "https://sso.pathfinder.gov.bc.ca/",
          "author": "cvarjao",
          "title": "Red Hat Single Sign On (aka KeyCloak)",
          "description": "Red Hat Single Sign On is .....",
          "image": "http://design.jboss.org/keycloak/logo/images/keycloak_logo_600px.svg"
        }
      },
      {
        "sourceType": "github",
        "sourceProperties": {
          "url": "https://github.com/bcdevops/openshift-wiki",
          "owner": "bcdevops",
          "repo": "openshift-wiki",
          "files": [
            "docs/OCP/RequestSSORealm.md"
          ]
        }
      },
      {
        "sourceType": "web",
        "sourceProperties": {
          "url": "https://sminfo.gov.bc.ca/docs/Provincial%20IDIM%20Program%20-%20Building%20SiteMinder%20Integrated%20Apps%202.0.4.pdf",
          "title": "Building SiteMinder Integrated Applications",
          "description": "This document describes the methods that can be used to integrate web applications with the BC Governments SiteMinder infrastructure. \\n This document is intended for the architects, designers and developers producing web applications that integrate with the IDIM SiteMinder service."
        }
      }
    ]
  }
}
```

### Adding your source into a topic from Github

This is the following information we need for a __source__.

- The Github Repository Url
- The owner of the Github repository
- The name of the Github repository
- the list of paths to the files that you want to show up in the devhub

Example:
- `https://github.com/bcgov/devhub-resources`
- `bcgov`
- `devhub-resources`
  - `readme.md`
  - `docs/file1.md`
  - `docs/file2.md`

With that information you can write your source...

```json
{
  "sourceType": "github",
  "sourceProperties": {
    "url": "https://github.com/bcgov/devhub-resources",
    "owner": "bcgov",
    "repo": "devhub-resources",
    "files": [
      "readme.md",
      "docs/file1.md",
      "docs/file2.md"
    ]
  }  
}
```

You can validate that your `JSON` code is formatted correctly by copy and pasting it into this validating tool. https://jsonlint.com/.

Once you are done, edit the `JSON` configuration file of your choosing (preferabbly one which topic works best with your content) and add your source to it. 

```json
{
  "name": "Authentication and Authorization",
  "description": "Technical resources related to implementing authentication and authorization in government applications.",
  "resourceType": "Documentation",
  "attributes": {
    "personas": [
      "Developer"
    ]
  },
  "template": "overview",
  "sourceProperties": {
    "sources": [
      {
        "sourceType": "web",
        "sourceProperties": {
          "url": "https://sso.pathfinder.gov.bc.ca/",
          "author": "cvarjao",
          "title": "Red Hat Single Sign On (aka KeyCloak)",
          "description": "Red Hat Single Sign On is .....",
          "image": "https://design.jboss.org/keycloak/logo/images/keycloak_logo_200px.png"
        }
      },
      {
        "sourceType": "github",
        "sourceProperties": {
          "url": "https://github.com/bcdevops/openshift-wiki",
          "owner": "bcdevops",
          "repo": "openshift-wiki",
          "files": [
            "docs/OCP/RequestSSORealm.md"
          ]
        }
      },
      {
        "sourceType": "web",
        "sourceProperties": {
          "url": "https://sminfo.gov.bc.ca/docs/Provincial%20IDIM%20Program%20-%20Building%20SiteMinder%20Integrated%20Apps%202.0.4.pdf",
          "title": "Building SiteMinder Integrated Applications",
          "description": "This document describes the methods that can be used to integrate web applications with the BC Governments SiteMinder infrastructure. \\n This document is intended for the architects, designers and developers producing web applications that integrate with the IDIM SiteMinder service."
        }
      },
      {
        "sourceType": "github",
        "sourceProperties": {
          "url": "https://github.com/bcgov/devhub-resources",
          "owner": "bcgov",
          "repo": "devhub-resources",
          "files": [
            "readme.md",
            "docs/file1.md",
            "docs/file2.md"
          ]
        }  
      }
    ]
  }
}
```

Finally Save the configuration file within your Fork of the Devhub Repository and make a Pull Request to the Devhub Repo.

Thanks!

### Adding your source into a Journey from Github

A Journey shares many similarities with Topics with a few exceptions and rules.

Journey's follow a subway analogy. One with __Subway Stops__. Subways Stops can contain other stops as a
__junction__ or __concourse__. 

__Rule #1:__ Main 'stops' cannot be __web__ source types. 
__Rule #2:__ __Github__ source types cannot use the `files` paramater, __only single files__ can be references (using `file`)

An example Journey:
> notices how the first 'stop' has more 'stops' joined too it
```json
{
  "name": "Beginner Guide to Developing on the Platform",
  "sourceProperties": {
    "stops": [
      { 
        "sourceType": "github",
        "sourceProperties":
          { 
            "file": "resources/community/new-developer.md",
            "url": "https://github.com/bcgov/devhub-resources", 
            "owner": "bcgov", 
            "repo": "devhub-resources"
           },
        "stops": [
          { 
            "sourceType": "github",
            "sourceProperties":
              { 
                "file": "resources/community/new-developer.md",
                "url": "https://github.com/bcgov/devhub-resources", 
                "owner": "bcgov", 
                "repo": "devhub-resources"
              }
          }
        ]
      },
      { 
        "sourceType": "github",
        "sourceProperties":
          { 
            "file": "resources/community/openshift201.md",
            "url": "https://github.com/bcgov/devhub-resources", 
            "owner": "bcgov", 
            "repo": "devhub-resources"
           }
      },
      { 
        "sourceType": "github",
        "sourceProperties":
          { 
            "file": "resources/community/rocketchat.md",
            "url": "https://github.com/bcgov/devhub-resources", 
            "owner": "bcgov", 
            "repo": "devhub-resources"
           }
      },
      { 
        "sourceType": "github",
        "sourceProperties":
          { 
            "file": "resources/community/best-practices-for-app-development.md",
            "url": "https://github.com/bcgov/devhub-resources", 
            "owner": "bcgov", 
            "repo": "devhub-resources"
           }
      },
      { 
        "sourceType": "github",
        "sourceProperties":
          { 
            "file": "resources/community/finding-resources.md",
            "url": "https://github.com/bcgov/devhub-resources", 
            "owner": "bcgov", 
            "repo": "devhub-resources"
           }
      },
      { 
        "sourceType": "github",
        "sourceProperties":
          { 
            "file": "resources/community/npm-publishing.md",
            "url": "https://github.com/bcgov/devhub-resources", 
            "owner": "bcgov", 
            "repo": "devhub-resources"
           }
      },
      { 
        "sourceType": "github",
        "sourceProperties":
          { 
            "file": "resources/security/security-for-beginners.md", 
            "url": "https://github.com/bcgov/devhub-resources", 
            "owner": "bcgov", 
            "repo": "devhub-resources"
          }
      }
    ]
  },
  "attributes": {
    "personas": [
      "Designer",
      "Developer",
      "Product Owner"
    ]
  },
  "resourceType": "Documentation"
}


```
### Journey Entry Pages
Journeys have a local markdown file authored to serve as an entry or introductory page that describes the journey.
This can be found in `/app-web/journeys/<name>.md`

Based on the slug of the journey, this entry page is used to render a page at the slug.

The markdown file used as the entry page references the journey registry files name as a __id__ frontmatter value. 

For example:

This Journey registry:

```json
{
  "name": "Beginner Guide to Developing on the Platform"
  ...

```

would have a markdown file in `/app-web/journeys/beginner-guide-to-developing-on-the-platform.md`
with the content:
```md
---
id: Beginner Guide to Developing on the Platform
...
---

## Entry Page Content here. 
```

The slug (generated from slugifying the journey name) would now render that markdown file as a page at the
journey's root entry point in the Devhub. 

## Guidances on Topics and Journeys

As described earlier, __Journeys__ use a 'Subway' analogy. Content in a Journey should follow a defined
flow so that users can be 'guided' through content. 

__Topics__ are more of a mixed bag of content under a 'theme'.

## Making Devhub Ready Markdown Files

One advantage of the Devhub is that it can organize content based on labels and tags to better help surface that content to users. It also allows content contributors to surface metadata about the content such as a

- short summary/description of the markdown file
- who authored the content
- an image that will be visible within the card that represent your content
- what personas would find this content relevant
- additional meta data to improve search indexing like tags

This meta data is provided by using markdown [__frontmatter__](https://jekyllrb.com/docs/front-matter/).

Frontmatter provides extra information that is necessary for Devhub to know ***how*** to process your markdown files. As definitions change for this process, the requirements for what will be needed for your front matter may change.

>***TL;DR*** <small>(too long don't read)</small>

The basic information Devhub needs in order for your content to be surfaced is a __`description`__ front matter value and a markdown __Heading__ (All markdown files should contain a title using `#` or `##`)

This is an example of what a top of a markdown file should look like
```markdown
---
description: short description explaining the content (max 140 char)
---
# The Title of Your Content
...
```

### Additional Configurations

By default, your markdown file __inherits__ much of its metadata from the topic that it belongs too. If this isn't not working for you, you may override those properties by entering those values within your frontmatter.

**`image`**: A valid link to an image

> Author has been deprecated for now. You may fill it in but it isn't tied to any features.
**`author`**: (optional but recommended)
    The author of the markdown file (this should be your github username)

**`personas`**: What personas would find this content relevant (this is a list of values). Valid Personas are `'Developer', 'Designer', 'Product Owner'`

**`resourceType`**:
    this will override the global resource Type as defined in the registry level configuration. Valid resource types are `Components, Documentation, Repositories, Self-Service Tools`

**`Tags`**:
Tags are a way to increase the __'discoverability'__ of your content via keywords. These keywords priority score higher in a search in comparison to the contents title and content body.

```md
---
resourceType: Documentation
personas:
  - Product Owner
  - Designer
  - Developer
image: https://github.com/bcgov/BC-Policy-Framework-For-GitHub/blob/master/images/octokat.png?raw=true
author: Patrick Simonian
description: Everything you need to know about working with Github in the BC Government.
tags:
  - next gen security
  - custom network policy
  - Aporeto
  - zero trust
  - networksecuritypolicy
  - openshift security

  
---

## Introduction to Github and Gov

content here
```

The result would be <img src="./images/card-example.png" alt="sample card">

### Having Issues or Need Help?

Feel free explore issues (or make a new one) within the [Devhub Repository](https://github.com/bcgov/devhub-app-web/issues)
