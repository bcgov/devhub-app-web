# Component Architecture

> This project is planned to be a cross over from a traditional react/redux app that you'd generally see scaffolded by create-react-app

## Webpack

Gatsby JS has much of the webpack configurations pre built. 

Things to note: 
- many 'production' build functions are **only** called during the production build process.
For example: you would typically see all of your CSS be auto prefixed with all the appropriate vendors in a CRA App during dev however this only occurs in the build phase of a gatsby app.
- Webpack configurations are not exposable as they can be with CRA's eject script. Instead, functions need to be called in the [gatsby config](../gatsby-config.js) file in order to modify or update configs. Please refer to [these docs](https://www.gatsbyjs.org/docs/add-custom-webpack-config/) for web pack configuration changes. Prior to changing any webpack configs i'd check if gatsby has a plugin for what you are looking to change.

## Component Design

Although Gatsby is a frame work, it is still very much a living and breathing react app. Therefor I have decided to follow a very popular react component architecture using the container/component design. **Containers** are the 'smart' components and **Components** are the 'dumb/presentational' component.

### Containers

Each Page component (found under `/src/pages`) is analagous to a react container in a more traditional react app.

### Components

Following a React best practice, components should generally be considered for presentational purposes.

### Pages

This is where Gatsby Differs from React, A page components will be converted into it's own index.html file ie (learnmore.js => /learnmore/index.html). This is the main feature of gatsby that we can generate several static sites that have all caching and preloading features already done for us at build time. 

### Templates

Templates are similar to Gatsby Pages but are used for dynamically created pages.

## Data Management

Where at all possible, graphQL will be used as the data api for populating our components. This is the most idiomatic way of developing in gatsby. On any pages that require client side rendering (for filtering or other interactive use cases) redux and more traditional methods of fetching data will be used.
