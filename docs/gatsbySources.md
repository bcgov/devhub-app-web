# Devhub Data Sourcing

Devhub utilizes a local GatsbyJS source plugin to retrieve files from registered github repos.
More details on registering repos can be found [here](./registerRepo.md)
## Custom Plugin Docs
- [Gatsby Remark Path Transform](./gatsby-customer-plugins/gatsby-remark-path-transform.md)
## Contributing to gatsby-source-github-all

Gatsby Source Github All has a very simple routine that is as follows:

1. Grab `registry.yml` file.
2. Loop over registry (a list of repositories) and retrieve github trees
3. Compile a list of files to fetch based on what is processable by the routine. See [PROCESSABLE_EXTENSIONS](../app-web/plugins/gatsby-source-github-all/utils/github-api.js#L190).
4. Fetch the `.devhubignore` file if available
5. Filter list of files to fetch based on `DEFAULT_IGNORES` and `.devhubignore`
6. Fetch files from list
7. Process files to pull out metadata like
    - file type
    - file name
    - raw content
    - extension
    - mime/media type
8. Pipe processed files into a `Transformer` routine which further processes the content of the files
9. Create Gatsby GraphQL nodes

### Note Worthy Things

#### Implied MediaTypes

Files are processed and provided a *mime/media type* based on their file extension. This is very important
as it allows the graphql nodes to be processed by external gatsby plugins automatically. For example,
if a github file `readme.md` is processed. It will have `mediaType: text/markdown` when processed into a graphql node. 

The external transfomer plugin `gatsby-transformer-remark` can now process readme node and do further transformations out of the box. 

**If your mediaType is not being converted** check [the media types constant](app-web/plugins/gatsby-source-github-all/utils/constants.js#L40) 
to see if it is being covered.

#### Transforming Raw Content

There is a transformer routine that can sift through files to further transform the raw content
prior to creating the graphql node. 

Reasons for the transfomer routine:

I spent many hours working on how to accomplish a similar task within preexisting gatsby plugins to find
that either it was not possible or went against the grain of that plugin's purpose. The transformer routine
can better thought of as data massaging utility more than anything. It is 100% particular to the local
source plugin and so I felt it didn't fit the needs of being a fully isolated gastby plugin. The **Primary**
purpose of this transformer is to set up reasonable default configurations for files. The initial release
is for providing default front matter properties, however providing defaults to YAML files or JSON files
may be beneficial. 
##### Transformer

The transfomer is a simple pipeline. It recieves a file and passes it through different pipelines, each
that modify the content before passing into the next pipeline.

It's usage:
```
const { fileTransformer } = require(...);

const transformedContent = fileTransformer(extension, originalContent, file)
      .use(markdownPlugin)
      .use(anotherPlugin)
      .use(anotherPlugin)
      .resolve(); // returns the content
```
##### Transformer Plugin Authoring
***not to be confused with a gatsby-transformer plugin!!!***
Plugins should be written in [plugins.js](../app-web/plugins/gatsby-source-github-all/utils/plugins.js).
Unless there is a time the file is too cumbersome and seperating the plugins into seperate files is necessary. 

Plugins receive all files that were fetched inside of the repo. For that reason, it is ***recommended***
that you check for the file type (by extension) before modifying the content. In any case the content property
***must*** be returned for the pipeline to continue. 

The plugin format should be: 

```javascript
    const pluginName = (extension, content, file, options) => {
        return content;
    }
```
> Parameters
- extension: This is the file extension ie 'md', 'txt', 'json', 'yaml', 'yml' 
    - you may only want to modify content of a particular file type
    - in any case the content MUST be returned regardless of any conditions in your code
- content: This is the raw and or processed content of a file (depending on what stage it is in the pipeline)
- file: This is the file data if needed for your plugin
- options: an optional object passed into the transformer pipline

It's usage would be...

```javascript
// pipeline.js
const yamlPlugin = (extension, content, file, {dateLoaded}) => {
    if(extension === 'yaml' || extension === 'yml') {
        // do something to content
        const yaml = YAML.parse(content);
        yaml.dateLoaded = dateLoaded;
        return YAML.stringify(yaml);
    }
    return content;
}

// sourceNodes.js
const date = Date.now();
const content = fileTransformer(extension, content, file)
    .use(markdownPlugin)
    .use(yamlPlugin, { dateLoaded: date })
    .resolve();
```