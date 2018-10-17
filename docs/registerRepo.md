---
description: A guide on how to get your repo registered with the Devhub so that it's content is generated into a live site.
---
# Registering Your Repo for Devhub

Register your repo so that any markdown files of your choosing will be viewable in the Devhub.

## How To Register Your Repo 

When you register your repository several processes will be kicked off whenever the Devhub App is rebuilt. 

In a nutshell it will grab one or more files from your repository, process them, and spit out either a 'card'

<img src="./images/samplecard.png" width="140">

or a card and a page (which the card would navigate too when clicked)

### Step 1: Include `.devhubignore`

Ensure you have a `.devhubignore` file apart of your repo in the root level of the repo (not within any folders). 

The `.devhubignore` is a configuration file that tells what files the devhub **should not** process. 
This is important as you may not want to reveal documentation files such as READMEs to the devhub.

By default we already exclude the following files and folders so you will not to place the following within your `.devhubignore` file:

- openshift
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md
- LICENSE

******
**At this point the only file types we are supporting are Markdown (.md) files**
******
Sample .devhubignore file:
```
README.md
/docs/dont_show_this.md
```

### Step 2: Add Front Matter To Your Markdown Files
> Last updated: Oct 17th 2018

Front matter provides extra information that is necessary for Devhub to know ***how*** to process your markdown files. As definitions change for this process, the requirements for what will be needed for your front matter may change.

>***TL;DR***

Your markdown file must contain this as apart of its front matter:
```markdown
---
title: what you want as the title
description: short description explaining the content
---
# Your Actual Markdown Content
...
```

Let's get into detail what each of those **things** are used for in the front matter.

#### title (optionally)
The title for your file which is used as the title in the card view inside the devhub. If this is not
included, the title will be *inferred* by the first header in your markdown code.

#### description (mandatory)
A short description describing what's in this file. This will be used as the short blurb in the card view inside the devhub. (try to limit to 280 character)

### Step 3: Register your repository

Before your repo's content is taken in by the Devhub, the Devhub needs to know it exists first.

This will involve making a Fork and Pull Request to the [Devhub Repository](https://github.com/bcgov/devhub-app-web).

>If this is your first time Forking and or making Pull Requests, more details can be found [here](https://github.com/bcgov/devhub-app-web/blob/master/CONTRIBUTING.md).

Once you've forked the Devhub Repo, you will want to make a new branch.

...TBC