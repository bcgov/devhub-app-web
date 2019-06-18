/*
Copyright 2019 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at 

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Created by Patrick Simonian
*/

/*
Emotion theming object

We are transitioning from common elements such as colors, background colors being abstracted away into
a themes provider. This is a very common practice now a days and makes it maintain themes on the fly
docs on theming is here https://emotion.sh/docs/theming#___gatsby

Docs on emotion https://emotion.sh/docs/introduction

--- our idea is to introduce emotion early and slowly replace css modules with emotion styled components
when and as needed. This is a slow processes but will lead to better and more maintaible styling in the long run.
*/

import { SPACING, DEVHUB_PALETTE } from './src/constants/designTokens';
export default {
  colors: {
    ...DEVHUB_PALETTE,
  },
  padding: {
    main: {
      mobile: `${SPACING['2x']} ${SPACING['2x']}`,
      desktop: `${SPACING['2x']} ${SPACING['13x']}`,
    },
  },
  breakpoints: {
    // specific breakpoints
    main: {
      desktop: '@media screen and (min-width: 932px)',
    },
  },
};
