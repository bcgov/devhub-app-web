---
title: Gatsby Plugin - Remark Path Transformation
description: 'For devhub to predictably ingest content with minimal
            configuration to content contributors, a plugin was required
            to transform any links to assets (images, links) so that they
            were visible when viewed in the devhub'
ignore: true
---
# Gatsby Remark Path Transform Plugin

## Inspiration
When an external content source is sucked up by devhub there are a few challenges that need to be
taken into consideration when attempting to present it in the website.

One of these challenges are *how do we make contributing content to the Dev hub as easy as possible?*

For example a contributor may make a markdown file like this

```markdown
---
title: My Awesome Blog
description: Bananas are a fruit. Wouldn't you know!
---
# Bananas
Have you tried this wonderful new fruit called a *banana*?

Here is a picture of one ![Banana Pic](../images/banana.jpg)
```

That markdown file looks great and certainly seems interesting. However there is one problem that
is not apparent to the content contributor and it has to do with how they are sourcing their image. 

To the content contributor, the image looks great and displays when viewing the markdown
file from Github, however, when Devhub sucks up that content and they view their work of art from
https://developer.gov.bc.ca they'll find the image doesn't work. This is because the image is 
trying to get it's source from within the Devhub Source Code because the image asset path was declared
relative.

## Setup
This plugin lives within the `/plugins` directory of the project. Via gatsby's [local plugin source
mechanism](https://www.gatsbyjs.org/docs/plugin-authoring/#local-plugins).

The plugin is a child plugin of `gatsby-transformer-remark`. To include `gatsby-remark-path-transform`
you will need to go into your gatsby config and add this plugin to `gatsby-transformer-remark`'s option.

```js
{
    resolve: 'gatsby-transformer-remark',
    options: {
        plugins: [
            {
                resolve: 'gatsby-remark-path-transform',
                options: {
                    converter: { Function }
                }
            }
        ]
    }
}
```

### Plugin Options

`gatsby-remark-path-transform` takes one mandatory option called the `converter` call back. 
This plugin is called for every image and link in the markdown file that has a relative path.

`converter` receives the following parameters from the plugin when called:
- the ast node type ('image' || 'link')
- the relative path for the ast node  ('../../something.png')
- the remark node
- the parent graphql node of the remark node 
    - gatsby transformer remark transforms source nodes and becomes a child of the source node
    - we are passing in the parent node of the remark node since it may contain useful data that
    your call back may need to process the relative path. 
- gatsby actions
    - getNode
    - getNodes
Example:
```javascript
/**
 * @param {String} astNodeType is only 'image' or 'link'
 * @param {String} relativePath 
 * @param {Object} markdownNode
 * @param {Object} parentQLNode
 * @param {Object} actions gatsby get node functions
 * @param {Function} actions.getNodes gatsby get node functions
 * @param {Function} actions.getNode gatsby get node functions
 */
const converter = (astNodeType, relativePath, markdownNode, parentQLNode) => {
    if(parentQLNode.internal.type === 'myParentNode') {
        if(astNodeType === 'image') {
            // grab file from relative path
            const file = path.parse(relativePath).file;
            // we actually already have the asset in the images
            // so we are adjusting the path to point to the image
            return path.join(__dirname, 'images', file);
        }
    }
    // MUST RETURN relative path no matter what if its not going to be processed
    return relativePath;
}

// later in gatsby config
{
    resolve: 'gatsby-transformer-remark',
    options: {
        plugins: [
            {
                resolve: 'gatsby-remark-path-transform',
                options: {
                    converter
                }
            }
        ]
    }
}

```

