---
title: Typography and Themes in Devhub
description: An overview of how we are doing css-in-js/typography in Devhub
author: Patrick Simonian
resourceType: Documentation
---

## Styling In Devhub

In the early days of Devhub we used CSS Modules for our css needs. This was great and helped _isolate_
css to components but was cumbersome in the fact that a lot of duplicate css was produced. 

Some thoughts were put into adopting css pre processors such as __Less__ or __Sass__ but we decided to
forgo that for __CSS-In-JS__. This is a relatively new way of doing CSS in our front end application that
has been picking up speed and proving its worth in Component based front end frameworks such as __React__
or __Vue__

## Enter `Emotion JS`

We are using [Emotion JS](https://emotion.sh/docs/introduction) for our application. It is one of the
more popular __CSS-In_JS__ solutions. 

## Roadmap to CSS in JS and styled components

We are still relatively early in the development life cycle for the Devhub. It is recommended to utilize
emotion styling paradigms such as `inline styles` and `styled components` from now on when developing new
components. All CSS Modules should be considered as techinical debt until they have been either replaced
by emotion or have been vetted in a sense that there isn't a huge gain in spending the time to convert it over.


## Theming

With `emotion` we have the ability to provide a `<ThemeProvider>` near the root of our application. All
components that utilize the `css` or `styled` features of `emotion` will inherit said themes and use them.
> Hurrah for removing duplication of colors!

You will find `theme.js` at the root of `web` and it being used within `wrapWithProvider.js`.

Please read the docs on [theming](https://emotion.sh/docs/theming) for usage.

