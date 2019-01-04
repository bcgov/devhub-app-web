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
import { createFlagsReducer } from 'flag';
import FLAGS from '../../constants/featureflags';
// flags can be booleans or functions as per flag docs
// https://www.npmjs.com/package/flag
// there are referenced by the Flag Component using string dot notation

/**
 * login: login authentication feature which renders/not renders the login button
 * githubResourceCards: renders/not renders resources pulled from the local
 *                      gatsby-source-github-all plugin
 * pathfinderResourceCards: renders/not renders pathfinder resources which is pulled
 *                          from the pathfinder repo using a different library as
 *                          a legacy implementation
 */
export default createFlagsReducer({
  features: {
    [FLAGS.LOGIN]: false,
    [FLAGS.GITHUB_RESOURCE_CARDS]: true,
    [FLAGS.PATHFINDER_RESOURCE_CARDS]: true,
    [FLAGS.SOURCE_FILTERING]: true,
    card: {
      [FLAGS.CARD.METADATA]: true,
      [FLAGS.CARD.ISSUES]: true,
      [FLAGS.CARD.REPOSITORY]: true,
      [FLAGS.CARD.WATCH]: true,
      [FLAGS.CARD.FORK]: true,
    },
  },
});
