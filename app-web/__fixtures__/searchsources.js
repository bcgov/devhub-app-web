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
  {
    type: 'github',
    id: 'MDEwOlJlcG9zaXRvcnkxNDg2Nzk1OTQ=',
    typePayload:
      '{"__typename":"Repository","id":"MDEwOlJlcG9zaXRvcnkxNDg2Nzk1OTQ=","isArchived":false,"createdAt":"2018-09-13T18:20:12Z","watchers":{"totalCount":9},"owner":{"login":"bcgov"},"updatedAt":"2019-09-23T16:55:38Z","stargazers":{"totalCount":15},"description":"Web application for the DevHub","url":"https://github.com/bcgov/devhub-app-web","name":"devhub-app-web"}',
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

export const DOCUMIZE = [
  {
    id: '836',
    type: 'documize',
    typePayload: JSON.stringify({
      id: '836',
      orgId: 'bjsqa1oi4dscrcq7po70',
      itemId: '',
      itemType: 'doc',
      documentId: 'bm5pa9c2fefhcb80mam0',
      documentSlug: 'openshift-101-facilitator-handbook',
      document: 'Openshift 101 Facilitator Handbook',
      excerpt:
        'This is a general guide for Facilitating the Openshift 101 course based on the devops-workshop-labs slide and lab materials.',
      tags: '#resourcetype-documents#personas-developer-designer-productowner#',
      spaceId: 'bjsr3n0i4dscrcq7podg',
      space: 'Blogs and Random Thoughts',
      spaceSlug: 'blogs-and-random-thoughts',
      template: 'false',
      url:
        'https://docs.pathfinder.gov.bc.ca/s/bjsr3n0i4dscrcq7podg/blogs-and-random-thoughts/d/bm5pa9c2fefhcb80mam0/openshift-101-facilitator-handbook',
      versionId: '',
      created: '2019-09-25T16:26:13.051344Z',
      revised: '2019-09-25T19:36:12.447076Z',
    }),
  },
];
