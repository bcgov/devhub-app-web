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
    id: 'MDU6SXNzdWU0Njg4MDE4MTQ=',
    type: 'github',
    typePayload:
      '{"__typename":"Issue","id":"MDU6SXNzdWU0Njg4MDE4MTQ=","author":{"avatarUrl":"https://avatars1.githubusercontent.com/u/43587777?v=4","login":"jameswanless"},"number":877,"body":"- [x] determine stipend (if any)\\r\\n- [ ] determine timing and method\\r\\n- [x] draft invitation\\r\\n- [ ] draft informed consent\\r\\n- [x] PIA checklist","url":"https://github.com/bcgov/entity/issues/877","title":"Recruit participants for prototype testing","state":"OPEN","repository":{"name":"entity","owner":{"login":"bcgov"}},"createdAt":"2019-07-16T18:31:04Z","updatedAt":"2019-08-07T20:39:19Z"}',
  },
  {
    id: 'MDU6SXNzdWU0NTMxNDA2ODc=',
    type: 'github',
    typePayload:
      '{"__typename":"Issue","id":"MDU6SXNzdWU0NTMxNDA2ODc=","author":{"avatarUrl":"https://avatars1.githubusercontent.com/u/21046727?v=4","login":"patricksimonian"},"number":686,"body":"","url":"https://github.com/bcgov/devhub-app-web/issues/686","title":"Integrate e2e testing into the pipeline with cypress to allow for confident deploys without the need for developer ui testing","state":"OPEN","repository":{"name":"devhub-app-web","owner":{"login":"bcgov"}},"createdAt":"2019-06-06T17:00:02Z","updatedAt":"2019-09-10T16:05:57Z"}',
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
