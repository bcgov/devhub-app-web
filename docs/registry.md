---
author: Patrick Simonian
resourceType: Documentation
personas: 
  - Developer
  - Product Owner
  - Designer
labels:
  - devhub
  - content
  - add content
---
## How the Devhub works

The Devhub has a ton of information. How does it get there?

Devhub is a [__JAM__](https://jamstack.wtf/) stack. Our primary source of content is through __Github Repositories__.

> more info on [Github here](https://github.com/)

In a nutshell we source content through various sources of data, markdown files within github repositories, eventbrite data, and even static links to websites. All of this is composed and buiilt into static HTML sites at every build of the application. Devhub is 100% static.

## Why we chose to go static

As explained in the JAM stack article above, going 100% static has huge performance benefits. Also, our model of content being distributed through __BC GOV__ Github repositories means that you are in control of your content. When you have registered to the Devhub, there is no special process to update your content. Just edit your markdown flies and on the next build of Devhub it will be up!

## Prerequisites

In order to add content to the Devhub a few things needs to be in order.

1. You must have a [Github Account](https://github.com/)
2. Have knowledge of how to Fork and Pull Request (Also known as a PR)
3. Some knowledge of editing `JSON` configuration files
4. Some knowledge of editing `Markdown` files

## Registering To The Devhub

Registration of content to the Devhub iis done via `JSON` format configuration files.

> The Devhub assumes you have some knowledge of `JSON` format files.If you are unfamiliar with JSON, it is best to familiarize your self [here](https://www.digitalocean.com/community/tutorials/an-introduction-to-json). 

These files are also known as __registry__ files. It is helpful to think of the Devhub as __subscribing__ to your content. It will pull the latest version of it on its next build. 

> If you have contributed to the Devhub in the past, you may have encountered `YAML` formatted configuration files instead of `JSON`.
We found `YAML` to be more errorprone for content contributes because it is spacing/indent sensitive. `JSON` files, although more 'codey' looking, is more forgiving in this aspect.

## Where are these configuration files?

The location of the __configuration files__ can be found within the [devhub repo](https://github.com/bcgov/devhub-app-web)

It is located within `app-web/registry/`.

## How it is organized

The registry directory/folder contains a series of `JSON` files. Each of these files represent a ___topic___ within the devhub. 

### Adding Content to Existing Topics

We are happy to receive any contributions for our __curated set of topics__. Just fork and pr!

### Have an idea for a new Topic?

Please @mention patricksimonian or sheaphillips with your PR or better, contact the Devhub Team in [Rocket Chat](https://chat.pathfinder.gov.bc.ca)

## High Level Overview For Contributing to the Devhub

There is essentially three steps to get content into the Devhub.

1. Modify or add to the __`JSON` configuration files__ found within `app-web/registry` via a Github Pull Request
2. Ensure the markdown files your are pointing too from within the `JSON` configuration files are ready for the __Devhub__


## Modifying or Adding to the `JSON` configuration files (the registry)

The basic unit of configuration within a __registry__ file is a __source__
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

## Making Devhub Ready Markdown Files

One advantage of the Devhub is that it can organize content based on labels and tags to better help surface that content to users. It also allows content contributors to surface metadata about the content such as a

- short summary/description of the markdown file
- who authored the content
- an image that will be visible within the card that represent your content
- what personas would find this content relevant
- additional meta data to improve search indexing (this is a future feature)

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

**`author`**: (optional but recommended)
    The author of the markdown file (this should be your github username)

**`personas`**: What personas would find this content relevant (this is a list of values). Valid Personas are `'Developer', 'Designer', 'Product Owner'`

**`resourceType`**:
    this will override the global resource Type as defined in the registry level configuration. Valid resource types are `Components, Documentation, Repositories, Self-Service Tools`

Example

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
---

## Introduction to Github and Gov

content here
```

The result would be <img src="./images/card-example.png" alt="sample card">

### Having Issues or Need Help?

Feel free explore issues (or make a new one) within the [Devhub Repository](https://github.com/bcgov/devhub-app-web/issues)