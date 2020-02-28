/*
Copyright 2018 Province of British Columbia

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
// bootstrap needed styles/themes for the app
// as well as wrap all components with the root provider, which is a redux store
// for more info https://github.com/gatsbyjs/gatsby/tree/master/examples/using-redux
import React from 'react';
import 'prismjs/themes/prism-solarizedlight.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import './src/assets/styles/fontawesome.css';
// this hack is to resolve issue https://stackoverflow.com/questions/49781726/react-font-awesome-renders-big-icon-until-scales-down
import { config } from '@fortawesome/fontawesome-svg-core';
import wrapWithProvider from './wrapWithProvider';
import { KeycloakProvider } from '@react-keycloak/web';

import keycloak from './src/auth';

config.autoAddCss = false;

const RuntimeWrapper = Component => ({ element }) => (
  <KeycloakProvider keycloak={keycloak}>
    <Component element={element} />
  </KeycloakProvider>
);
export const wrapRootElement = RuntimeWrapper(wrapWithProvider);
