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
// configuration for the secondary filtering mechanism

const defaultFilterGroups = [
  {
    title: 'For',
    filters: [
      {
        filterBy: 'attributes.persona',
        value: 'Designer',
        text: 'Designers',
        active: true,
        availableResources: null,
        key: '1',
      },
      {
        filterBy: 'attributes.persona',
        value: 'Developer',
        text: 'Developers',
        active: false,
        availableResources: null,
        key: '2',
      },
      {
        filterBy: 'attributes.persona',
        value: 'Product Owner',
        text: 'Product Owners',
        active: false,
        availableResources: null,
        key: '3',
      },
    ],
  },
];

export default defaultFilterGroups;
