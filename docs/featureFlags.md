---
description: Dev Hub's Feature Flagging System
ignore: true
---
# Feature Flagging

Feature Flagging on the client is accomplished via [flag](https://www.npmjs.com/package/flag).
The flags are controlled by a global Redux store. There is a reducer in `src/store/reducers/features.js`
which contains the store of all feature flags.

This reducer is automatically connected via the built in `Flags Provider` (coded in gatsby-browser.js) as explained in the libraries
documentation.

## Using feature flags

```javascript
// flags reducer
export default createFlagsReducer({
  features: {
    login: false,
    awesomeFeature: true,
  },
});

// later in react code
// import the Flag component
import { Flag } from 'flag';
// and flag whatever component you want
export const flaggedComponent = () => <Flag name="features.awesomeFeature"><div>My Awesome Feature!</div></Flag>
```
