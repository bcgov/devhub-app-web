---
description: Devhub's lazy import of files from a registered repo was removed for several reasons. 
resourceType: Documentation
personas:
  - Developer
  - Product Owner
  - Designer
labels:
  - help
  - about
  - faq
date: '2019/05/14'
---

## Devhub No Longer Supports Lazy File Imports From Github
> this article is mostly geared towards content contributors who may have interacted with
older versions of the Devhub. In older versions it was possible to suck up entire repos by registry
configuration

In older versions of the Devhub you may have configuired a __Github Source__ with the following

```json
{
  "sourceType": "github",
  "sourceProperties": {
    "url": "https://github.com/bcgov/awesomeapp",
    "owner": "bcgov",
    "repo": "awesomeapp"
  }
}
```

This would of course tell the Devhub to grab EVERY markdown file it could and display it. This feature
has now been removed, if there are any registry items configured this way, the Devhub will fail to build :) !

## Why Was This Feature Removed

It was removed for the following reasons:

- We found there were very very few occasions where lazy imports were useful
  - _it removed the ability to order content also_
- It makes things like referencing files within the repo from other registry files impossible
- It reduces visiblity of what files are being registered and involves manually looking through the registered repo or viewing a built version of the devhub
- It is against some core archticture principles we are going with in the latest version of Devhub
  - all independant sources of data for the Devhub need to be known and identifiable (lazy exports are identifiable but are difficult to be known upfront without research as described from the note above)
- Having lazy imports required content contributors to be more stringent with their repo maintenance since any markdown files that are created from the repo could potentially be loaded into the Devhub
## So What Now?

Use the _file_ or _files_ configuration within any __Github Source__ like so

```json
{
  "sourceType": "github",
  "sourceProperties": {
    "url": "https://github.com/bcgov/awesomeapp",
    "owner": "bcgov",
    "repo": "awesomeapp",
    "file": "README.md"
  }
}
```

```json
{
  "sourceType": "github",
  "sourceProperties": {
    "url": "https://github.com/bcgov/awesomeapp",
    "owner": "bcgov",
    "repo": "awesomeapp",
    "files": [ "README.md", "docs/help.md" ]
  }
}
```