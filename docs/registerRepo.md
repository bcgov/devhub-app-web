# Registering Your Repo for Devhub

## How To Register Your Repo 

When you register your repository several processes will be kicked off whenever the Devhub App is rebuilt. 

In a nutshell it will grab one or more files from your repository, process them, and spit out either a 'card'

<img src="./images/samplecard.png" width="140">

or a card and a page (which the card would navigate too when clicked)

### Step 1: Include `devhub.yml`

Ensure you have a `devhub.yml` file apart of your repo in the root level of the repo (not within any folders). 

The `devhub.yml` is a configuration file that tells what files should be grabbed by Devhub. 
******
**At this point the only file types we are supporting are Markdown (.md) files**
******
Sample devhub.yml file:
```yml
files:
    - name: Button
      path: ./components/button.md
    - name: Footer
      path: ./components/footer.md
    - name: Header
      path: ./components/header.md
    - name: About Us
      path: ./about-us.md
```

We recommend you verify that your yaml file is valid by running it through a linter. If your yaml file is invalid it will fail to be injested by devhub and your content will not be consumed. There are several [online yaml](https://yamllint.com/) validating tools that you can check with if you don't have a local setup to do so.

### Step 2: Add Front Matter To Your Markdown Files
> Last updated:

Front matter provides extra information that is necessary for Devhub to know ***how*** to process your markdown files. As definitions change for this process, the requirements for what will be needed for your front matter may change.

>***TL;DR***

If you want to make your file show up as a **page** in the Devhub. Your markdown file must contain this as apart of its front matter:
```markdown
---

title: what you want as the title
description: short description explaining the content
permalink: /desired-path-to-your-content/blah
categories:
    - category 1
    - category 2
type: page

---
# Your Actual Markdown Content
```

If you want your file to just show up as a content card in the Devhub. Your markdown file must contain this as apart of its front matter:
```markdown
---

title: what you want as the title
description: short description explaining the content
permalink: https://your-desired-website.com(if needed)
categories:
    - category 1
    - category 2
type: resource

---
# Your Actual Markdown Content
```

---

> Details on Front Matter Properties

Sample markdown file with needed Front Matter:
```markdown
---
 <!-- front matter lives in between those three dashes above and below  --> 
type: page
categories: 
    - design-system
    - how-tos
    - guides
permalink: /design-system/button
title: Button Component
description: This is a description of the design system button

---
# My Title

Some text

## More content

```

Let's get into detail what each of those **things** are used for in the front matter.

#### type (mandatory)

This tell's Devhub what this file should be used within the app. Possible values are: 

- `page`: tells the Devhub that this markdown file should be processed into a page. The Devhub will generate HTML from this markdown file and create a page. There will also be a 'card' associated with this page which is how the user would navigate to it

- `resource`:  tells the Devhub that this markdown file should be processed as a card only. It may navigate away to another site if you have a permalink set

#### categories (mandatory)

When your file is processed it is indexed by category so that it's more easily navigeable as well as searchable (in future releases). You can have your file be apart of many categories.

Your file could have just one category

```yml
categories:
    - Design System
```

Or many
```yml
categories:
    - Design System
    - Getting Started With Development
    - Helpful Guides
```


#### permalink (optional)

The `permalink` gives instructions to the Devhub to provide a link to somewhere when a user interacts with your card. 

- If your `type` is page: 
    
    The permalink should follow this pattern: `/somepath/someOtherPathIfNeeded`
    
    This says that when you click on my card, you will get navigated to `developer.gov.bc.ca/somepath/someOtherPathIfNeeded` and view the full *page* view of my content

- If your `type` is resource:
    
    The permalink, *if needed*, should be a link to website or other external source like so: `https://www.google.ca`

#### title (mandatory)
The title for your file which is used as the title in the card view inside the devhub

#### description (mandatory)
A short description describing what's in this file. This will be used as the short blurb in the card view inside the devhub. (try to limit to 280 character)
