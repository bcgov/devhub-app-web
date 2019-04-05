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

--- the idea is to introduce emotion early and slowly replace css modules with emotion styled components
when and as needed. This is a slow processes but will lead to better and more maintaible styling in the long run.
*/
import { RESOURCE_TYPES } from './src/constants/ui';

export default {
  colors: {
    primary: '#003366',
    [RESOURCE_TYPES.COMPONENTS]: '#4299D2',
    [RESOURCE_TYPES.DOCUMENTATION]: '#246BD1',
    [RESOURCE_TYPES.PEOPLE]: '#E17039',
    [RESOURCE_TYPES.SELF_SERVICE_TOOLS]: '#F3BA45',
    Collections: '#444',
    [RESOURCE_TYPES.REPOSITORIES]: '#6e5494',
    Events: '#f44b42',
    link: '#1A5A96',
  },
  padding: {
    main: {
      mobile: '10px 12px 0 25px;',
      desktop: '10px 65px',
    },
  },
  breakpoints: {
    // specific breakpoints
    main: {
      desktop: '@media screen and (min-width: 850px)',
    },
  },
};
