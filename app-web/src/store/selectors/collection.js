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
import { createSelector } from 'reselect';
import { resourcesSelector } from './main';
import { getResources } from '../reducers/resources';
import groupBy from 'lodash/groupBy';

export const selectCollections = createSelector(
  resourcesSelector,
  resources => getResources(resources.collections),
);

// maps all resources tied to a collection
export const selectCollectionsWithResources = createSelector(
  [selectCollections, resourcesSelector],
  (collections, resources) =>
    collections.map(collection => ({
      ...collection,
      resources: collection.resources.map(resource => {
        // collections are initialized with resources only having { id: '...' }
        // this maps the entire resource object to the collection
        return { ...resources.resources.byId[resource.id] };
      }),
    })),
);

/**
 * groups resources in a collection by type
 */
export const selectCollectionsWithResourcesGroupedByType = createSelector(
  selectCollectionsWithResources,
  collectionsWithResources =>
    collectionsWithResources.map(collection => ({
      ...collection,
      resources: groupBy(collection.resources, 'resource.type'),
    })),
);
