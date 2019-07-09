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
export const FILTER_QUERY_PARAM = 'f';

export const DEFAULT_FILTERS = {
  PERSONA_DESIGNER: {
    filterBy: 'attributes.personas',
    value: 'Designer',
    text: 'Designers',
    active: false,
    availableResources: 0,
    key: 'designer',
    title: 'For',
    isFilterable: true,
  },
  PERSONA_DEVELOPER: {
    filterBy: 'attributes.personas',
    value: 'Developer',
    text: 'Developers',
    active: false,
    availableResources: 0,
    key: 'developer',
    title: 'For',
    isFilterable: true,
  },
  PERSONA_PRODUCT_OWNER: {
    filterBy: 'attributes.personas',
    value: 'Product Owner',
    text: 'Product Owners',
    active: false,
    availableResources: 0,
    key: 'product-owner',
    title: 'For',
    isFilterable: true,
  },
};

const defaultFilterGroups = Object.keys(DEFAULT_FILTERS).map(f => DEFAULT_FILTERS[f]);

export default defaultFilterGroups;
