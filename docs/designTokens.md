# Design Tokens

## What Are They?

Design Tokens are essentially a non domain specific way of abstracting away common UI styles in a way that it is easily consumable by our application regardless of what mechanism it uses to produce styling (Sass, styled components, css modules etc).

In a nut shell
> With design tokens, you can capture low-level values and then use them to create the styles for your product or app. You can maintain a scalable and consistent visual system for UI development.

## How Does Devhub Use Them?

We started implementing this at the mid point of the projects lifecycle to help with maintaining consistency within our UI development. There is a file found at `src/constants/designTokens.js`

Where all tokens are housed.

## What Tokens Are There?

You will find tokens for predicatable spacing units, common breakpoints and more. 

## How To Utilize

The tokens are in __most__ cases just plain string values that you can embed into our
styled components or css-in-js

```js
import React from 'react';
import { SPACING, CUSTOM_TYPE } from '../../constants/designTokens';
import { css } from '@emotion/core';


const Container = css`
  padding: ${SPACING['2x']};
  margin: ${SPACING['1x']} ${SPACING['2x']};
  background-color: tomato;
  color: #444;
  font-size: ${CUSTOM_TYPE.md};
`;

export const Foo = () => <div css={Container}>Hello World!</div>
```

## Moving Forward

There will be ongoing work to transititon many common components that use margin/padding to utilize the style tokens so we maintain consistency and have a single source of truth!

## Interested In Learning More About Design Tokens?

Check out this blog https://css-tricks.com/what-are-design-tokens/