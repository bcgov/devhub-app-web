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
// run time apollo query fixtures
export const GITHUB = [
  {
    type: 'github',
    id: '101',
    typePayload: JSON.stringify({
      id: '1',
      __typename: 'Github Issue',
      fields: {
        resourceType: 'Github Issue',
        title: 'Issue',
        description: 'Foo',
        personas: ['Developer'],
      },
    }),
  },
  {
    type: 'github',
    id: '102',
    typePayload: JSON.stringify({
      id: '2',
      __typename: 'Github Issue',
      fields: {
        resourceType: 'Github Issue',
        title: 'Issue',
        description: 'Foo',
        personas: ['Developer'],
      },
    }),
  },
];
export const ROCKET_CHAT = [
  {
    type: 'rocketchat',
    id: '1',
    typePayload: JSON.stringify({
      id: '1',
      roomId: '2',
      author: 'apple',
      time: '2019-02-12',
      message: 'apples are clearly superior',
    }),
  },
  {
    type: 'rocketchat',
    id: '2',
    typePayload: JSON.stringify({
      id: '2',
      roomId: '2',
      author: 'apple',
      time: '2019-02-12',
      message: 'apples are clearly superior',
    }),
  },
];
