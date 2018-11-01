---
description: An overview of how Devhub's Siphon works
ignore: true
---
# Siphon
Devhub is a content catalogue generator. **Siphon** is Devhub's main tool that *siphons* content from Github Repositories and converts it into useable Gatsby JS graphQL nodes.

## What is it?
Siphon is actually just a Gatsby Source Plugin that was locally authored to pull in content from Github Repositories.

## Inspiration
Although there are a couple of publicly available Gatsby Source Plugins to source content from Github, they didn't meet the scale requirements for the devhub. Plugins like [gatsby source graphql](https://www.npmjs.com/package/gatsby-source-graphql) are really only meant to grab sources from a few set of repositories. The only way to get content from repositories at scale would be to dynamically generate graphQL query strings and or dynamically append more instances of the plugin to the `gatsby-config.js` file.

In addition, they lacked the ability to control things like **mime types** for respository content. Which is a very important requirement to allow for github content to be processed by public gatsby transformer plugins without configuration.

## Routine Flow
