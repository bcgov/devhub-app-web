---
ignore: true
author: Patrick Simonian
description: About Messages Folder
---
# THIS IS BEING DEPRECATED. PLEASE DO NOT UTILIZE
## Messages

As a best practice all content will be migrated into localized objects. This will allow for easy
integration into well know localization libraries (used for translations etc).


## Developing with `Messages`

Since most content for the devhub is from outside, I personally don't imagine we will have a lot of
messages to deal with. Anyhow as a best practice let's add message objects to `index.js` for now.

In the even the `index.js` file is getting large, we will seperate them out based on the components/pages
the message is destined to be used by and then we will do lazy exports into index.js for easy importing

```js
// in pageTitle.js
export const pageTitle = {
  defaultMessage: 'hellow world',
};
```

```js
// in index.js
export {pageTitle} from './pageTitle.js';
```

```js
// usage withjin a component file
import {pageTitle} from 'pathTo messages directory/';
```

