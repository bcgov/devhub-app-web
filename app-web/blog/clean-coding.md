---
title: Keeping Commits Clean with Auto Linting
description: Boost you development with some neat auto linting libraries.
resourceType: Documentation
personas: 
  - Developer
tags:
 - languages:
  - NodeJS
  - Javascript
 - Dev Hack
author: Patrick Simonian
image: github:patricksimonian 
---
> Avoiding the dreaded 'lint fix' commit!
# Keeping your commits clean with Husky and Lint Staged

Take a look at these two libraries for your node project to clean up linting.

The first one is called [Husky](https://www.npmjs.com/package/husky) and in conjunction with the second, [Lint-Staged](https://www.npmjs.com/package/lint-staged), they work together to automatically lint your code pre-commit. 

## Husky

Husky provides an easy interface within your `package.json` to call functions and libraries on several different
_git based hooks_. 

## Lint Staged

Is a tool that provides a __declarative__ way of calling linting functions based on file extensions. Again this
interface is found within your `package.json`.


## Getting Started

`npm install --save-dev husky lint-staged`

### Seeing it in action

Here is our sample package.json file with the two configurations side by side.

```json
"husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": ["eslint --fix", "git add"],
    "*.css": ["js-beautify --config .jsbeautifyrc -f *.css", "git add"]
  }
```

Let's pay attention to the __pre-commit__ declaration. 

On __pre-commit__, the `lint-staged` library is called. This library, based on the configurations above
will lint and rewrite any files based on rules from external linting libraries. For our project we use
__`eslint/prettier`__ for our Javascript linting and __`js-beautify`__ for our CSS linting.

Atlast! No more `git commit -am "fix linting"` 
