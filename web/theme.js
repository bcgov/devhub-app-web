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

import { SPACING } from './src/constants/designTokens';
import { RESOURCE_TYPES, TOPICS, SEARCH_RESOURCE_TYPES, JOURNEY } from './src/constants/ui';

export const DEVHUB_PALETTE = {
  [RESOURCE_TYPES.COMPONENTS]: '#4299D2',
  [RESOURCE_TYPES.DOCUMENTATION]: '#246BD1',
  [RESOURCE_TYPES.PEOPLE]: '#E17039',
  [RESOURCE_TYPES.SELF_SERVICE_TOOLS]: '#F3BA45',
  [TOPICS]: '#444',
  [RESOURCE_TYPES.REPOSITORIES]: '#6e5494',
  [SEARCH_RESOURCE_TYPES.GITHUB_ISSUE]: '#6e5494',
  [SEARCH_RESOURCE_TYPES.DOCUMIZE]: '#00000f',
  [RESOURCE_TYPES.EVENTS]: '#f44b42',
  [JOURNEY]: '#009688',
  lightgreen: '#66bb6a',
  yellow: '#FCBA19',
  lightyellow: '#F3BA45',
  grey: '#494949',
  lightgrey: '#F2F2F2',
  darkgrey: '#444',
  orange: '#E17039',
  purple: '#6E5494',
  red: '#D8292F',
  lightred: '#F44B42',
  green: '#2E8540',
  blue: '#003366',
  babyblue: '#4299D2',
  lightblue: '#246BD1',
  linkblue: '#1A5A96',
  bgBlue: '#38598A',
  white: '#ffffff',
};

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
